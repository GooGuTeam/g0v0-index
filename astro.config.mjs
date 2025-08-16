// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import UnoCSS from "@unocss/astro";
import mdx from "@astrojs/mdx";
import remarkAdmonitionBlocks from "./src/remark/remark-admonition-blocks.js";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		mdx({
			remarkPlugins: [remarkAdmonitionBlocks],
		}),
		UnoCSS({ injectReset: true }),
	],
	i18n: {
		locales: ["en", "zh"], // 支持的语言列表
		defaultLocale: "en", // 默认语言
		routing: {
			prefixDefaultLocale: false, // 默认语言是否带前缀
			// redirectToDefaultLocale: true 可在某些场景开启自动跳转
		},
	},
});
