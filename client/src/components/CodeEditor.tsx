import Editor from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  language: "html" | "css" | "javascript";
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function CodeEditor({ language, value, onChange, label }: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-10 px-4 flex items-center border-b bg-card">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground" data-testid={`text-label-${language}`}>
          {label}
        </span>
      </div>
      <div className="flex-1 overflow-hidden" data-testid={`editor-${language}`}>
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            folding: true,
            foldingHighlight: true,
            bracketPairColorization: {
              enabled: true,
            },
          }}
          loading={
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          }
        />
      </div>
    </div>
  );
}
