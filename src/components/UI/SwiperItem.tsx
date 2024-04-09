import { type Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';

type SinglePageSwiperProps = {
  images: string[];
  withThumbs?: boolean;
  alt: string | undefined;
};

export default function SwiperItem({ images, withThumbs, alt }: SinglePageSwiperProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <Swiper
        spaceBetween={24}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={true}
        watchOverflow={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        onSlideChange={() => {
          // console.log('slide change');
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        className='swiperUp mb-2 '
      >
        {images
          .filter((imgUrl) => imgUrl)
          .map((imgUrl, i) => (
            <SwiperSlide key={i}>
              <img className='object-cover w-full h-64' src={imgUrl} alt={alt} />
            </SwiperSlide>
          ))}
      </Swiper>
      {withThumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={false}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='swiperThumbs'
        >
          {images
            .filter((imgUrl) => imgUrl)
            .map((imgUrl, i) => (
              <SwiperSlide key={i}>
                <img className='' src={imgUrl} alt={'town'} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
}
