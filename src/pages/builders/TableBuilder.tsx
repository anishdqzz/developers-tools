import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Copy, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TableBuilder = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [headers, setHeaders] = useState(["Header 1", "Header 2", "Header 3"]);
  const [bordered, setBordered] = useState(true);
  const [striped, setStriped] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState("#f4f4f4");
  const [textColor, setTextColor] = useState("#333333");
  const [hoverBgColor, setHoverBgColor] = useState("#f5f5f5");
  const [borderColor, setBorderColor] = useState("#dddddd");
  const [stripeColor, setStripeColor] = useState("#f9f9f9");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");

  const generateHTML = () => {
    let html = `<table class="custom-table${bordered ? ' bordered' : ''}${striped ? ' striped' : ''}">\n  <thead>\n    <tr>\n${headers.map(h => `      <th>${h}</th>`).join('\n')}\n    </tr>\n  </thead>\n  <tbody>\n`;
    for (let i = 0; i < rows; i++) {
      html += '    <tr>\n';
      for (let j = 0; j < cols; j++) {
        html += `      <td>Cell ${i + 1}-${j + 1}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';
    return html;
  };

  const generateCSS = () => {
    return `.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-family: ${fontFamily};
  color: ${textColor};
}

.custom-table th, .custom-table td {
  padding: 12px;
  text-align: left;
}

.custom-table th {
  background-color: ${headerBgColor};
  font-weight: bold;
}

${bordered ? `.custom-table.bordered th,
.custom-table.bordered td {
  border: 1px solid ${borderColor};
}` : ''}

${striped ? `.custom-table.striped tbody tr:nth-child(odd) {
  background-color: ${stripeColor};
}` : ''}

.custom-table tbody tr:hover {
  background-color: ${hoverBgColor};
}`;
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Table Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Create responsive HTML tables
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rows">Rows</Label>
                  <Input
                    id="rows"
                    type="number"
                    min="1"
                    max="20"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cols">Columns</Label>
                  <Input
                    id="cols"
                    type="number"
                    min="1"
                    max="10"
                    value={cols}
                    onChange={(e) => {
                      const newCols = parseInt(e.target.value) || 1;
                      setCols(newCols);
                      setHeaders(Array(newCols).fill(0).map((_, i) => `Header ${i + 1}`));
                    }}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Column Headers</Label>
                <div className="space-y-2 mt-2">
                  {headers.map((header, index) => (
                    <Input
                      key={index}
                      value={header}
                      onChange={(e) => {
                        const updated = [...headers];
                        updated[index] = e.target.value;
                        setHeaders(updated);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  <Label htmlFor="headerBgColor">Header Color</Label>
                  <Input
                    id="headerBgColor"
                    type="color"
                    value={headerBgColor}
                    onChange={(e) => setHeaderBgColor(e.target.value)}
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="hoverBgColor">Hover Color</Label>
                  <Input
                    id="hoverBgColor"
                    type="color"
                    value={hoverBgColor}
                    onChange={(e) => setHoverBgColor(e.target.value)}
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="borderColor">Border Color</Label>
                  <Input
                    id="borderColor"
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-full mt-2"
                    disabled={!bordered}
                  />
                </div>
                {striped && (
                  <div>
                    <Label htmlFor="stripeColor">Stripe Color</Label>
                    <Input
                      id="stripeColor"
                      type="color"
                      value={stripeColor}
                      onChange={(e) => setStripeColor(e.target.value)}
                      className="w-full mt-2"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="fontFamily" className="w-full mt-2">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="'Helvetica Neue', sans-serif">Helvetica Neue</SelectItem>
                    <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                    <SelectItem value="Georgia, serif">Georgia</SelectItem>
                    <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                    <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bordered}
                    onChange={(e) => setBordered(e.target.checked)}
                  />
                  Bordered
                </Label>
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={striped}
                    onChange={(e) => setStriped(e.target.checked)}
                  />
                  Striped Rows
                </Label>
              </div>

              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="w-full"
              >
                <Eye className="mr-2 h-4 w-4" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            {showPreview && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div 
                  className="border rounded-lg overflow-auto"
                  dangerouslySetInnerHTML={{ __html: `<style>${generateCSS()}</style>${generateHTML()}` }}
                />
              </Card>
            )}

            <Card className="p-6">
              <Tabs defaultValue="html">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="html" className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopy(generateHTML())}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy HTML
                    </Button>
                    <Button
                      onClick={() => handleDownload(generateHTML(), "table.html")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateHTML()}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="css" className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopy(generateCSS())}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy CSS
                    </Button>
                    <Button
                      onClick={() => handleDownload(generateCSS(), "table.css")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateCSS()}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TableBuilder;
