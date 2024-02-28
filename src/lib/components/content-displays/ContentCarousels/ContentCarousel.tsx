import React, { useState, useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps } from 'swiper/react';

export const ContentCarousel = (props: SwiperProps) => {
  const [enableNavigation, setEnableNavigation] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setEnableNavigation(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      slidesPerGroup={1}
      pagination={{ clickable: true }}
      navigation={enableNavigation}
      modules={[Navigation, Pagination]}
      breakpoints={{
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {props.children}
    </Swiper>
  );
};
