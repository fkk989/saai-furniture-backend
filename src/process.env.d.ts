import { string } from "zod";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      SALT_ROUNDS: string;
      DEFAULT_CLIENT_EMAIL: string;
      DEFAULT_CLIENT_PASSWORD: string;
      DEFAULT_CLIENT_NAME: string;
      DEFAULT_ADMIN_NAME: string;
      DEFAULT_ADMIN_EMAIL: string;
      DEFAULT_ADMIN_PASSWORD: string;
      AWS_S3_SECRET_KEY: string;
      AWS_S3_ACCESS_KEY: string;
    }
  }
}
