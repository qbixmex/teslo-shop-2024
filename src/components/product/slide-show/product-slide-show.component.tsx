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
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import styles from "./product-slide-show.module.css";
import clsx from "clsx";
import { ProductImage } from "@/interfaces";

type Props = {
  images: ProductImage[];
  productTitle: string;
  className?: string;
};

const SlideShow: FC<Readonly<Props>> = ({
  images,
  productTitle,
  className
}) => {
  const [ thumbsSwiper, setThumbsSwiper ] = useState<SwiperType | null>(null);

  return (
    <section className={clsx(
      styles.sliceShow,
      { [className ?? '']: className }
    )}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#333',
            '--swiper-pagination-color': '#333',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3000 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[ FreeMode, Navigation, Thumbs, Autoplay ]}
        className="mySwiper2"
      >
      {images.map(image => (
        <SwiperSlide key={image.id}>
          <Image
            src={image.url.startsWith('https')
              ? image.url
              : `/products/${image.url}`
            }
            width={600}
            height={600}
            priority
            alt={productTitle}
            className={styles.image}
          />
        </SwiperSlide>
      ))}
        
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map(image => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.url.startsWith('https')
                ? image.url
                : `/products/${image.url}`
              }
              width={300}
              height={300}
              priority
              alt={productTitle}
              className={styles.thumbnails}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );

};

export default SlideShow;
