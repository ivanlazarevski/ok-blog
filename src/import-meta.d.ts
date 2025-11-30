interface ImportMetaEnv {
  siteKey?: string; // your variable
  sanityProjectId?: string;
  formSpreeUrl?: string;
  // add other variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
