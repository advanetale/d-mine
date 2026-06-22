"use client";

import { useState, useEffect } from "react";
import styles from "./ServerTimer.module.scss";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function ServerTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Дата открытия сервера: 8 ноября 2025, 15:00 МСК
    const targetDate = new Date("2026-07-05T15:00:00+03:00");

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isExpired) {
    return (
      <div className={styles.timer}>
        <div className={styles.title}>Межсезонье 1.5.2 открыто!</div>
      </div>
    );
  }

  return (
    <div className={styles.timer}>
      <div className={styles.subtitle}>До открытие межсезонье 1.5.2</div>
      <div className={styles.countdown}>
        <div className={styles.timeBlock}>
          <div className={styles.number}>{timeLeft.days}</div>
          <div className={styles.label}>дней</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeBlock}>
          <div className={styles.number}>
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className={styles.label}>часов</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeBlock}>
          <div className={styles.number}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className={styles.label}>минут</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeBlock}>
          <div className={styles.number}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className={styles.label}>секунд</div>
        </div>
      </div>
    </div>
  );
}
