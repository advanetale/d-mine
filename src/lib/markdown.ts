// Утилиты для обработки markdown контента

export interface Heading {
  title: string;
  id: string;
  level: number;
}

// Функция для генерации ID из заголовка (совместимая с rehype-slug)
function generateSlugId(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-а-яё]/gi, "");
}

// Функция для извлечения заголовков из markdown контента
export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];

  lines.forEach((line) => {
    // Только заголовки h2 (##), исключаем h3 (###)
    if (line.match(/^##\s+/) && !line.match(/^###\s+/)) {
      const title = line.replace(/^##\s+/, "");
      const id = generateSlugId(title);

      headings.push({
        title,
        id,
        level: 2,
      });
    }
  });

  return headings;
}
