import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import StructuredData from "@/components/StructuredData/StructuredData";
import GameServerStructuredData from "@/components/GameServerStructuredData";
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
    default: "D.Mine - Приватный Minecraft сервер | Майнкрафт сервер | Дмайн",
    template: "%s | D.Mine - Майнкрафт сервер",
  },
  description:
    "D.Mine - бесплатный приватный Minecraft сервер в России. Лучший Майнкрафт сервер с уникальными возможностями, дружелюбным сообществом и стабильной работой. Присоединяйтесь к Дмайн майнкрафт серверу!",
  keywords: [
    "minecraft",
    "майнкрафт",
    "сервер",
    "приватный сервер",
    "minecraft сервер",
    "майнкрафт сервер",
    "приватный сервер майнкрафт",
    "d.mine",
    "дмайн",
    "дмайн майнкрафт сервер",
    "d mine",
    "игра",
    "выживание",
    "выживание на острове",
    "русский minecraft сервер",
    "лучший майнкрафт сервер",
    "стабильный minecraft сервер",
    "minecraft server",
    "приватный майнкрафт",
    "закрытый сервер майнкрафт",
    "d-mine",
    "dmine",
    "дмине",
  ],
  authors: [{ name: "D.Mine Team" }],
  creator: "D.Mine",
  publisher: "D.Mine",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://d-mine.net",
    siteName: "D.Mine - Майнкрафт сервер",
    title:
      "D.Mine - Лучший приватный Minecraft сервер | Дмайн майнкрафт сервер",
    description:
      "D.Mine - бесплатный приватный Minecraft сервер с уникальными возможностями. Стабильный майнкрафт сервер для игры с друзьями. Присоединяйтесь к Дмайн!",
    images: [
      {
        url: "https://d-mine.net/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "D.Mine - Приватный Minecraft сервер",
      },
    ],
  },
  alternates: {
    canonical: "https://d-mine.net",
    languages: {
      "ru-RU": "https://d-mine.net",
      ru: "https://d-mine.net",
    },
  },
  twitter: {
    card: "summary_large_image",
    title:
      "D.Mine - Лучший приватный Minecraft сервер | Дмайн майнкрафт сервер",
    description:
      "D.Mine - бесплатный приватный Minecraft сервер с уникальными возможностями. Стабильный майнкрафт сервер для игры с друзьями.",
  },
  verification: {
    google:
      "google-site-verification=YDZTwn11g0cdeU4iVOFM9E_y07AQJzwsoEdtXQJWhcE", // Получите код в Google Search Console
    // yandex: 'your-yandex-verification-code', // Добавьте после регистрации в Яндекс.Вебмастер
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta
          name="application-name"
          content="Приватный Майнкрафт сервер - D.Mine"
        />
        <meta name="apple-mobile-web-app-title" content="D.Mine" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Получаем сохраненную тему из localStorage
                  var savedTheme = localStorage.getItem('theme');
                  var theme = 'dark'; // По умолчанию темная тема
                  
                  if (savedTheme === 'dark' || savedTheme === 'light') {
                    theme = savedTheme;
                  } else {
                    // Если нет сохраненной темы, проверяем системную, но по умолчанию темная
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                      theme = 'light';
                    }
                  }
                  
                  // Применяем тему сразу
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // Fallback на темную тему при ошибке
                  document.documentElement.setAttribute('data-theme', 'dark');
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
            name: "D.Mine - Приватный Minecraft сервер",
            url: "https://d-mine.net",
            description:
              "D.Mine - лучший приватный Minecraft сервер в России. Майнкрафт сервер с уникальными возможностями и стабильной работой.",
            keywords:
              "minecraft, майнкрафт, сервер, приватный сервер майнкрафт, дмайн, d.mine",
          }}
        />
        <StructuredData
          type="organization"
          data={{
            name: "D.Mine - Майнкрафт сервер",
            url: "https://d-mine.net",
            description:
              "Приватный Minecraft сервер с уникальными возможностями, дружелюбным сообществом и стабильной работой",
            socialLinks: ["https://t.me/dminenet"],
          }}
        />
        <GameServerStructuredData
          serverName="D.Mine - Лучший приватный Minecraft сервер"
          serverUrl="https://d-mine.net"
          description="D.Mine - приватный Minecraft сервер №1 в России! Стабильный майнкрафт сервер с уникальными возможностями, дружелюбным сообществом и отличной производительностью."
          gameType="Survival, Creative, Adventure"
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
