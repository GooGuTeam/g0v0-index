import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.1,
      warn: true,
      collections: {
        // default collections include tabler
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      bg: '#f5f7fb',
      text: '#0b1220',
      muted: '#5c6b7b',
      primary: '#ed8ea6',
      accent: '#6fd0cf',
      border: '#e6eaf2',
    },
    boxShadow: {
      soft: '0 8px 24px rgba(0,0,0,0.04)',
    },
    fontFamily: {
      sans: 'Inter, Noto Sans SC, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    },
  },
  shortcuts: {
    'prose-custom': 'prose prose-lg max-w-none prose-headings:text-text prose-p:text-muted prose-strong:text-text prose-code:bg-[#f1f5f9] prose-code:text-[#0f172a] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm',
  },
});


