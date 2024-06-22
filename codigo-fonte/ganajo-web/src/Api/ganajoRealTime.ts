import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions, JsonHubProtocol } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import { PedidoDTO } from "../DTOs/Pedido";
import { Admin } from "../DTOs/Admin";
import { getHubUrl } from "./ganajoClient.ts";

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
}

export const useGanajoRealTime = ({pedidoCallBack} : GanajoRealTimeProps) => {
  const connexaRealTimeAddress = getHubUrl();
  const pedidoRealTimeHub = "PEDIDO_REALTIME";
  const connecting = useRef(false);
  const delaySeconds = useRef(10);
  const timeoutId = useRef<NodeJS.Timeout>();
  let connection : HubConnection | null = null;
  const [currentUserId, setCurrentUserId] = useState<number>(1)

  useEffect(() => {
    setCurrentUserId(getCurrentUserIdHandle() ?? 1);
  }, []);

  function getCurrentUserIdHandle(){
    const currentCustomerId = sessionStorage.getItem('currentCustomer');
    console.log(currentCustomerId)
    if(currentCustomerId){
      return Number(currentCustomerId);
    }
    const currentAdmin = JSON.parse(sessionStorage.getItem('admin') ?? '') as Admin;
    console.log(currentAdmin)

    if(currentAdmin){
      return currentAdmin.id;
    }
  }

  const connect = useCallback(async () => {
      if (!connection || connection?.state === HubConnectionState.Disconnected) {
        connection = await setupSignalRConnection(connexaRealTimeAddress);

        connection?.on(pedidoRealTimeHub, (pedido) => {
          pedidoCallBack(pedido);
        });
      }
  }, [])

  const subscribe = useCallback(async () => {
    setCurrentUserId(-1)
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
      await connection.invoke('Subscribe', getCurrentUserIdHandle());
    }
      
  }, [connect, connection]);

  const disconnect = useCallback(async () => {
    if (connection?.state !== HubConnectionState.Connected) return;
    connection?.off(pedidoRealTimeHub);
    await connection?.stop();
  }, [connection]);

  const unsubscribe = useCallback(async () => {
    if (connection?.state !== HubConnectionState.Connected) return;
    await connection.invoke('Unsubscribe', getCurrentUserIdHandle);
    await disconnect();
  },[connection, disconnect]);

  useEffect(() => {
    if (getCurrentUserIdHandle()) {
      subscribe();
    }
    return () => {
      unsubscribe();
      clearTimeout(timeoutId.current);
    };

  }, [subscribe, unsubscribe]);
}