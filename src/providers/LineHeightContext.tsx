"use client";


import { createContext, useContext, useState } from "react";



const  LineHeightContext = createContext<{lineHeight: number; setLineHeight: (height: number) => void} | null>(null);


export const LineHeightProvider = ({children}:{children:React.ReactNode})=>{

    const [lineHeight,setLineHeight] = useState<number>(1.6);


    return(
      <LineHeightContext.Provider value = {{lineHeight, setLineHeight}}>
        {children}
      </LineHeightContext.Provider>
    )    
}



export const useLineHeight = ()=>{
    const context = useContext(LineHeightContext);
    if(!context){
        throw new Error("useLineHeight must be used inside LineHeightProvider");
    }
    return context;
}