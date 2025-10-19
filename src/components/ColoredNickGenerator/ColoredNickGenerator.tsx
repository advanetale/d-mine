"use client";

import { useState } from "react";
import styles from "./ColoredNickGenerator.module.scss";

export default function ColoredNickGenerator() {
  const [nickname, setNickname] = useState("");
  const [startColor, setStartColor] = useState("#54DAF4");
  const [endColor, setEndColor] = useState("#545EB6");
  const [generatedNick, setGeneratedNick] = useState("");
  const [copied, setCopied] = useState(false);

  const generateColoredNick = () => {
    if (!nickname.trim()) return;

    const chars = nickname.split("");
    const steps = chars.length - 1;

    if (steps === 0) {
      // Если только один символ, используем начальный цвет
      const color = startColor.replace("#", "");
      setGeneratedNick(`&#${color}${chars[0]}`);
      return;
    }

    let result = "";

    for (let i = 0; i < chars.length; i++) {
      const ratio = i / steps;
      const color = interpolateColor(startColor, endColor, ratio);
      result += `&#${color}${chars[i]}`;
    }

    setGeneratedNick(result);
  };

  const interpolateColor = (
    color1: string,
    color2: string,
    ratio: number
  ): string => {
    // Убираем # из начала
    const hex1 = color1.replace("#", "");
    const hex2 = color2.replace("#", "");

    // Конвертируем в RGB
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    // Интерполируем
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    // Конвертируем обратно в HEX
    return ((r << 16) | (g << 8) | b)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedNick);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
    }
  };

  const resetForm = () => {
    setNickname("");
    setStartColor("#54DAF4");
    setEndColor("#545EB6");
    setGeneratedNick("");
    setCopied(false);
  };

  const renderPreview = () => {
    if (!generatedNick) return null;

    const chars = nickname.split("");
    const steps = chars.length - 1;

    return (
      <span className={styles.preview}>
        {chars.map((char, i) => {
          const ratio = steps === 0 ? 0 : i / steps;
          const color = interpolateColor(startColor, endColor, ratio);
          return (
            <span key={i} style={{ color: `#${color}` }}>
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className={styles.generator}>
      <h2 className={styles.title}>Генератор HEX-ников</h2>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Введите ваш ник:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className={styles.input}
          placeholder="Ваш никнейм"
        />
      </div>

      <div className={styles.colorRow}>
        <div className={styles.colorGroup}>
          <label className={styles.label}>Начальный цвет:</label>
          <div className={styles.colorInputWrapper}>
            <input
              type="color"
              value={startColor}
              onChange={(e) => setStartColor(e.target.value)}
              className={styles.colorPicker}
            />
            <input
              type="text"
              value={startColor}
              onChange={(e) => setStartColor(e.target.value)}
              className={styles.colorInput}
              placeholder="#54DAF4"
            />
          </div>
        </div>

        <div className={styles.colorGroup}>
          <label className={styles.label}>Конечный цвет:</label>
          <div className={styles.colorInputWrapper}>
            <input
              type="color"
              value={endColor}
              onChange={(e) => setEndColor(e.target.value)}
              className={styles.colorPicker}
            />
            <input
              type="text"
              value={endColor}
              onChange={(e) => setEndColor(e.target.value)}
              className={styles.colorInput}
              placeholder="#545EB6"
            />
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button
          onClick={generateColoredNick}
          className={styles.generateButton}
          disabled={!nickname.trim()}
        >
          Сгенерировать ник
        </button>

        {(nickname || generatedNick) && (
          <button onClick={resetForm} className={styles.resetButton}>
            Очистить
          </button>
        )}
      </div>

      {generatedNick && (
        <>
          <div className={styles.resultSection}>
            <label className={styles.label}>
              Результат (скопируйте и вставьте в игру):
            </label>
            <div className={styles.resultWrapper}>
              <div className={styles.result}>{generatedNick}</div>
              <button onClick={copyToClipboard} className={styles.copyButton}>
                {copied ? "Скопировано!" : "Копировать"}
              </button>
            </div>
          </div>

          <div className={styles.previewSection}>
            <label className={styles.label}>Предпросмотр:</label>
            <div className={styles.previewWrapper}>{renderPreview()}</div>
          </div>
        </>
      )}
    </div>
  );
}
