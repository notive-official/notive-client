declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_API_BASE: string;
    NEXT_PUBLIC_CLOUD_FRONT_BASE: string;
  }
}
