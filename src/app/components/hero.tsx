import React from 'react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row font-IntegralCF justify-between items-center mx-auto text-black relative bg-[#F2F0F1] w-full lg:h-[663px] gap-8 px-6 lg:px-12">
      {/* Text Section */}
      <div className="lg:w-1/2 flex flex-col justify-start items-start gap-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-bold leading-snug text-left tracking-tight">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-black/60 leading-relaxed tracking-tight">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
        {/* Button */}
        <button className="bg-black text-white text-sm sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full">
          Shop Now
        </button>
        <div className="lg:hidden flex flex-col items-center gap-4 mt-8">
          <div className="flex justify-center items-center gap-4">
            <Image
              src="/Frame 54.png"
              alt="Frame 54"
              layout="intrinsic"
              width={80}
              height={36}
              className="object-contain"
            />
            <Image
              src="/Frame 55.png"
              alt="Frame 55"
              layout="intrinsic"
              width={80}
              height={36}
              className="object-contain"
            />
          </div>
          <Image
            src="/Frame 56.png"
            alt="Frame 56"
            layout="intrinsic"
            width={80}
            height={36}
            className="object-contain"
          />
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full h-full relative">
        {/* Left-Center Vector */}
        <div className="absolute left-[60px] top-[260px] transform -translate-y-1/2 z-10">
          <Image
            src="/Vector (3).png"
            alt="Vector Image Left-Center"
            layout="intrinsic"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Right-Top Vector */}
        <div className="absolute right-8 top-10 z-10">
          <Image
            src="/Vector (3).png"
            alt="Vector Image Right-Top"
            layout="intrinsic"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Main Hero Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-full">
          <Image
            src="/coverphoto.png"
            alt="Hero Image"
            layout="fill"
            objectFit="contain"
            className="object-center"
          />
        </div>
      </div>
    </div>
  );
};