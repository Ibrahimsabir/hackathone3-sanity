"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ResponsiveGrid = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initialize on load
    handleResize();

    // Add event listener for resizing
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full max-w-[1240px] h-auto rounded-[40px] items-center m-auto py-8 bg-gray-100">
      {/* Heading */}
      <h1 className="font-[Integral CF] text-3xl sm:text-4xl md:text-5xl font-semibold text-center my-12">
        BROWSE BY DRESS STYLE
      </h1>

      {isMobile ? (
        // Mobile View (Single Column)
        <div className="grid grid-cols-1 gap-6 w-[80%] mx-auto">
          {[{ href: '/casual', img: '/images/mobilescreen/Frame 105.png', alt: 'Casual' },
            { href: '/formal', img: '/images/mobilescreen/Frame 106.png', alt: 'Formal' },
            { href: '/formal-style', img: '/images/mobilescreen/Frame 107.png', alt: 'Formal Style' },
            { href: '/other-style', img: '/images/mobilescreen/Frame 108.png', alt: 'Other Style' }].map(({ href, img, alt }, index) => (
              <div key={index} className="h-[289px] rounded-3xl overflow-hidden group">
                <Link href={href} className="block">
                  <Image
                    src={img}
                    width={1000}
                    height={1000}
                    alt={alt}
                    className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>
            ))}
        </div>
      ) : (
        // Desktop View (Two Rows)
        <>
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[407px_684px] gap-6 w-[90%] mx-auto mb-6">
            <div className="h-[289px] rounded-3xl overflow-hidden group">
              <Link href={`/categorypage`} className="block">
                <Image
                  src="/images/Frame 61.png"
                  width={1000}
                  height={1000}
                  alt="Casual"
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="h-[289px] rounded-3xl overflow-hidden group">
              <Link href={`/categorypage`} className="block">
                <Image
                  src="/images/Frame 62.png"
                  width={1000}
                  height={1000}
                  alt="Formal"
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[684px_407px] gap-6 w-[90%] mx-auto">
            <div className="h-[289px] rounded-3xl overflow-hidden group">
              <Link href={`/categorypage`} className="block">
                <Image
                  src="/images/Frame 64 (1).png"
                  width={1000}
                  height={1000}
                  alt="Formal Style"
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="h-[289px] rounded-3xl overflow-hidden group">
              <Link href={`/categorypage`} className="block">
                <Image
                  src="/images/Frame 63 (1).png"
                  width={1000}
                  height={1000}
                  alt="Other Style"
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResponsiveGrid;