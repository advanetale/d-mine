import { getWikiPages, getWikiPage } from "@/lib/wiki";
import { extractHeadings } from "@/lib/markdown";
import { extractImageUrls } from "@/lib/extractImages";
import WikiNavigation from "@/components/WikiNavigation/WikiNavigation";
import WikiMobileMenu from "@/components/WikiMobileMenu/WikiMobileMenu";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";
import { Metadata } from "next";
import styles from "../page.module.scss";

interface WikiPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { slug } = await params;
  const pages = getWikiPages();
  const currentPage = getWikiPage(slug);

  if (!currentPage) {
    return (
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h1>Страница не найдена</h1>
            <p>Запрашиваемая страница вики не существует.</p>
          </div>
        </div>
      </main>
    );
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
          <WikiNavigation pages={pages} currentSlug={slug} />
        </aside>

        <section className={styles.content}>
          {/* Мобильное меню */}
          <WikiMobileMenu
            pages={pages}
            currentSlug={slug}
            headings={headings}
          />

          <MarkdownRenderer content={currentPage.content} />
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

// Генерируем метаданные для каждой страницы wiki
export async function generateMetadata({
  params,
}: WikiPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getWikiPage(slug);

  if (!page) {
    return {
      title: "Страница не найдена",
      description: "Запрашиваемая страница вики не существует",
    };
  }

  // Извлекаем первый абзац как описание
  const description =
    page.content
      .replace(/^#.*$/gm, "") // Убираем заголовки
      .replace(/!\[.*?\]\(.*?\)/g, "") // Убираем изображения
      .split("\n")
      .find((line) => line.trim().length > 0)
      ?.trim()
      .substring(0, 160) || `Страница ${page.title} в вики D.Mine`;

  return {
    title: page.title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

// Генерируем статические пути для всех страниц вики
export async function generateStaticParams() {
  const pages = getWikiPages();
  return pages
    .filter((page) => page.slug !== "index") // Исключаем главную страницу
    .map((page) => ({
      slug: page.slug,
    }));
}
