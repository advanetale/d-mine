"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { SiTelegram, SiBoosty, SiVk } from "react-icons/si";
import { MdSupportAgent } from "react-icons/md";

type TabType = "telegram" | "boosty" | "vk";

export default function Entrance() {
  const [activeTab, setActiveTab] = useState<TabType>("telegram");

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Способы проходки"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "telegram"}
            className={`${styles.tab} ${styles.tabTelegram} ${
              activeTab === "telegram" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("telegram")}
          >
            <SiTelegram aria-hidden size={18} />
            <span>Telegram</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "boosty"}
            className={`${styles.tab} ${styles.tabBoosty} ${
              activeTab === "boosty" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("boosty")}
          >
            <SiBoosty aria-hidden size={18} />
            <span>Boosty</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "vk"}
            className={`${styles.tab} ${styles.tabVk} ${
              activeTab === "vk" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("vk")}
          >
            <SiVk aria-hidden size={18} />
            <span>VK</span>
          </button>
        </div>

        {activeTab === "boosty" && (
          <section className={styles.card} aria-labelledby="Boosty-title">
            <h1 id="Boosty-title" className={styles.title}>
              Проходка через Boosty
            </h1>
            <p className={styles.subtitle}>
              Приобретайте проходку через Boosty.
            </p>
            <ol className={styles.steps}>
              <li>Перейдите на Boosty.</li>
              <li>Приобретите любую подписку.</li>
              <li>
                Не забудьте указать свой ник в личные сообщения Boosty при
                приобретении проходки этим способом.
              </li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaBoosty}`}
                href="https://boosty.to/d-mine"
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
        )}

        {activeTab === "telegram" && (
          <section className={styles.card} aria-labelledby="Telegram-title">
            <h1 id="Telegram-title" className={styles.title}>
              Проходка через анкету в Telegram
            </h1>
            <p className={styles.subtitle}>
              Отправьте свою заявку в поддержку сервера. Заявка рассматривается максимум три дня. После одобрения Вас
              добавят в течение 2-ух часов. Анкета должна быть оформлена
              следующим способом:
            </p>
            <ol className={styles.steps}>
              <li>Ваш никнейм.</li>
              <li>Расскажите о себе.</li>
              <li>Имеется ли у вас лицензия Minecraft? (Да/Нет)</li>
              <li>Прикрепите скриншот вашего скина.</li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaTelegram}`}
                href="https://telegram.me/dmine_support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTelegram aria-hidden /> Перейти в Telegram
              </a>
            </div>
          </section>
        )}

        {activeTab === "vk" && (
          <section className={styles.card} aria-labelledby="VK-title">
            <h1 id="VK-title" className={styles.title}>
              Проходка через анкету в ВКонтакте
            </h1>
            <p className={styles.subtitle}>
              Отправьте заявку в личные сообщения сообщество. Проверка заявки через ВКонтакте может занять до семи дней. После одобрения Вас
              добавят в течение 2-ух часов. Оформите заявку по следующему шаблону:
            </p>
            <ol className={styles.steps}>
              <li>Ваш никнейм в Minecraft.</li>
              <li>Расскажите о себе.</li>
              <li>Есть ли у вас лицензия Minecraft? (Да/Нет)</li>
              <li>Прикрепите скриншот вашего скина.</li>
            </ol>
            <div className={styles.actions}>
              <a
                className={`${styles.cta} ${styles.ctaVk}`}
                href="https://vk.com/dminenet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiVk aria-hidden /> Перейти в ВК
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
