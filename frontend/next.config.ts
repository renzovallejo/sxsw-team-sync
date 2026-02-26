import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // Descomentar para compilar a GHPages
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
