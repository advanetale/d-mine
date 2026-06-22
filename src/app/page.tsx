"use client";

import Link from "next/link";
import { Button } from "../components/Button";
import { CopyIPButton } from "../components/CopyIPButton/CopyIPButton";
import { ServerTimer } from "../components/ServerTimer";
import styles from "./page.module.scss";

export default function Home() {
  const serverIP = "play.d-mine.net";

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <h1 className={styles.title}>D.Mine</h1>
        <p className={styles.subtitle}>Бесплатный приватный сервер Minecraft</p>
        <ServerTimer />

        <div className={styles.version}>Версия 26.2. Требуется лицензия Minecraft</div>

        <div className={styles.actions}>
          <Link href="/pass">
            <Button size="large">Подать заявку</Button>
          </Link>
          <CopyIPButton ip={serverIP} />
        </div>
      </main>
    </div>
  );
}
