import { type CodeSnippet } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for code snippets
export interface IStorage {
  // Code snippet operations
  getSnippet(id: string): Promise<CodeSnippet | undefined>;
  createSnippet(snippet: Omit<CodeSnippet, "id">): Promise<CodeSnippet>;
  updateSnippet(id: string, snippet: Partial<CodeSnippet>): Promise<CodeSnippet | undefined>;
  deleteSnippet(id: string): Promise<boolean>;
  listSnippets(): Promise<CodeSnippet[]>;
}

export class MemStorage implements IStorage {
  private snippets: Map<string, CodeSnippet>;

  constructor() {
    this.snippets = new Map();
  }

  async getSnippet(id: string): Promise<CodeSnippet | undefined> {
    return this.snippets.get(id);
  }

  async createSnippet(snippet: Omit<CodeSnippet, "id">): Promise<CodeSnippet> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const newSnippet: CodeSnippet = {
      ...snippet,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.snippets.set(id, newSnippet);
    return newSnippet;
  }

  async updateSnippet(id: string, updates: Partial<CodeSnippet>): Promise<CodeSnippet | undefined> {
    const snippet = this.snippets.get(id);
    if (!snippet) return undefined;

    const updatedSnippet: CodeSnippet = {
      ...snippet,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    this.snippets.set(id, updatedSnippet);
    return updatedSnippet;
  }

  async deleteSnippet(id: string): Promise<boolean> {
    return this.snippets.delete(id);
  }

  async listSnippets(): Promise<CodeSnippet[]> {
    return Array.from(this.snippets.values());
  }
}

export const storage = new MemStorage();
