import * as dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

export const baseUrl = process.env.API_BASE_URL as string;

export const endpoints = {
  create: `${baseUrl}/qa-test/createwd`,
  get: `${baseUrl}/qa-test/status`
} as const;
