import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions, JsonHubProtocol } from "@microsoft/signalr";
import { useCallback, useEffect, useRef } from "react";
import { PedidoDTO } from "../DTOs/Pedido";

export const setupSignalRConnection = async (connectionHub: string) => {
  const options : IHttpConnectionOptions = {
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      "Acces-Control-Allow-Origin": window.location.origin.toString(),
      "mode": "no-cors",
      "Content-Type": "application/json"
    }
  }

  const connection = new HubConnectionBuilder()
    .withUrl(connectionHub, options)
    .withAutomaticReconnect()
    .withHubProtocol(new JsonHubProtocol())
    .build();

  connection.serverTimeoutInMilliseconds = 1000 * 60 * 60;
  try {
    await connection.start();
  } catch (err) {
    console.log(err);
  }

  return connection;
};

export interface GanajoRealTimeProps {
  pedidoCallBack(pedido : PedidoDTO) : void;
  id: number
}

export const useGanajoRealTime = ({pedidoCallBack, id} : GanajoRealTimeProps) => {
  const connexaRealTimeAddress = "https://localhost:7245/realtime";
  const pedidoRealTimeHub = "PEDIDO_REALTIME";
  const connecting = useRef(false);
  const delaySeconds = useRef(10);
  const timeoutId = useRef<NodeJS.Timeout>();
  let connection : HubConnection | null = null;


  const connect = useCallback(async () => {
      if (!connection || connection?.state === HubConnectionState.Disconnected) {
        connection = await setupSignalRConnection(connexaRealTimeAddress);

        connection?.on(pedidoRealTimeHub, (pedido) => {
          console.log(pedido)
          pedidoCallBack(pedido);
        });
      }
  }, [])

  const subscribe = useCallback(async () => {
    if (connecting.current) return;
    connecting.current = true;
    await connect();
    connecting.current = false;
    if (connection?.state !== HubConnectionState.Connected) {
      delaySeconds.current = Math.min(60, delaySeconds.current + 10);
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(subscribe, delaySeconds.current * 1000);
      return;
    }

    if(connection?.state === HubConnectionState.Connected){
      console.log(id)
      await connection.invoke('Subscribe', id);
    }
      
  }, [connect, connection, id]);

  const disconnect = useCallback(async () => {
    if (connection?.state !== HubConnectionState.Connected) return;
    connection?.off(pedidoRealTimeHub);
    await connection?.stop();
  }, [connection]);

  const unsubscribe = useCallback(async () => {
    if (connection?.state !== HubConnectionState.Connected) return;
    await connection.invoke('Unsubscribe', id);
    await disconnect();
  },[connection, disconnect, id]);

  useEffect(() => {
    if (id) {
      subscribe();
    }
    return () => {
      unsubscribe();
      clearTimeout(timeoutId.current);
    };

  }, [id, subscribe, unsubscribe]);
}