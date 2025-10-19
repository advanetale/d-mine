import fs from "fs";
import path from "path";
import RulesClient from "./RulesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Правила сервера",
  description:
    "Правила игры на сервере D.Mine. Ознакомьтесь с основными требованиями и ограничениями для комфортной игры.",
  robots: {
    index: false,
    follow: false,
  },
};

async function getRulesContent() {
  try {
    const filePath = path.join(process.cwd(), "public", "rules.md");
    const content = fs.readFileSync(filePath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading rules file:", error);
    return null;
  }
}

export default async function Rules() {
  const rulesContent = await getRulesContent();

  if (!rulesContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ошибка загрузки правил</h1>
          <p>Не удалось загрузить файл с правилами.</p>
        </div>
      </div>
    );
  }

  return <RulesClient rulesContent={rulesContent} />;
}
