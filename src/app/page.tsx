"use client";

import Link from "next/link";
import { Button } from "../components/Button";
import { CopyIPButton } from "../components/CopyIPButton/CopyIPButton";
import styles from "./page.module.scss";

export default function Home() {
  const serverIP = "play.d-mine.net";

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <h1 className={styles.title}>D.Mine</h1>
        <p className={styles.subtitle}>
          Приватный сервер с уникальными элементами выживания
        </p>
        <div className={styles.version}>Версия 1.21.10</div>

        <div className={styles.actions}>
          <Link href="/pass">
            <Button size="large">Приобрести проходку</Button>
          </Link>
          <CopyIPButton ip={serverIP} />
        </div>
      </main>
    </div>
  );
}
