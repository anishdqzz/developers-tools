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

const NavbarBuilder = () => {
  const { toast } = useToast();
  const [navItems, setNavItems] = useState(["Home", "About", "Services", "Contact"]);
  const [brandName, setBrandName] = useState("MyBrand");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [hoverTextColor, setHoverTextColor] = useState("#777777");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [navPadding, setNavPadding] = useState(1);
  const [showPreview, setShowPreview] = useState(true);

  const generateHTML = () => {
    return `<nav class="custom-nav">
  <div class="brand">${brandName}</div>
  <ul class="nav-links">
${navItems.map(item => `    <li><a href="#${item.toLowerCase()}">${item}</a></li>`).join('\n')}
  </ul>
</nav>`;
  };

  const generateCSS = () => {
    return `.custom-nav {
  background-color: ${bgColor};
  padding: ${navPadding}rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: ${fontFamily};
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: ${textColor};
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: ${textColor};
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.nav-links a:hover {
  color: ${hoverTextColor};
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

  const addNavItem = () => {
    setNavItems([...navItems, `Item ${navItems.length + 1}`]);
  };

  const removeNavItem = (index: number) => {
    setNavItems(navItems.filter((_, i) => i !== index));
  };

  const updateNavItem = (index: number, value: string) => {
    const updated = [...navItems];
    updated[index] = value;
    setNavItems(updated);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Navbar Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Customize and build your navigation bar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Configuration Panel */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="brand">Brand Name</Label>
                <Input
                  id="brand"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bgColor">Background</Label>
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="hoverTextColor">Hover Text Color</Label>
                  <Input
                    id="hoverTextColor"
                    type="color"
                    value={hoverTextColor}
                    onChange={(e) => setHoverTextColor(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
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

              <div>
                <Label htmlFor="padding">Padding (rem)</Label>
                <Input
                  id="padding"
                  type="number"
                  min="0"
                  max="5"
                  step="0.25"
                  value={navPadding}
                  onChange={(e) => setNavPadding(parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Navigation Items</Label>
                <div className="space-y-2 mt-2">
                  {navItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateNavItem(index, e.target.value)}
                      />
                      <Button
                        variant="destructive"
                        onClick={() => removeNavItem(index)}
                        disabled={navItems.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addNavItem} className="w-full">
                    Add Item
                  </Button>
                </div>
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

          {/* Preview & Code Panel */}
          <div className="space-y-6">
            {showPreview && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div 
                  className="border rounded-lg overflow-hidden"
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
                      onClick={() => handleDownload(generateHTML(), "navbar.html")}
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
                      onClick={() => handleDownload(generateCSS(), "navbar.css")}
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

export default NavbarBuilder;
