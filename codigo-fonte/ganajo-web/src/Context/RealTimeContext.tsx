import { createContext, useContext, useState } from "react";
import React from 'react'

interface RealTimeContextType {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>
}

interface RealTimeContextProviderProps {
    children : React.ReactNode
}

const realTimeContextInitialState : RealTimeContextType = {
    id: 1,
    setId: () => {}
}

export const RealTimeContext = createContext<RealTimeContextType>(realTimeContextInitialState);

export const RealTimeProvider = ({children} : RealTimeContextProviderProps) => {
    const [id, setId] = useState<number>(1);

    console.log(id)

    return <RealTimeContext.Provider value={{id, setId}}>
        {children}
    </RealTimeContext.Provider>
}

export const useRealTimeContext = () => {
    return useContext(RealTimeContext);
}