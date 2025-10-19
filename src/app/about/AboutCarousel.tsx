"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.scss";

export type CarouselImage = {
  src: string;
  title?: string;
  description?: string;
};

type AboutCarouselProps = {
  images: CarouselImage[];
};

export default function AboutCarousel({ images }: AboutCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  const current = images[currentImageIndex];

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
          onClick={prevImage}
          aria-label="Предыдущий скриншот"
        >
          ‹
        </button>

        <div className={styles.carouselSlide}>
          <Image
            src={current.src}
            alt={current.title || "Скриншот сервера"}
            className={styles.carouselImage}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            priority={true} // Приоритет для всех изображений
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='24'%3EЗагрузка...%3C/text%3E%3C/svg%3E"
            onError={() => {
              // Логируем ошибку загрузки конкретного изображения
              console.log(`Не удалось загрузить изображение: ${current.src}`);
            }}
          />
          <div className={styles.carouselCaption}>
            {current.title ? <h3>{current.title}</h3> : null}
            {current.description ? <p>{current.description}</p> : null}
          </div>
        </div>

        <button
          className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
          onClick={nextImage}
          aria-label="Следующий скриншот"
        >
          ›
        </button>
      </div>

      <div className={styles.carouselIndicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselIndicator} ${
              index === currentImageIndex ? styles.carouselIndicatorActive : ""
            }`}
            onClick={() => goToImage(index)}
            aria-label={`Перейти к скриншоту ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.carouselCounter}>
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
}
