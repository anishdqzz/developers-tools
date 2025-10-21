import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, Wand2, Shrink, Sparkles } from "lucide-react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserPostcss from "prettier/parser-postcss";
import { minify } from "terser";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CodeFormatter = () => {
  const [htmlInput, setHtmlInput] = useState("<div><h1>Hello, world!</h1><p>Format me</p></div>");
  const [cssInput, setCssInput] = useState(".btn{background: hsl(var(--primary)); color:hsl(var(--primary-foreground));padding:8px 16px}");
  const [jsInput, setJsInput] = useState("function greet(name){console.log('Hello, '+ name)}\ngreet('Dev')");

  const [htmlOutput, setHtmlOutput] = useState("");
  const [cssOutput, setCssOutput] = useState("");
  const [jsOutput, setJsOutput] = useState("");

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Output copied to clipboard");
  };

  const formatHtml = async () => {
    try {
      const formatted = await prettier.format(htmlInput, { parser: "html", plugins: [parserHtml] });
      setHtmlOutput(formatted);
    } catch (e: any) {
      toast.error(`HTML error: ${e.message || e}`);
    }
  };

  const formatCss = async () => {
    try {
      const formatted = await prettier.format(cssInput, { parser: "css", plugins: [parserPostcss] });
      setCssOutput(formatted);
    } catch (e: any) {
      toast.error(`CSS error: ${e.message || e}`);
    }
  };

  const formatJs = async () => {
    try {
      const formatted = await prettier.format(jsInput, { parser: "babel", plugins: [parserBabel] });
      setJsOutput(formatted);
    } catch (e: any) {
      toast.error(`JS error: ${e.message || e}`);
    }
  };
  const optimizeJs = async () => {
    try {
      const result = await minify(jsInput, { compress: true, mangle: true });
      if (result.code) setJsOutput(result.code);
      else toast.error("No output from optimizer");
    } catch (e: any) {
      toast.error(`Optimize error: ${e.message || e}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Code Formatter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Format and optimize your HTML, CSS, and JavaScript code.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Looking for builders? <Link className="underline" to="/html-builders">Go to HTML Builders</Link> or <Link className="underline" to="/js-learning">JS Learning</Link>
          </p>
        </div>

        <Tabs defaultValue="html" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>

          <TabsContent value="html">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Input</h3>
                <Textarea value={htmlInput} onChange={(e) => setHtmlInput(e.target.value)} className="font-mono text-sm min-h-[300px] bg-muted" />
                <div className="mt-4 flex gap-2">
                  <Button onClick={formatHtml} className="hover:scale-105 transition-transform">
                    <Wand2 className="h-4 w-4 mr-2" /> Format
                  </Button>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Output</h3>
                <Textarea value={htmlOutput} readOnly className="font-mono text-sm min-h-[300px] bg-secondary" />
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => copy(htmlOutput)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="css">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Input</h3>
                <Textarea value={cssInput} onChange={(e) => setCssInput(e.target.value)} className="font-mono text-sm min-h-[300px] bg-muted" />
                <div className="mt-4 flex gap-2">
                  <Button onClick={formatCss} className="hover:scale-105 transition-transform">
                    <Wand2 className="h-4 w-4 mr-2" /> Format
                  </Button>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Output</h3>
                <Textarea value={cssOutput} readOnly className="font-mono text-sm min-h-[300px] bg-secondary" />
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => copy(cssOutput)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="js">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Input</h3>
                <Textarea value={jsInput} onChange={(e) => setJsInput(e.target.value)} className="font-mono text-sm min-h-[300px] bg-muted" />
                <div className="mt-4 flex gap-2 flex-wrap">
                  <Button onClick={formatJs} className="hover:scale-105 transition-transform">
                    <Wand2 className="h-4 w-4 mr-2" /> Format
                  </Button>
                  <Button onClick={optimizeJs} variant="secondary" className="hover:scale-105 transition-transform">
                    <Shrink className="h-4 w-4 mr-2" /> Optimize
                  </Button>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Output</h3>
                <Textarea value={jsOutput} readOnly className="font-mono text-sm min-h-[300px] bg-secondary" />
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => copy(jsOutput)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Optimization uses safe minification; review output before production.
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CodeFormatter;
