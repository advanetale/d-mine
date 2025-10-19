import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import StructuredData from "@/components/StructuredData/StructuredData";
import "./globals.scss";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BackgroundVideo from "@/components/BackgroundVideo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "D.Mine - Minecraft сервер",
    template: "%s | D.Mine",
  },
  description:
    "Официальный сайт сервера D.Mine - частный Minecraft сервер с уникальными возможностями и дружелюбным сообществом",
  keywords: ["minecraft", "сервер", "d.mine", "игра", "выживание", "креатив"],
  authors: [{ name: "D.Mine Team" }],
  creator: "D.Mine",
  publisher: "D.Mine",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://d-mine.net",
    siteName: "D.Mine",
    title: "D.Mine - Minecraft сервер",
    description:
      "Официальный сайт сервера D.Mine - частный Minecraft сервер с уникальными возможностями",
  },
  alternates: {
    canonical: "https://d-mine.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "D.Mine - Minecraft сервер",
    description:
      "Официальный сайт сервера D.Mine - частный Minecraft сервер с уникальными возможностями",
  },
  verification: {
    google:
      "google-site-verification=YDZTwn11g0cdeU4iVOFM9E_y07AQJzwsoEdtXQJWhcE", // Получите код в Google Search Console
    // yandex: 'your-yandex-verification-code', // Добавьте после регистрации в Яндекс.Вебмастер
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Получаем сохраненную тему из localStorage
                  var savedTheme = localStorage.getItem('theme');
                  var theme = 'light';
                  
                  if (savedTheme === 'dark' || savedTheme === 'light') {
                    theme = savedTheme;
                  } else {
                    // Если нет сохраненной темы, проверяем системную
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      theme = 'dark';
                    }
                  }
                  
                  // Применяем тему сразу
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // Fallback на светлую тему при ошибке
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics trackPageViews gaMeasurementId="G-18W35FN0K0" />
        <StructuredData
          type="website"
          data={{
            name: "D.Mine",
            url: "https://d-mine.net",
            description:
              "Официальный сайт сервера D.Mine - частный Minecraft сервер",
          }}
        />
        <StructuredData
          type="organization"
          data={{
            name: "D.Mine",
            url: "https://d-mine.net",
            description: "Частный Minecraft сервер с уникальными возможностями",
            socialLinks: ["https://t.me/dminenet"],
          }}
        />
        <BackgroundVideo />
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
