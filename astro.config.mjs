// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from '@unocss/astro';
import mdx from '@astrojs/mdx';
import remarkAdmonitionBlocks from './src/remark/remark-admonition-blocks.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkAdmonitionBlocks],
    }),
    UnoCSS({ injectReset: true }),
  ],
});
