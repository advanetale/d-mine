import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "D.Mine",
  description: "Оффициальный сайт сервера D.Mine",
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
