"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const categories = [
  { href: '/casual', img: '/images/mobilescreen/Frame 105.png', alt: 'Casual' },
  { href: '/formal', img: '/images/mobilescreen/Frame 106.png', alt: 'Formal' },
  { href: '/party', img: '/images/mobilescreen/Frame 107.png', alt: 'Party' },
  { href: '/gym', img: '/images/mobilescreen/Frame 108.png', alt: 'Gym' },
];

const desktopCategories = [
  { href: '/casual', img: '/images/Frame 61.png', alt: 'Casual' },
  { href: '/formal', img: '/images/Frame 62.png', alt: 'Formal' },
  { href: '/party', img: '/images/Frame 64 (1).png', alt: 'Party' },
  { href: '/gym', img: '/images/Frame 63 (1).png', alt: 'Gym' },
];

const ResponsiveGrid = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full max-w-[1240px] h-auto rounded-[40px] items-center m-auto py-8 bg-gray-100">
      <h1 className="font-[Integral CF] text-3xl sm:text-4xl md:text-5xl font-semibold text-center my-12">
        BROWSE BY DRESS STYLE
      </h1>

      {isMobile ? (
        <div className="grid grid-cols-1 gap-6 w-[80%] mx-auto">
          {categories.map(({href, img, alt }, index) => (
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[407px_684px] gap-6 w-[90%] mx-auto mb-6">
            {desktopCategories.slice(0, 2).map(({ href, img, alt }, index) => (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[684px_407px] gap-6 w-[90%] mx-auto">
            {desktopCategories.slice(2, 4).map(({ href,img, alt }, index) => (
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
        </>
      )}
    </div>
  );
};

export default ResponsiveGrid;
