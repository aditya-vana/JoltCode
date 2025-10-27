import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface PreviewProps {
  html: string;
  css: string;
  javascript: string;
}

export function Preview({ html, css, javascript }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const document = iframe.contentDocument;
    if (!document) return;

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            // Wrap user code in DOMContentLoaded to ensure DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() {
                try {
                  ${javascript}
                } catch (error) {
                  console.error('JavaScript Error:', error);
                  const errorDiv = document.createElement('div');
                  errorDiv.style.cssText = 'padding: 20px; color: #e53e3e; font-family: monospace; background: #fff5f5; border: 1px solid #fc8181; border-radius: 4px; margin: 20px;';
                  errorDiv.innerHTML = '<strong>Error:</strong> ' + error.message;
                  document.body.insertBefore(errorDiv, document.body.firstChild);
                }
              });
            } else {
              try {
                ${javascript}
              } catch (error) {
                console.error('JavaScript Error:', error);
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'padding: 20px; color: #e53e3e; font-family: monospace; background: #fff5f5; border: 1px solid #fc8181; border-radius: 4px; margin: 20px;';
                errorDiv.innerHTML = '<strong>Error:</strong> ' + error.message;
                document.body.insertBefore(errorDiv, document.body.firstChild);
              }
            }
          </script>
        </body>
      </html>
    `;

    document.open();
    document.write(content);
    document.close();
  }, [html, css, javascript]);

  return (
    <div className="flex flex-col h-full">
      <div className="h-10 px-4 flex items-center border-b bg-card">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground" data-testid="text-label-preview">
          Preview
        </span>
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        <iframe
          ref={iframeRef}
          title="preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-modals allow-same-origin"
          data-testid="iframe-preview"
        />
      </div>
    </div>
  );
}
