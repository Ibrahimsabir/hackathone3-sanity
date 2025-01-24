import React from 'react'
import { DropdownButton } from '../dropdown'
import { FaAngleRight } from "react-icons/fa6";


export const ProductDetailComponent = () => {
  return (
    <div className='font-Satoshi w-[90%] h-[22px] justify-start ml-20 mt-8'>
        <div className='max-w-[1440px] h-[] flex justify-start items-center m-auto'>
       <DropdownButton textSize={11}textColor="#403c3b" textContent="Home" icon={(<FaAngleRight/>)}/>
       <DropdownButton textSize={11}textColor="#403c3b" textContent="Shop" icon={(<FaAngleRight/>)}/>
       <DropdownButton textSize={11}textColor="#403c3b" textContent="Men's" icon={(<FaAngleRight/>)}/>
       <DropdownButton textSize={11}textColor="#403c3b" textContent="T-shirts" />

       </div>
       <div className='flex justify-between items-center m-auto'>
        <div className='w-1/2 flex flex-col'>
       <div>
        {/* <Image */}
       </div>


        


        </div>
        <div></div>
       </div>
    </div>
  )
}