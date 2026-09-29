import { site } from './src/config/site.ts';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: site.url,
  devToolbar: { enabled: false },
  output: 'static',
  trailingSlash: 'never',
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
