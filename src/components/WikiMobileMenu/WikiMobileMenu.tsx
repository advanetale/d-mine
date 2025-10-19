"use client";

import { IoList, IoBook } from "react-icons/io5";
import { WikiPage } from "@/lib/wiki";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import styles from "./WikiMobileMenu.module.scss";

interface WikiMobileMenuProps {
  pages: WikiPage[];
  currentSlug: string;
  headings: Array<{ id: string; title: string; level: number }>;
}

export default function WikiMobileMenu({
  pages,
  currentSlug,
  headings,
}: WikiMobileMenuProps) {
  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <MobileSidebar title="Навигация по Wiki">
      {/* Содержание текущей страницы */}
      {headings.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <IoList />
            <h3 className={styles.sectionTitle}>На этой странице</h3>
          </div>
          <ul className={styles.navList}>
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  className={styles.navLink}
                  onClick={() => scrollToHeading(heading.id)}
                >
                  <span className={styles.headingText}>{heading.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Другие страницы wiki */}
      <div className={styles.sectionHeader}>
        <IoBook />
        <h3 className={styles.sectionTitle}>Другие страницы</h3>
      </div>
      <ul className={styles.navList}>
        {pages.map((page) => (
          <li key={page.slug}>
            <a
              href={page.slug === "index" ? "/wiki" : `/wiki/${page.slug}`}
              className={`${styles.navLink} ${
                currentSlug === page.slug ? styles.active : ""
              }`}
            >
              <span className={styles.pageTitle}>{page.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </MobileSidebar>
  );
}
