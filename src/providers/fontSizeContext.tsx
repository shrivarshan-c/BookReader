"use client";

import { createContext, useContext, useState} from "react"


const  FontSizeContext = createContext<{fontSize: number; setFontSize: (size: number) => void} | null>(null);


export const FontSizeProvider = ({children}:{children:React.ReactNode})=>{

    const [fontSize,setFontSize] = useState<number>(16);


    return(
      <FontSizeContext.Provider value = {{fontSize, setFontSize}}>
        {children}
      </FontSizeContext.Provider>
    )


    
}



export const useFontSize = ()=>{
    const context = useContext(FontSizeContext);
    if(!context){
        throw new Error("useFontSize must be used inside FontSizeProvider");
    }
    return context;
}