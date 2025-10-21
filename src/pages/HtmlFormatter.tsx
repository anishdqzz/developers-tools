import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const HtmlFormatter = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [copied, setCopied] = useState(false);

  const formatHtml = () => {
    if (!input.trim()) {
      toast.error("Please enter some HTML code first");
      return;
    }

    try {
      // Simple HTML formatter
      let html = input;
      let indent = 0;
      const formatted = html
        .replace(/></g, '>\n<')
        .split('\n')
        .map(line => {
          line = line.trim();
          if (line.match(/^<\/\w/)) {
            indent = Math.max(0, indent - 1);
          }
          const indentedLine = '  '.repeat(indent) + line;
          if (line.match(/^<\w[^>]*[^\/]>$/)) {
            indent++;
          }
          return indentedLine;
        })
        .join('\n');
      
      setFormatted(formatted);
      toast.success("HTML formatted successfully!");
    } catch (error) {
      toast.error("Failed to format HTML");
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            HTML Formatter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Format and beautify your HTML code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Input HTML</h2>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="min-h-[400px] font-mono text-sm bg-muted"
            />
            <Button onClick={formatHtml} className="w-full mt-4">
              Format HTML
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Formatted HTML</h2>
              </div>
              {formatted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>
            <div className="bg-muted p-4 rounded-lg min-h-[400px]">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {formatted || "Formatted HTML will appear here..."}
              </pre>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HtmlFormatter;
