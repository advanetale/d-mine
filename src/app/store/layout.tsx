import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Магазин",
  description: "Приобретение привилегий и товаров для сервера D.Mine через MyDonate",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
