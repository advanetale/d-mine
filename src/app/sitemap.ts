import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://d-mine.net",
      lastModified: new Date("2026-02-06").toISOString(),
      changeFrequency: "always",
      priority: 1,
    },
  ];
}
