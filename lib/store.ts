import { ProfileReport } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __memoryReports: Map<string, ProfileReport> | undefined;
  // eslint-disable-next-line no-var
  var __memoryChat:
    | Map<string, Array<{ role: "user" | "assistant"; content: string; image?: string; createdAt: string }>>
    | undefined;
}

// In-memory store attached to globalThis for persistence across Next.js dev reloads
export const memoryReports: Map<string, ProfileReport> =
  globalThis.__memoryReports || (globalThis.__memoryReports = new Map());

export const memoryChat: Map<
  string,
  Array<{ role: "user" | "assistant"; content: string; image?: string; createdAt: string }>
> = globalThis.__memoryChat || (globalThis.__memoryChat = new Map());
