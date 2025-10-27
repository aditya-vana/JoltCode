import { Save, RotateCcw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSave: () => void;
  onReset: () => void;
  onRun: () => void;
  isSaved: boolean;
  title: string;
}

export function Header({ onSave, onReset, onRun, isSaved, title }: HeaderProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold" data-testid="text-title">
          {title}
        </h1>
        {isSaved && (
          <span className="text-xs text-muted-foreground" data-testid="text-saved-indicator">
            Saved
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          size="default"
          variant="outline"
          onClick={onRun}
          data-testid="button-run"
          className="min-w-20"
        >
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>
        <Button
          size="default"
          variant="outline"
          onClick={onSave}
          data-testid="button-save"
          className="min-w-20"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          size="default"
          variant="outline"
          onClick={onReset}
          data-testid="button-reset"
          className="min-w-20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </header>
  );
}
