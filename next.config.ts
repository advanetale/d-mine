import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/repo-name",
  assetPrefix: "/repo-name/",
};

module.exports = nextConfig;

