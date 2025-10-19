"use client";

import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import styles from "./MobileSidebar.module.scss";

interface MobileSidebarProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function MobileSidebar({
  title,
  children,
  className,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Блокируем скролл body когда сайдбар открыт
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Очищаем при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закрываем сайдбар при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Кнопка открытия меню */}
      <button
        className={`${styles.menuButton} ${className || ""}`}
        onClick={toggleSidebar}
        aria-label="Открыть меню"
      >
        <IoMenu />
        <span>{title}</span>
      </button>

      {/* Оверлей */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Сайдбар */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={closeSidebar}
            aria-label="Закрыть меню"
          >
            <IoClose />
          </button>
        </div>

        <div className={styles.sidebarContent} onClick={closeSidebar}>
          {children}
        </div>
      </div>
    </>
  );
}
