"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { SiTelegram, SiBoosty } from "react-icons/si";
import { MdSupportAgent } from "react-icons/md";

export default function Entrance() {
  const [isBoosty, setBoosty] = useState(false);

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Cпособ проходки"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isBoosty}
            className={`${styles.tab} ${styles.tabTelegram} ${
              !isBoosty ? styles.tabActive : ""
            }`}
            onClick={() => setBoosty(false)}
          >
            <SiTelegram aria-hidden size={18} />
            <span>Telegram</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isBoosty}
            className={`${styles.tab} ${styles.tabBoosty} ${
              isBoosty ? styles.tabActive : ""
            }`}
            onClick={() => setBoosty(true)}
          >
            <SiBoosty aria-hidden size={18} />
            <span>Boosty</span>
          </button>
        </div>

        {isBoosty ? (
          <section className={styles.card} aria-labelledby="Boosty-title">
            <h1 id="Boosty-title" className={styles.title}>
              Проходка через Boosty
            </h1>
            <p className={styles.subtitle}>
              Обменяй баллы канала владельца сервера на проходку. Обычно
              проверка занимает 5–10 минут при онлайн‑стриме.
            </p>
            <ol className={styles.steps}>
              <li>
                Перейдите на Boosty.
              </li>
              <li>
                Приобретите подписку "Проходка на сервер".
              </li>
              <li>
                Не забудьте указать свой ник в личные сообщения Boosty при приобретении проходки этим способом.
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaBoosty}`}
                href="https://boosty.to/pirozxhok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiBoosty aria-hidden /> Перейти на Boosty
              </a>
              <a
                className={styles.cta}
                href="https://t.me/dmine_support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdSupportAgent aria-hidden /> Перейти к поддержке
              </a>
            </div>
          </section>
        ) : (
          <section className={styles.card} aria-labelledby="Telegram-title">
            <h1 id="Telegram-title" className={styles.title}>
              Проходка через анкету в Telegram
            </h1>
            <p className={styles.subtitle}>
              После одобрения вашей заявки, Вас
              добавят в белый список в течение 2-ух часов.
            </p>
            <ol className={styles.steps}>
              <li>
                Перейдите к поддержке сервера в Telegram.
              </li>
              <li>Напишите свою анкету в поддержку сервера.</li>
              <li>
                Анкета должна быть оформлена следующим способом:
                
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaTelegram}`}
                href="https://t.me/dmine_support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTelegram aria-hidden /> Перейти на Telegram
              </a>
              <a
                className={styles.cta}
                href="https://t.me/dmine_support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdSupportAgent aria-hidden /> Перейти к поддержке
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
