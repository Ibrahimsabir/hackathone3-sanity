import React from 'react'
import Image from 'next/image'

export const LogoSection = () => {
  return (
    <div className='w-full h-[122px] bg-black flex justify-evenly items-center m-auto px-4 sm:px-8 flex-wrap'>
        <div className='flex justify-center items-center gap-x-8'>
          <Image
            src='/versace.png'
            alt='versace logo'
            width={166.5}
            height={33}
            className='w-[120px] h-[30px] sm:w-[166.5px] sm:h-[33px] md:w-[180px] md:h-[35px] lg:w-[200px] lg:h-[40px] transition-all duration-300'
          />
          <Image
            src='/zara.png'
            alt='zara logo'
            width={91}
            height={38}
            className='w-[80px] h-[35px] sm:w-[91px] sm:h-[38px] md:w-[100px] md:h-[42px] lg:w-[120px] lg:h-[45px] transition-all duration-300'
          />
          <Image
            src='/gucci.png'
            alt='gucci logo'
            width={156}
            height={36}
            className='w-[130px] h-[30px] sm:w-[156px] sm:h-[36px] md:w-[170px] md:h-[40px] lg:w-[190px] lg:h-[45px] transition-all duration-300'
          />
          <Image
            src='/prada-logo-1 1.png'
            alt='prada logo'
            width={194}
            height={32}
            className='w-[150px] h-[30px] sm:w-[194px] sm:h-[32px] md:w-[210px] md:h-[35px] lg:w-[230px] lg:h-[40px] transition-all duration-300'
          />
          <Image
            src='/ck.png'
            alt='ck logo'
            width={207}
            height={33}
            className='w-[160px] h-[30px] sm:w-[207px] sm:h-[33px] md:w-[220px] md:h-[38px] lg:w-[240px] lg:h-[45px] transition-all duration-300'
          />
        </div>
    </div>
  )
}