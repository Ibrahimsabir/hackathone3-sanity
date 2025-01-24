import React from 'react'


interface DropdownButtonProps {
    textColor: string;
    textContent?: string;
    icon?:unknown,
    textSize:unknown
  }
export const DropdownButton = ({textColor,textContent,icon,textSize}:DropdownButtonProps) => {
  return (
<button className={`flex  font-medium gap-2 `}>
    
    <h1 className={`${textColor} flex ${textSize as string} mx-auto`}>{textContent}</h1>
    <div className={`${textColor} ${textSize as string} py-1`}>{icon as string} </div>
    </button>


  )
}