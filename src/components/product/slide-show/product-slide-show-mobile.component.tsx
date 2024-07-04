"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper-styles.css';
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import styles from "./product-slide-show.module.css";
import { ProductImage } from "@/interfaces";
import clsx from "clsx";

type Props = {
  images: ProductImage[];
  productTitle: string;
  className?: string;
};

const SlideShowMobile: React.FC<Readonly<Props>> = ({
  images,
  productTitle,
  className,
}) => {
  return (
    <section className={clsx(
      "styles.slideShowContainer",
      { [className ?? '']: className }
    )}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#333',
            '--swiper-pagination-color': '#333',
            width: '100%',
            height: 500,
          } as React.CSSProperties
        }
        navigation={true}
        pagination
        modules={[ FreeMode, Navigation, Pagination ]}
      >
      {images.map(image => (
        <SwiperSlide key={image.id}>
          <Image
            src={`/products/${image.url}`}
            width={500}
            height={500}
            priority
            alt={productTitle}
            className={styles.imageMobile}
          />
        </SwiperSlide>
      ))}
        
      </Swiper>
    </section>
  );

};

export default SlideShowMobile;
