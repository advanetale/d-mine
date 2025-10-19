import fs from "node:fs";
import path from "node:path";

const ABOUT_IMAGES_DIR = path.join(process.cwd(), "public", "about-images");

export async function getAboutImages() {
  const files = await fs.promises.readdir(ABOUT_IMAGES_DIR);
  const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
  const images = files
    .filter((f) => allowed.has(path.extname(f).toLowerCase()))
    .sort()
    .map((file) => ({
      src: `/about-images/${file}`,
    }));
  return images;
}
