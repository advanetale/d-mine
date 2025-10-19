import SocialLinks from "@/features/SocialLinks/SocialLinks";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          {/* Верхняя секция */}
          <div className={styles.topSection}>
            <div className={styles.mainInfo}>
              <h3 className={styles.projectName}>D.Mine</h3>
              <p className={styles.description}>
                Частный сервер Minecraft с уникальными возможностями и
                дружелюбным сообществом
              </p>
            </div>
            <SocialLinks className={styles.socialLinks} />
          </div>

          {/* Дисклеймер */}
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              Not an official Minecraft product. We are in no way affiliated
              with or endorsed by Mojang Synergies AB, Microsoft Corporation or
              other rightsholders.
            </p>
          </div>

          {/* Авторство */}
          <div className={styles.credits}>
            <p className={styles.creditsText}>
              Сайт разработан{" "}
              <a
                href="https://ijustseen.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorLink}
              >
                ijustseen
              </a>
            </p>
            <p className={styles.copyright}>
              © 2025 D.Mine. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
