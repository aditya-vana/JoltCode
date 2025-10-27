import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { codeSnippetSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Code snippet routes (for future sharing feature)
  
  // Get all snippets
  app.get("/api/snippets", async (_req, res) => {
    try {
      const snippets = await storage.listSnippets();
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch snippets" });
    }
  });

  // Get a specific snippet
  app.get("/api/snippets/:id", async (req, res) => {
    try {
      const snippet = await storage.getSnippet(req.params.id);
      if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
      }
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch snippet" });
    }
  });

  // Create a new snippet
  app.post("/api/snippets", async (req, res) => {
    try {
      const validated = codeSnippetSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(req.body);
      const snippet = await storage.createSnippet(validated);
      res.status(201).json(snippet);
    } catch (error) {
      res.status(400).json({ error: "Invalid snippet data" });
    }
  });

  // Update a snippet
  app.put("/api/snippets/:id", async (req, res) => {
    try {
      const validated = codeSnippetSchema.partial().parse(req.body);
      const snippet = await storage.updateSnippet(req.params.id, validated);
      if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
      }
      res.json(snippet);
    } catch (error) {
      res.status(400).json({ error: "Invalid snippet data" });
    }
  });

  // Delete a snippet
  app.delete("/api/snippets/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSnippet(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Snippet not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete snippet" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
