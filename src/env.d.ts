/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_LAZER_URL?: string
  readonly PUBLIC_STABLE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


