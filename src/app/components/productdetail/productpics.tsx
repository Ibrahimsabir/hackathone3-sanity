"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const ProductDetailGrid = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col '>
    <div className="w-full max-w-[1240px] mx-auto py-8">
      {isMobile ? (
        // Mobile Layout
        <div>
          {/* Large Image */}
          <div className="w-full h-[530px] rounded overflow-hidden mb-4">
            <Link href="/large-image">
              <div className="group relative">
                <Image
                  src="/image 1.png"
                  width={500}
                  height={500}
                  alt="Large Image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                />
              </div>
            </Link>
          </div>

          {/* Row of Smaller Images */}
          <div className="grid grid-cols-3 gap-4">
            {["/image 2.png", "/image 5.png", "/image 6.png"].map((img, idx) => (
              <div key={idx} className="w-full h-[162px] rounded overflow-hidden">
                <Link href={`/small-image-${idx + 1}`}>
                  <div className="group relative">
                    <Image
                      src={img}
                      width={152}
                      height={162}
                      alt={`Small Image ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop Layout
        <div className="grid grid-cols-[152px_444px] gap-4">
          {/* First Column */}
          <div className="grid grid-rows-3 gap-4">
            {["/image 2.png", "/image 5.png", "/image 6.png"].map((img, idx) => (
              <div key={idx} className="w-[152px] h-[162px] rounded overflow-hidden">
                <Link href={`/small-image-${idx + 1}`}>
                  <div className="group relative">
                    <Image
                      src={img}
                      width={152}
                      height={162}
                      alt={`Small Image ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Second Column */}
          <div className="w-[444px] h-[530px] rounded overflow-hidden">
            <Link href="/large-image">
              <div className="group relative">
                <Image
                  src="/image 1.png"
                  width={500}
                  height={500}
                  alt="Large Image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductDetailGrid;