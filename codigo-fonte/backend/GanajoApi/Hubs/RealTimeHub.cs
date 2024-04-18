using Microsoft.AspNetCore.SignalR;

namespace GanajoApi.Hubs
{
    public class RealTimeHub : Hub
    {
        readonly ILogger<RealTimeHub> _logger;
        public RealTimeHub(ILogger<RealTimeHub> logger)
        {
            _logger = logger;
        }

        [HubMethodName("Subscribe")]
        async public Task Subscribe(int userId)
        {
            try
            {
                var groupManager = RealTimeSubscriptionManager.FromGroupManager(this.Groups);
                var notificationGroup = new RealTimeUserSubscription(userId, Context.ConnectionId);
                await groupManager.Add(notificationGroup);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

        [HubMethodName("Unsubscribe")]
        public async Task Unsubscribe(int userId)
        {
            try
            {
                var groupManager = RealTimeSubscriptionManager.FromGroupManager(this.Groups);
                var notificationGroup = new RealTimeUserSubscription(userId, Context.ConnectionId);
                await groupManager.Remove(notificationGroup);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

        public override Task OnConnectedAsync()
        {
            _logger.LogInformation(this.Context.ConnectionId + " connected to signalR.");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            _logger.LogInformation(this.Context.ConnectionId + " desconnected to signalR.");
            return base.OnDisconnectedAsync(exception);
        }
    }

    public class RealTimeSubscriptionManager
    {
        static readonly List<RealTimeUserSubscription> _realTimeUserGroups = new List<RealTimeUserSubscription>();
        readonly IGroupManager internalGroupManager;

        public static RealTimeSubscriptionManager FromGroupManager(IGroupManager groupManager)
        {
            if (groupManager == null)
                throw new ArgumentNullException("groupManager");

            return new RealTimeSubscriptionManager(groupManager);
        }
        public static string[] GetUserSubscriptions()
        {
            return _realTimeUserGroups.Select(s => s.UserId.ToString()).ToArray();
        }

        public static List<string> GetUserConnectionId(int idUser)
        {
            return _realTimeUserGroups.Where(x => x.UserId == idUser).Select(x => x.ConnectionId).ToList();
        }

        private RealTimeSubscriptionManager(IGroupManager groupManager)
        {
            internalGroupManager = groupManager;
        }

        public async Task Add(RealTimeUserSubscription notificationUserGroup)
        {
            var existentConnection = _realTimeUserGroups.FirstOrDefault(u => u.UserId == notificationUserGroup.UserId);

            if (existentConnection != null)
            {
                await internalGroupManager.RemoveFromGroupAsync(existentConnection.ConnectionId, existentConnection.UserId.ToString());
                _realTimeUserGroups.Remove(existentConnection);
            }

            _realTimeUserGroups.Add(notificationUserGroup);
            await internalGroupManager.AddToGroupAsync(notificationUserGroup.ConnectionId, notificationUserGroup.UserId.ToString());
        }

        public async Task Remove(RealTimeUserSubscription notificationGroup)
        {
            var notificationUserGroup = _realTimeUserGroups.FirstOrDefault(n => n.UserId == notificationGroup.UserId);
            if (notificationUserGroup != null)
            {
                _realTimeUserGroups.Remove(notificationUserGroup);
                await internalGroupManager.RemoveFromGroupAsync(notificationGroup.ConnectionId, notificationGroup.UserId.ToString());
            }
        }

        public static bool SubscriptionAlreadyExists(string idGroup)
        {
            var groups = GetUserSubscriptions();
            return (groups != null && groups.Length > 0 && groups.Contains(idGroup));
        }
    }

    public class RealTimeUserSubscription
    {
        public int UserId { get; set; }

        public string ConnectionId { get; set; }

        public RealTimeUserSubscription(int id, string connectionId)
        {
            UserId = id;
            ConnectionId = connectionId;
        }
    }
}
