import React from "react";

interface GameServerStructuredDataProps {
  serverName: string;
  serverUrl: string;
  description: string;
  gameType: string;
}

const GameServerStructuredData: React.FC<GameServerStructuredDataProps> = ({
  serverName,
  serverUrl,
  description,
  gameType,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: serverName,
    url: serverUrl,
    description: description,
    applicationCategory: "Game",
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RUB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    keywords:
      "minecraft, майнкрафт, сервер, приватный сервер майнкрафт, дмайн, d.mine, игра, выживание",
    genre: gameType,
    inLanguage: "ru-RU",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "D.Mine Team",
      url: serverUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default GameServerStructuredData;
