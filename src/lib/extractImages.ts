// Утилита для извлечения URL изображений из markdown контента
export function extractImageUrls(markdownContent: string): string[] {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images: string[] = [];
  let match;

  while ((match = imageRegex.exec(markdownContent)) !== null) {
    const imageUrl = match[1];
    if (imageUrl && !imageUrl.startsWith("http")) {
      // Добавляем только локальные изображения
      images.push(imageUrl);
    }
  }

  return images;
}
