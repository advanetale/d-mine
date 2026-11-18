import styles from "./page.module.scss";
import { MdStorefront, MdSupportAgent, MdCheckCircle } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";

export default function Store() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Магазин D.Mine</h1>
          <p className={styles.subtitle}>
            Приобретение привилегий и товаров для сервера
          </p>
        </header>

        <section className={styles.card}>
          <div className={styles.cardIcon}>
            <MdStorefront size={32} />
          </div>
          <h2 className={styles.cardTitle}>Мы на MyDonate</h2>
          <p className={styles.cardText}>
            Наш магазин работает на платформе агрегатора <strong>MyDonate</strong>. 
            Это обеспечивает безопасную оплату и мгновенную автоматическую выдачу 
            всех товаров на сервере.
          </p>
          <a
            href="https://store.d-mine.net/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <MdStorefront size={20} />
            Перейти в магазин
          </a>
        </section>

        <section className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <MdCheckCircle className={styles.infoIcon} size={24} />
            <div>
              <h3 className={styles.infoTitle}>Автоматическая выдача</h3>
              <p className={styles.infoText}>
                После успешной оплаты все товары выдаются автоматически. 
                Ожидать администратора не требуется.
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <MdSupportAgent className={styles.infoIcon} size={24} />
            <div>
              <h3 className={styles.infoTitle}>Нужна помощь?</h3>
              <p className={styles.infoText}>
                Если товар не пришёл или возникли вопросы — обратитесь в поддержку. 
                Мы поможем разобраться.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.supportSection}>
          <h2 className={styles.supportTitle}>Поддержка</h2>
          <p className={styles.supportText}>
            По всем вопросам, связанным с оплатой и выдачей товаров, 
            пишите в нашу службу поддержки в Telegram.
          </p>
          <a
            href="https://t.me/dmine_support"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaTelegram}`}
          >
            <FaTelegramPlane size={20} />
            Написать в поддержку
          </a>
        </section>
      </main>
    </div>
  );
}
