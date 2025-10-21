import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { FileCode, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const CssFormatter = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [copied, setCopied] = useState(false);

  const formatCss = () => {
    if (!input.trim()) {
      toast.error("Please enter some CSS code first");
      return;
    }

    try {
      // Simple CSS formatter
      let css = input
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n\n')
        .replace(/\s*;\s*/g, ';\n  ')
        .replace(/\s*,\s*/g, ',\n')
        .replace(/\s*:\s*/g, ': ')
        .trim();
      
      setFormatted(css);
      toast.success("CSS formatted successfully!");
    } catch (error) {
      toast.error("Failed to format CSS");
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
            CSS Formatter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Format and beautify your CSS code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileCode className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Input CSS</h2>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS code here..."
              className="min-h-[400px] font-mono text-sm bg-muted"
            />
            <Button onClick={formatCss} className="w-full mt-4">
              Format CSS
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Formatted CSS</h2>
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
                {formatted || "Formatted CSS will appear here..."}
              </pre>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CssFormatter;
