"use client";

import { ThemeToggle } from "../../features/ThemeToggle/ThemeToggle";
import SocialLinks from "@/features/SocialLinks/SocialLinks";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Главная", path: "/" },
    { label: "О сервере", path: "/about" },
    { label: "Проходка", path: "/pass" },
    { label: "Правила", path: "/rules" },
    { label: "Вики", path: "/wiki" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={styles.logo}>
          <Link href="/">
            <span>D.Mine</span>
          </Link>
        </div>

        <div className={styles.navigation}>
          <ul className={styles.navBar}>
            {navItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <li
                  className={`${styles.navElement} ${
                    pathname === item.path ||
                    (item.path === "/wiki" && pathname.startsWith("/wiki"))
                      ? styles.active
                      : ""
                  }`}
                >
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
          <SocialLinks />
        </div>

        <ThemeToggle />
      </div>

      {/* Мобильное меню */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        onClick={closeMenu}
      >
        <div
          className={styles.mobileMenuContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.mobileLogo}>
            <Link href="/" onClick={closeMenu}>
              <span>D.Mine</span>
            </Link>
          </div>
          <ul className={styles.mobileNavBar}>
            {navItems.map((item) => (
              <Link href={item.path} key={item.path} onClick={closeMenu}>
                <li
                  className={`${styles.mobileNavElement} ${
                    pathname === item.path ||
                    (item.path === "/wiki" && pathname.startsWith("/wiki"))
                      ? styles.active
                      : ""
                  }`}
                >
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
          <div className={styles.mobileSocialLinks}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
