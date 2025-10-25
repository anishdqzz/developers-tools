import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CssTools = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCSS = async () => {
    if (!htmlCode.trim()) {
      toast.error("Please enter some HTML code first");
      return;
    }

    setIsGenerating(true);
    setGeneratedCSS("");

    try {
      const { data, error } = await supabase.functions.invoke('generate-css', {
        body: { htmlCode }
      });

      if (error) {
        console.error('Function error:', error);
        toast.error(error.message || "Failed to generate CSS");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedCSS(data.css);
      toast.success("CSS generated successfully!");

    } catch (error) {
      console.error('Generation error:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCSS = () => {
    if (generatedCSS) {
      navigator.clipboard.writeText(generatedCSS);
      toast.success("CSS copied to clipboard!");
    }
  };

  const handleDownloadCSS = () => {
    if (generatedCSS) {
      const blob = new Blob([generatedCSS], { type: 'text/css' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'styles.css';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("CSS downloaded!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                CSS{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Generator
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Paste your HTML code and let AI generate beautiful, modern CSS styles automatically
              </p>
            </div>

            {/* Main Tool */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* HTML Input */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <span className="text-sm font-mono text-primary-foreground">HTML</span>
                    </div>
                    Your HTML Code
                  </CardTitle>
                  <CardDescription>
                    Paste your HTML structure here
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    placeholder="<div class='container'>&#10;  <h1>Hello World</h1>&#10;  <p>Your content here...</p>&#10;</div>"
                    className="font-mono text-sm min-h-[400px] bg-secondary border-border"
                  />

                  <Button
                    onClick={handleGenerateCSS}
                    disabled={isGenerating || !htmlCode.trim()}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating CSS...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate CSS
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* CSS Output */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <span className="text-sm font-mono text-primary-foreground">CSS</span>
                    </div>
                    Generated CSS
                  </CardTitle>
                  <CardDescription>
                    AI-generated styles for your HTML
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={generatedCSS}
                    readOnly
                    placeholder="Your generated CSS will appear here..."
                    className="font-mono text-sm min-h-[400px] bg-secondary border-border"
                  />

                  <div className="flex gap-2">
                    <Button
                      onClick={handleCopyCSS}
                      disabled={!generatedCSS}
                      variant="outline"
                      className="flex-1 border-primary/50 hover:bg-primary/10"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy CSS
                    </Button>
                    <Button
                      onClick={handleDownloadCSS}
                      disabled={!generatedCSS}
                      variant="outline"
                      className="flex-1 border-primary/50 hover:bg-primary/10"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Modern Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Uses Flexbox, Grid, and modern CSS features for clean, efficient styles
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Responsive Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically includes media queries for mobile, tablet, and desktop views
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Follows BEM methodology, accessibility standards, and modern design patterns
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CssTools;
