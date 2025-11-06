/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URL: string
  // any other VITE_ prefixed env vars
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
