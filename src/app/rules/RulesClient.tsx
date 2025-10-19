"use client";

import { useState, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import RulesMobileMenu from "@/components/RulesMobileMenu/RulesMobileMenu";
import styles from "./page.module.scss";

interface RulesClientProps {
  rulesContent: string;
}

interface Section {
  id: string;
  title: string;
  number: string;
}

// Простая функция для парсинга разделов из markdown
function parseRulesContent(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Ищем основные разделы (например: "1. Общие правила проекта")
    const sectionMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (sectionMatch && !line.includes("1.1") && !line.includes("2.1")) {
      const [, number, title] = sectionMatch;
      sections.push({
        id: `section-${number}`,
        title: title,
        number: number,
      });
    }
  }

  return sections;
}

export default function RulesClient({ rulesContent }: RulesClientProps) {
  const [activeSection, setActiveSection] = useState("section-1");
  const [isClient, setIsClient] = useState(false);
  const [visibleLists, setVisibleLists] = useState<Record<string, boolean>>({});

  const sections = parseRulesContent(rulesContent);

  const toggleListVisibility = (listId: string) => {
    setVisibleLists((prev) => ({
      ...prev,
      [listId]: !prev[listId],
    }));
  };

  useEffect(() => {
    setIsClient(true);

    // Исправляем overflow для работы sticky
    // document.documentElement.style.overflowX = "visible";
    // document.body.style.overflowX = "visible";
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient, sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Разбиваем контент на разделы
  const renderRulesContent = () => {
    const lines = rulesContent.split("\n");
    const renderedSections = [];
    let currentSectionLines: string[] = [];
    let currentSectionInfo: Section | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Проверяем, начинается ли новый раздел
      const sectionMatch = line.trim().match(/^(\d+)\.\s+(.+)$/);
      if (sectionMatch && !line.includes("1.1") && !line.includes("2.1")) {
        // Сохраняем предыдущий раздел
        if (currentSectionInfo && currentSectionLines.length > 0) {
          renderedSections.push(
            <section
              key={currentSectionInfo.id}
              id={currentSectionInfo.id}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                {currentSectionInfo.number}. {currentSectionInfo.title}
              </h2>
              <div className={styles.sectionContent}>
                {renderSectionContent(currentSectionLines)}
              </div>
            </section>
          );
        }

        // Начинаем новый раздел
        const [, number, title] = sectionMatch;
        currentSectionInfo = {
          id: `section-${number}`,
          title: title,
          number: number,
        };
        currentSectionLines = [];
      } else if (currentSectionInfo) {
        currentSectionLines.push(line);
      }
    }

    // Добавляем последний раздел
    if (currentSectionInfo && currentSectionLines.length > 0) {
      renderedSections.push(
        <section
          key={currentSectionInfo.id}
          id={currentSectionInfo.id}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>
            {currentSectionInfo.number}. {currentSectionInfo.title}
          </h2>
          <div className={styles.sectionContent}>
            {renderSectionContent(currentSectionLines)}
          </div>
        </section>
      );
    }

    return renderedSections;
  };

  const renderSectionContent = (lines: string[]) => {
    const content = [];
    let currentList: string[] = [];
    let listType: "ordered" | "unordered" | null = null;
    let currentSubtitle = "";
    let currentContext = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      // Подзаголовки (заканчиваются на :)
      if (
        line.endsWith(":") &&
        !line.match(/^\d+\.\d+/) &&
        !line.startsWith("-")
      ) {
        // Завершаем текущий список если есть
        if (currentList.length > 0) {
          content.push(
            renderList(currentList, listType, content.length, currentContext)
          );
          currentList = [];
          listType = null;
        }

        currentSubtitle = line.replace(":", "");
        content.push(
          <h3
            key={`subtitle-${content.length}`}
            className={styles.subsectionTitle}
          >
            {currentSubtitle}:
          </h3>
        );
        continue;
      }

      // Маркированные списки (начинаются с дефиса)
      const bulletMatch = line.match(/^-\s+(.+)$/);
      if (bulletMatch) {
        const [, text] = bulletMatch;
        currentList.push(text);
        listType = "unordered";
        continue;
      }

      // Пункты правил (например: "1.1. Пропаганда...")
      const itemMatch = line.match(/^(\d+\.\d+)\.\s+(.+)$/);
      if (itemMatch) {
        const [, , text] = itemMatch;
        currentList.push(text);
        listType = "ordered";
        continue;
      }

      // Обычный текст
      if (line && !line.match(/^\d+\./) && !line.startsWith("-")) {
        // Завершаем текущий список если есть
        if (currentList.length > 0) {
          content.push(
            renderList(currentList, listType, content.length, currentContext)
          );
          currentList = [];
          listType = null;
        }

        // Сохраняем контекст для следующего списка
        currentContext = line;

        content.push(
          <p key={`text-${content.length}`} className={styles.sectionSubtitle}>
            {line}
          </p>
        );
      }
    }

    // Завершаем последний список если есть
    if (currentList.length > 0) {
      content.push(
        renderList(currentList, listType, content.length, currentContext)
      );
    }

    return content;
  };

  const renderList = (
    items: string[],
    type: "ordered" | "unordered" | null,
    key: number,
    listTitle?: string
  ) => {
    if (type === "unordered") {
      const listId = `list-${key}`;
      const isVisible = visibleLists[listId] || false;

      // Определяем название для кнопки
      const getListButtonText = () => {
        if (listTitle && listTitle.includes("запрещенных модов")) {
          return isVisible
            ? "Скрыть запрещенные моды"
            : "Показать запрещенные моды";
        }
        return isVisible ? "Скрыть список" : "Показать список";
      };

      // Для маркированных списков используем кнопку переключения
      return (
        <div key={listId} className={styles.listContainer}>
          <button
            className={styles.listToggleButton}
            onClick={() => toggleListVisibility(listId)}
            type="button"
          >
            {isVisible ? <IoEyeOff /> : <IoEye />}
            <span>{getListButtonText()}</span>
          </button>

          {isVisible && (
            <ul className={styles.checkList}>
              {items.map((item, index) => (
                <li key={index} className={styles.checkListItem}>
                  <span className={styles.checkText}>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    // Для нумерованных списков используем обычный стиль
    const ListComponent = type === "ordered" ? "ol" : "ul";
    return (
      <ListComponent key={`list-${key}`} className={styles.rulesList}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ListComponent>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Мобильное меню */}
          {isClient && sections.length > 0 && (
            <RulesMobileMenu
              sections={sections}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
          )}

          <header className={styles.header}>
            <h1 className={styles.title}>Правила D.mine</h1>
          </header>

          <div className={styles.content}>
            {renderRulesContent()}

            <div className={styles.footer}>
              <p className={styles.footerNote}>
                <strong>Примечание:</strong> Настоящие правила распространяются
                на все аспекты функционирования проекта D.Mine, включая общение
                в чатах, организованных на платформах социальных сетей.
              </p>
            </div>
          </div>
        </main>

        {isClient && sections.length > 0 && (
          <>
            {/* Десктопная навигация */}
            <aside className={styles.sidebar}>
              <nav className={styles.nav}>
                <h2 className={styles.navTitle}>На этой странице</h2>
                <ul className={styles.navList}>
                  {sections.map((section) => (
                    <li key={section.id} className={styles.navItem}>
                      <button
                        className={`${styles.navLink} ${
                          activeSection === section.id ? styles.active : ""
                        }`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <span className={styles.navNumber}>
                          {section.number}.
                        </span>
                        <span className={styles.navText}>{section.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
