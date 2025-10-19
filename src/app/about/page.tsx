import styles from "./page.module.scss";
import AboutCarousel, { type CarouselImage } from "./AboutCarousel";
import { getAboutImages } from "./getAboutImages";

export default async function About() {
  const serverFeatures = [
    "Уникальная система выживания на острове",
    "Кастомные рецепты крафта",
    "Система экономики и торговли",
    "Дружелюбное сообщество",
    "Разделенные миры выживания и ферм",
    "Удобное лобби для перехода между мирами",
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
            Приватный сервер выживания на острове с уникальными механиками
          </p>
        </section>

        {/* Описание сервера */}
        <section className={styles.description}>
          <h2 className={styles.sectionTitle}>
            Добро пожаловать на остров выживания!
          </h2>
          <p>
            D.Mine — это приватный сервер Minecraft, где вас ждет увлекательное
            приключение на загадочном острове. Каждый игрок начинает с чистого
            листа, открывая неизведанные земли, собирая ресурсы и создавая
            огромные проекты вместе.
          </p>
          <p>
            Наш сервер предлагает сбалансированный геймплей, где важны как
            личные навыки, так и взаимодействие с другими игроками.
            Присоединяйтесь к нашему дружному сообществу и создайте свою историю
            на острове!
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
              <span>1.21.10</span>
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
