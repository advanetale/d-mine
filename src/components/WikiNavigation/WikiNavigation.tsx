import Link from "next/link";
import { WikiPage } from "@/lib/wiki";
import styles from "./WikiNavigation.module.scss";

interface WikiNavigationProps {
  pages: WikiPage[];
  currentSlug?: string;
}

interface WikiGroup {
  title: string;
  pages: WikiPage[];
}

export default function WikiNavigation({
  pages,
  currentSlug,
}: WikiNavigationProps) {
  // Создаем карту страниц для быстрого поиска
  const pageMap = new Map(pages.map((page) => [page.slug, page]));

  // Определяем группы страниц
  const groups: WikiGroup[] = [
    {
      title: "Основные разделы",
      pages: [pageMap.get("faq"), pageMap.get("commands")].filter(
        Boolean
      ) as WikiPage[],
    },
    {
      title: "Игровые миры",
      pages: [
        pageMap.get("main-world"),
        pageMap.get("farm-world"),
        pageMap.get("trading"),
      ].filter(Boolean) as WikiPage[],
    },
    {
      title: "Игровые возможности",
      pages: [
        pageMap.get("crafts"),
        pageMap.get("skin-change"),
        pageMap.get("pets"),
        pageMap.get("colored-nick"),
        pageMap.get("badges"),
      ].filter(Boolean) as WikiPage[],
    },
  ];

  return (
    <nav className={styles.navigation}>
      {/* Главная страница */}
      <div className={styles.mainPage}>
        <Link
          href="/wiki"
          className={currentSlug === "index" ? styles.active : ""}
        >
          Введение
        </Link>
      </div>

      {/* Группы страниц */}
      {groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h4 className={styles.groupTitle}>{group.title}</h4>
          <ul className={styles.navList}>
            {group.pages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/wiki/${page.slug}`}
                  className={currentSlug === page.slug ? styles.active : ""}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
