"use client";

import { usePathname } from "next/navigation";
import styles from "./BackgroundVideo.module.scss";

interface BackgroundVideoProps {
  src?: string;
  className?: string;
}

export default function BackgroundVideo({
  src = "/videos/vid1.mp4",
  className = "",
}: BackgroundVideoProps) {
  const pathname = usePathname();

  // Скрываем видео на страницах rules и wiki
  if (pathname.startsWith("/rules") || pathname.startsWith("/wiki")) {
    return null;
  }

  return (
    <video
      className={`${styles.backgroundVideo} ${className}`}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
