/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_URL: string;
  readonly VITE_PUBLIC_NOTE_RECORD_LIMIT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
