import styles from "./page.module.scss";
import AboutCarousel, { type CarouselImage } from "./AboutCarousel";
import { getAboutImages } from "./getAboutImages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "О сервере",
  description:
    "D.Mine — бесплатный приватный сервер Minecraft с уникальными механиками.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function About() {
  const serverFeatures = [
    "Огромный остров",
    "Кастомная генерация",
    "Двойной прыжок",
    "Отдельный мир для ферм",
    "Дружелюбное сообщество",
    "Сюжет в каждом сезоне",
  ];

  const serverImages: CarouselImage[] = await getAboutImages();

  return (
    <div className={styles.page}>
      {/* Preload всех изображений карусели */}
      {serverImages.map((image, index) => (
        <link key={index} rel="preload" as="image" href={image.src} />
      ))}

      <main className={`${styles.main} container`}>
        {/* Заголовок */}
        <section className={styles.hero}>
          <h1 className={styles.title}>О сервере D.Mine</h1>
          <p className={styles.subtitle}>
            Бесплатный приватный сервер выживания для каждого игрока
          </p>
        </section>

        {/* Описание сервера */}
        <section className={styles.description}>
          <h2 className={styles.sectionTitle}>
            Добро пожаловать!
          </h2>
          <p>
            D.Mine — это бесплатный приватный сервер Minecraft. Вас ждёт измененная генерация мира,
            новые механики, полноценный сюжет и многое другое!
          </p>
          <p>
            Наш сервер предлагает сбалансированный геймплей, где важны как
            личные навыки, так и взаимодействие с другими игроками.
            Присоединяйтесь к нашему дружному сообществу и создайте свою историю
            на D.Mine!
          </p>
        </section>

        {/* Особенности сервера */}
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Особенности сервера</h2>
          <div className={styles.featureGrid}>
            {serverFeatures.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Карусель скриншотов */}
        <section className={styles.gallery}>
          <h2 className={styles.sectionTitle}>Скриншоты сервера</h2>
          <AboutCarousel images={serverImages} />
        </section>

        {/* Информация о сервере */}
        <section className={styles.serverInfo}>
          <h2 className={styles.sectionTitle}>Техническая информация</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Версия Minecraft:</strong>
              <span>26.2</span>
            </div>
            <div className={styles.infoItem}>
              <strong>IP адрес:</strong>
              <code>play.d-mine.net</code>
            </div>
            <div className={styles.infoItem}>
              <strong>Режим игры:</strong>
              <span>Выживание (Survival)</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Максимум игроков:</strong>
              <span>500 человек</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Время работы:</strong>
              <span>24/7</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Регион:</strong>
              <span>Россия</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
