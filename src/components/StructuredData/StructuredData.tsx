interface StructuredDataProps {
  type: "website" | "organization" | "article";
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "website":
        return {
          ...baseSchema,
          "@type": "WebSite",
          name: data.name || "D.Mine",
          url: data.url || "https://d-mine.net",
          description: data.description || "Официальный сайт сервера D.Mine",
          potentialAction: {
            "@type": "SearchAction",
            target: `${
              data.url || "https://d-mine.net"
            }/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };

      case "organization":
        return {
          ...baseSchema,
          "@type": "Organization",
          name: data.name || "D.Mine",
          url: data.url || "https://d-mine.net",
          description: data.description || "Приватный Minecraft сервер",
          sameAs: data.socialLinks || [],
        };

      case "article":
        return {
          ...baseSchema,
          "@type": "Article",
          headline: data.title,
          description: data.description,
          url: data.url,
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          author: {
            "@type": "Organization",
            name: "D.Mine Team",
          },
          publisher: {
            "@type": "Organization",
            name: "D.Mine",
          },
        };

      default:
        return baseSchema;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema()),
      }}
    />
  );
}
