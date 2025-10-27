import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { CodeEditor } from "@/components/CodeEditor";
import { Preview } from "@/components/Preview";
import { DEFAULT_CODE, type CodeSnippet } from "@shared/schema";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "code-editor-content";
const PREVIEW_DEBOUNCE_MS = 500;

export default function CodeEditorPage() {
  const [code, setCode] = useState<CodeSnippet>(DEFAULT_CODE);
  const [debouncedCode, setDebouncedCode] = useState<CodeSnippet>(DEFAULT_CODE);
  const [isSaved, setIsSaved] = useState(true);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCode(parsed);
        setDebouncedCode(parsed);
      } catch (error) {
        console.error("Failed to load saved code:", error);
      }
    }
  }, []);

  // Debounced preview updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(code);
    }, PREVIEW_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [code]);

  // Auto-save to localStorage when code changes
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
      setIsSaved(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [code]);

  const handleCodeChange = useCallback((field: keyof CodeSnippet, value: string) => {
    setCode((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
    setIsSaved(true);
    toast({
      title: "Saved",
      description: "Your code has been saved successfully.",
    });
  }, [code, toast]);

  const handleReset = useCallback(() => {
    setCode(DEFAULT_CODE);
    setDebouncedCode(DEFAULT_CODE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CODE));
    setIsSaved(true);
    setShowResetDialog(false);
    toast({
      title: "Reset",
      description: "Code has been reset to default template.",
    });
  }, [toast]);

  const handleRun = useCallback(() => {
    // Force immediate preview update
    setDebouncedCode(code);
    toast({
      title: "Running",
      description: "Code is executing in the preview panel.",
    });
  }, [code, toast]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        title="Live Code Editor"
        onSave={handleSave}
        onReset={() => setShowResetDialog(true)}
        onRun={handleRun}
        isSaved={isSaved}
      />

      <div className="flex-1 overflow-hidden">
        {/* Desktop: 2x2 Grid Layout */}
        <div className="hidden lg:block h-full">
          <ResizablePanelGroup direction="vertical">
            {/* Top Row: HTML and CSS */}
            <ResizablePanel defaultSize={50} minSize={20}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={25}>
                  <div className="h-full border-r">
                    <CodeEditor
                      language="html"
                      label="HTML"
                      value={code.html}
                      onChange={(value) => handleCodeChange("html", value)}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={25}>
                  <div className="h-full">
                    <CodeEditor
                      language="css"
                      label="CSS"
                      value={code.css}
                      onChange={(value) => handleCodeChange("css", value)}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Bottom Row: JavaScript and Preview */}
            <ResizablePanel defaultSize={50} minSize={20}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={25}>
                  <div className="h-full border-r border-t">
                    <CodeEditor
                      language="javascript"
                      label="JavaScript"
                      value={code.javascript}
                      onChange={(value) => handleCodeChange("javascript", value)}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={25}>
                  <div className="h-full border-t">
                    <Preview
                      html={debouncedCode.html}
                      css={debouncedCode.css}
                      javascript={debouncedCode.javascript}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Tablet: Stacked Layout */}
        <div className="hidden md:block lg:hidden h-full">
          <ResizablePanelGroup direction="vertical">
            {/* Top: Three Editors Side by Side */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={33} minSize={20}>
                  <div className="h-full border-r">
                    <CodeEditor
                      language="html"
                      label="HTML"
                      value={code.html}
                      onChange={(value) => handleCodeChange("html", value)}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={33} minSize={20}>
                  <div className="h-full border-r">
                    <CodeEditor
                      language="css"
                      label="CSS"
                      value={code.css}
                      onChange={(value) => handleCodeChange("css", value)}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={34} minSize={20}>
                  <div className="h-full">
                    <CodeEditor
                      language="javascript"
                      label="JavaScript"
                      value={code.javascript}
                      onChange={(value) => handleCodeChange("javascript", value)}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Bottom: Preview */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full border-t">
                <Preview
                  html={debouncedCode.html}
                  css={debouncedCode.css}
                  javascript={debouncedCode.javascript}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile: Tabbed Interface */}
        <div className="block md:hidden h-full">
          <Tabs defaultValue="html" className="flex flex-col h-full">
            <TabsList className="h-12 w-full rounded-none border-b grid grid-cols-4 gap-1" data-testid="tabs-mobile">
              <TabsTrigger value="html" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none" data-testid="tab-html">
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none" data-testid="tab-css">
                CSS
              </TabsTrigger>
              <TabsTrigger value="js" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none" data-testid="tab-js">
                JS
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none" data-testid="tab-preview">
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="flex-1 overflow-hidden m-0">
              <div className="h-full">
                <CodeEditor
                  language="html"
                  label="HTML"
                  value={code.html}
                  onChange={(value) => handleCodeChange("html", value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="css" className="flex-1 overflow-hidden m-0">
              <div className="h-full">
                <CodeEditor
                  language="css"
                  label="CSS"
                  value={code.css}
                  onChange={(value) => handleCodeChange("css", value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="js" className="flex-1 overflow-hidden m-0">
              <div className="h-full">
                <CodeEditor
                  language="javascript"
                  label="JavaScript"
                  value={code.javascript}
                  onChange={(value) => handleCodeChange("javascript", value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="flex-1 overflow-hidden m-0">
              <div className="h-full">
                <Preview
                  html={debouncedCode.html}
                  css={debouncedCode.css}
                  javascript={debouncedCode.javascript}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent data-testid="dialog-reset-confirmation">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Code?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all your code to the default template. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} data-testid="button-confirm-reset">
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
