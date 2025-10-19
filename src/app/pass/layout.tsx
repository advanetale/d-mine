import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Получить проходку",
  description: "Получите доступ к серверу D.Mine через Boosty или Twitch",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
