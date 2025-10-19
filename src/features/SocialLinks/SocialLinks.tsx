import { FaTelegramPlane } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import styles from "./SocialLinks.module.scss";

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  const socialLinks = [
    {
      icon: <FaTelegramPlane />,
      href: "https://t.me/your_channel", // Замени на реальную ссылку
      title: "Telegram",
      ariaLabel: "Перейти в Telegram канал",
    },
    {
      icon: <MdSupportAgent />,
      href: "https://t.me/your_support_bot", // Замени на реальную ссылку техподдержки
      title: "Техподдержка",
      ariaLabel: "Связаться с техподдержкой",
    },
  ];

  return (
    <div className={`${styles.socialLinks} ${className || ""}`}>
      {socialLinks.map((link) => (
        <a
          key={link.title}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          title={link.title}
          aria-label={link.ariaLabel}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
