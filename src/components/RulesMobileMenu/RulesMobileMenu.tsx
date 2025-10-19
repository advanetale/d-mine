"use client";

import { IoList } from "react-icons/io5";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import styles from "./RulesMobileMenu.module.scss";

interface Section {
  id: string;
  title: string;
  number: string;
}

interface RulesMobileMenuProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function RulesMobileMenu({
  sections,
  activeSection,
  onSectionClick,
}: RulesMobileMenuProps) {
  return (
    <MobileSidebar title="Меню правил сервера">
      <div className={styles.sectionHeader}>
        <IoList />
        <h3 className={styles.sectionTitle}>На этой странице</h3>
      </div>
      <ul className={styles.navList}>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`${styles.navLink} ${
                activeSection === section.id ? styles.active : ""
              }`}
              onClick={() => onSectionClick(section.id)}
            >
              <span className={styles.navNumber}>{section.number}.</span>
              <span>{section.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </MobileSidebar>
  );
}
