"use client";
import React from 'react';

import airpods from "../airpods.json";
import headphone from "../headphones.json";
import Lottie from 'lottie-react';
import Books from "../Books.json";
import GirlAnimation from "../Girl with books.json";
import AudioPlayer from "../Audio playing animation.json";
import  Player from "../player music.json"
import NeoBrutalism from "../Wonder Things.json";
import PersonalExperience from "../Personal Animation.json"
export  const HeroSvg1 = ()=>{
  return(
    <Lottie
      loop
      animationData={headphone}
      autoplay
      style={{ width: '100px', height: '100px' }}
    />
  )
}

export const HeroSvg2 = ()=>{
  return(
    <Lottie
      loop
      animationData={airpods}
      autoplay
      style={{ width: '100px', height: '100px' }}
    />
  )
}
export const HeroSvg3 = ()=>{
  return(
    <Lottie
      loop
      animationData={Books}
      autoplay
      style={{ width: '100px', height: '100px' }}
    />
  )
}






export const HeroSvg4 = ()=>{
  return(
    <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[600px] h-auto flex justify-center items-center mt-4 md:mt-8 lg:mt-0">
      <Lottie
        loop={false}
        animationData={GirlAnimation}
        className="w-full h-auto"
      />
    </div>
  )
}


export const HeroSvg5 = ()=>{

  return(

      <Lottie
        loop={true}
        animationData={AudioPlayer}
      className="w-42 h-26"
    
      />
 
  )
}


export const HeroSvg6 = ()=>{

  return( 

      <Lottie
        loop={true}
        animationData={Player}
        className="w-24 h-24"
       
      />
  

    
  )

}


export const HeroSvg7 = ()=>{




  return(
    <Lottie
    loop={true}
    animationData={NeoBrutalism}
    className="w-42 h-30"
   
  />

  )
}

export const HeroSvg8 = ()=>{




  return(
    <Lottie
    loop={true}
    animationData={PersonalExperience}
    className="w-24 h-24"
   
  />

  )
}