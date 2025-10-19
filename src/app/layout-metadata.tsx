import { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "D.Mine - Minecraft сервер",
  description:
    "Официальный сайт сервера D.Mine - частный Minecraft сервер с уникальными возможностями и дружелюбным сообществом",
  keywords: ["minecraft", "сервер", "d.mine", "игра", "выживание", "креатив"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "D.Mine - Minecraft сервер",
    description:
      "Официальный сайт сервера D.Mine - частный Minecraft сервер с уникальными возможностями",
    url: "https://d-mine.net",
    siteName: "D.Mine",
    type: "website",
    locale: "ru_RU",
  },
  alternates: {
    canonical: "https://d-mine.net",
  },
};
