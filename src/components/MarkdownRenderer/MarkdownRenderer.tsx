"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Image from "next/image";
import ColoredNickGenerator from "../ColoredNickGenerator/ColoredNickGenerator";
import styles from "./MarkdownRenderer.module.scss";

interface MarkdownRendererProps {
  content: string;
  enableHeadingLinks?: boolean;
}

export default function MarkdownRenderer({
  content,
  enableHeadingLinks = true,
}: MarkdownRendererProps) {
  // Разделяем контент на части, где есть генератор
  const parts = content.split("[ColoredNickGenerator]");

  return (
    <div className={styles.markdown}>
      {parts.map((part, index) => (
        <div key={index}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkUnwrapImages]}
            rehypePlugins={
              enableHeadingLinks
                ? [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
                : [rehypeSlug]
            }
            components={{
              img: ({ src, alt }) => (
                <div className={styles.imageContainer}>
                  <Image
                    src={typeof src === "string" ? src : ""}
                    alt={alt || ""}
                    width={800}
                    height={400}
                    className={styles.image}
                    style={{ width: "auto", height: "auto" }}
                    priority={true} // Приоритетная загрузка для изображений в wiki
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='18'%3EЗагрузка изображения...%3C/text%3E%3C/svg%3E"
                  />
                </div>
              ),
              h1: ({ children, ...props }) => (
                <h1 className={styles.h1} {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className={styles.h2} {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className={styles.h3} {...props}>
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p className={styles.paragraph} {...props}>
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className={styles.list} {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className={styles.orderedList} {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className={styles.listItem} {...props}>
                  {children}
                </li>
              ),
              a: ({ children, href, ...props }) => (
                <a href={href} className={styles.link} {...props}>
                  {children}
                </a>
              ),
              code: ({ children, className, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code className={styles.inlineCode} {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className={styles.codeBlock}>
                    <code {...props}>{children}</code>
                  </pre>
                );
              },
              strong: ({ children, ...props }) => (
                <strong className={styles.bold} {...props}>
                  {children}
                </strong>
              ),
              em: ({ children, ...props }) => (
                <em className={styles.italic} {...props}>
                  {children}
                </em>
              ),
            }}
          >
            {part}
          </ReactMarkdown>
          {index < parts.length - 1 && <ColoredNickGenerator />}
        </div>
      ))}
    </div>
  );
}
