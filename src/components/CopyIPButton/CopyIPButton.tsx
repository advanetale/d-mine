"use client";

import { useState } from "react";
import styles from "./CopyIPButton.module.scss";

interface CopyIPButtonProps {
  ip: string;
  className?: string;
}

export function CopyIPButton({ ip, className }: CopyIPButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Сбрасываем через 2 секунды
    } catch (err) {
      console.error("Не удалось скопировать IP:", err);
      // Fallback для старых браузеров
      const textArea = document.createElement("textarea");
      textArea.value = ip;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      className={`${styles.copyButton} ${copied ? styles.copied : ""} ${
        className || ""
      }`}
      onClick={handleCopyIP}
      aria-label={copied ? "IP адрес скопирован" : "Скопировать IP адрес"}
    >
      <div className={styles.iconContainer}>
        {/* Иконка клипборда */}
        <svg
          className={`${styles.icon} ${styles.clipboardIcon} ${
            copied ? styles.hidden : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>

        {/* Иконка галочки */}
        <svg
          className={`${styles.icon} ${styles.checkIcon} ${
            copied ? styles.visible : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </div>

      <code className={styles.ipText}>{ip}</code>

      <span className={styles.tooltip}>
        {copied ? "Скопировано!" : "Нажмите, чтобы скопировать"}
      </span>
    </button>
  );
}
