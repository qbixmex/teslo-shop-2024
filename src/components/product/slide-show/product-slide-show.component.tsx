"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { type Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiper-styles.css';
import styles from "./product-slide-show.module.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

type Props = {
  images: string[];
  productTitle: string;
};

const SlideShow: FC<Readonly<Props>> = ({ images, productTitle }) => {
  const [ thumbsSwiper, setThumbsSwiper ] = useState<SwiperType>();

  return (
    <section className={styles.sliceShow}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#333',
            '--swiper-pagination-color': '#333',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[ FreeMode, Navigation, Thumbs ]}
        className="mySwiper2"
      >
      {images.map(image => (
        <SwiperSlide key={image}>
          <Image
            src={`/products/${image}`}
            width={1024}
            height={800}
            priority
            alt={productTitle}
            className={styles.image}
          />
        </SwiperSlide>
      ))}
        
      </Swiper>
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
      </Swiper> */}
    </section>
  );

};

export default SlideShow;
