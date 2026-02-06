import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://d-mine.net",
      lastModified: now,
      changeFrequency: "always",
      priority: 1,
    },
  ];
}
