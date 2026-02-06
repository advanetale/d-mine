"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { SiTelegram, SiTwitch } from "react-icons/si";
import { MdSupportAgent } from "react-icons/md";

export default function Entrance() {
  const [isTwitch, setTwitch] = useState(false);

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Выбор способа оплаты"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isTwitch}
            className={`${styles.tab} ${styles.tabTelegram} ${
              !isTwitch ? styles.tabActive : ""
            }`}
            onClick={() => setTwitch(false)}
          >
            <SiTelegram aria-hidden size={18} />
            <span>Telegram</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isTwitch}
            className={`${styles.tab} ${styles.tabTwitch} ${
              isTwitch ? styles.tabActive : ""
            }`}
            onClick={() => setTwitch(true)}
          >
            <SiTwitch aria-hidden size={18} />
            <span>Twitch</span>
          </button>
        </div>

        {isTwitch ? (
          <section className={styles.card} aria-labelledby="twitch-title">
            <h1 id="twitch-title" className={styles.title}>
              Проходка через баллы канала Twitch
            </h1>
            <p className={styles.subtitle}>
              Обменяй баллы канала владельца сервера на проходку. Обычно
              проверка занимает 5–10 минут при онлайн‑стриме.
            </p>
            <ol className={styles.steps}>
              <li>
                Перейдите на канал владельца сервера и убедись, что идёт
                трансляция.
              </li>
              <li>
                Накопите нужное количество баллов канала и выкупите награду
                «Проходка на сервер».
              </li>
              <li>
                Не забудьте указать свой ник при приобретении проходки этим
                способом, а так же пришлите скрин с подтверждением приобретения
                в поддержку для добавления в белый список.
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaTwitch}`}
                href="https://www.twitch.tv/pirozxhok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTwitch aria-hidden /> Перейти на Twitch
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
              Проходка через подписку Telegram
            </h1>
            <p className={styles.subtitle}>
              Оформите подписку на Telegram нашего сервера — после оплаты вас
              добавят в белый список в течение 2-ух часов.
            </p>
            <ol className={styles.steps}>
              <li>
                Перейдите на наш Telegram и выберите уровень подписки «Проходка на
                сервер».
              </li>
              <li>Завершите оплату удобным способом.</li>
              <li>
                После оплаты вам придет пригласительное письмо в личные
                сообщения Telegram. Напишите нам в личные сообщения свой
                действительный никнейм Minecraft или обратитесь в поддержку.
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaTelegram}`}
                href="https://Telegram.to/d-mine"
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
