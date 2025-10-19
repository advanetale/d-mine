import { getWikiPages, getWikiPage } from "@/lib/wiki";
import { extractHeadings } from "@/lib/markdown";
import { extractImageUrls } from "@/lib/extractImages";
import WikiNavigation from "@/components/WikiNavigation/WikiNavigation";
import WikiMobileMenu from "@/components/WikiMobileMenu/WikiMobileMenu";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";
import styles from "./page.module.scss";

export default function Wiki() {
  const pages = getWikiPages();
  const currentPage = getWikiPage("index");

  if (!currentPage) {
    return <div>Страница не найдена</div>;
  }

  // Извлекаем заголовки из контента для правой панели
  const headings = extractHeadings(currentPage.content);

  // Извлекаем изображения для preloading
  const imageUrls = extractImageUrls(currentPage.content);

  return (
    <main className={styles.main}>
      {/* Preload изображений wiki */}
      {imageUrls.slice(0, 3).map((imageUrl, index) => (
        <link key={index} rel="preload" as="image" href={imageUrl} />
      ))}

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <WikiNavigation pages={pages} currentSlug="index" />
        </aside>

        <section className={styles.content}>
          {/* Мобильное меню */}
          <WikiMobileMenu
            pages={pages}
            currentSlug="index"
            headings={headings}
          />

          <MarkdownRenderer
            content={currentPage.content}
            enableHeadingLinks={false}
          />
        </section>

        <aside className={styles.rightSidebar}>
          <h3>На этой странице</h3>
          <div className={styles.sidebarContent}>
            <ul className={styles.tocList}>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
