import { z } from "zod";

// Code snippet schema for the live code editor
export const codeSnippetSchema = z.object({
  id: z.string().optional(),
  html: z.string().default(""),
  css: z.string().default(""),
  javascript: z.string().default(""),
  title: z.string().default("Untitled"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type CodeSnippet = z.infer<typeof codeSnippetSchema>;

// Default starter template
export const DEFAULT_CODE: CodeSnippet = {
  html: `<div class="container">
  <h1>Hello World!</h1>
  <p>Welcome to the live code editor</p>
  <button id="clickBtn">Click Me</button>
</div>`,
  css: `body {
  margin: 0;
  padding: 20px;
  font-family: 'Inter', system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
}

p {
  color: #666;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}`,
  javascript: `console.log('Live preview working!');

const btn = document.getElementById('clickBtn');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  btn.textContent = \`Clicked \${count} time\${count !== 1 ? 's' : ''}\`;
});`,
  title: "Untitled",
};
