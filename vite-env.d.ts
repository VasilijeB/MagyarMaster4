// Reference to vite/client removed to avoid type definition error
export interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}