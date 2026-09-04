"use client";
import styles from "./page.module.scss";
import { MdWarning } from "react-icons/md";

export default function Entrance() {
  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <section className={styles.card} aria-labelledby="closed-title">
          <div className={styles.closedIcon}>
            <MdWarning aria-hidden size={48} />
          </div>
          <h1 id="closed-title" className={styles.title}>
            Набор на сервер закрыт
          </h1>
          <p className={styles.subtitle}>
            К сожалению, в данный момент набор на сервер приостановлен.
            Следите за новостями в наших социальных сетях — мы сообщим, когда
            проходка откроется снова.
          </p>
          <div className={styles.actions}>
            <a
              className={`${styles.cta} ${styles.ctaTelegram}`}
              href="https://t.me/dminenet"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Перейти в Telegram</span>
            </a>
            <a
              className={`${styles.cta} ${styles.ctaVk}`}
              href="https://vk.com/dminenet"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Перейти в ВК</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
