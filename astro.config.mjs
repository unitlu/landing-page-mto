import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import svgr from "@svgr/rollup";

import mdx from "@astrojs/mdx";

import cloudflare from "@astrojs/cloudflare";

import MillionLint from "@million/lint";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://mtocommunity.com",
  integrations: [
    tailwind(),
    mdx(),
    MillionLint.astro(),
    preact({ compat: true }),
  ],
  adapter: cloudflare({
    routes: {
      extend: {
        include: [
          {
            pattern: "/**",
          },
        ],
      },
    },
  }),
  vite: {
    plugins: [svgr()],
    resolve: {
      alias: {
        "@assets": new URL("./src/assets", import.meta.url).pathname,
      },
    },
  },
  output: "static",
  compressHTML: true,
});
