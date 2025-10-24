import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Copy, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LayoutBuilder = () => {
  const { toast } = useToast();
  const [layoutType, setLayoutType] = useState("two-column");
  const [showPreview, setShowPreview] = useState(true);

  // Color States
  const [sidebarBgColor, setSidebarBgColor] = useState("#f4f4f4");
  const [mainContentBgColor, setMainContentBgColor] = useState("#ffffff");
  const [columnBgColor, setColumnBgColor] = useState("#f4f4f4");
  const [headerBgColor, setHeaderBgColor] = useState("#333333");
  const [headerTextColor, setHeaderTextColor] = useState("#ffffff");
  const [gridItemBgColor, setGridItemBgColor] = useState(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  );
  const [gridItemTextColor, setGridItemTextColor] = useState("#ffffff");
  const [gridItemHoverScale, setGridItemHoverScale] = useState(1.05);

  const generateHTML = () => {
    const layouts = {
      "two-column": `<div class="layout two-column">
  <div class="sidebar">
    <h3>Sidebar</h3>
    <p>Sidebar content goes here</p>
  </div>
  <div class="main-content">
    <h2>Main Content</h2>
    <p>Main content goes here</p>
  </div>
</div>`,
      "three-column": `<div class="layout three-column">
  <div class="column">
    <h3>Column 1</h3>
    <p>Content for column 1</p>
  </div>
  <div class="column">
    <h3>Column 2</h3>
    <p>Content for column 2</p>
  </div>
  <div class="column">
    <h3>Column 3</h3>
    <p>Content for column 3</p>
  </div>
</div>`,
      "header-sidebar-content": `<div class="layout header-sidebar-content">
  <header class="header">
    <h1>Header</h1>
  </header>
  <div class="body">
    <aside class="sidebar">
      <h3>Sidebar</h3>
      <p>Navigation or content</p>
    </aside>
    <main class="content">
      <h2>Main Content</h2>
      <p>Page content goes here</p>
    </main>
  </div>
</div>`,
      grid: `<div class="layout grid">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
  <div class="grid-item">Item 5</div>
  <div class="grid-item">Item 6</div>
</div>`,
    };
    return layouts[layoutType as keyof typeof layouts];
  };

  const generateCSS = () => {
    const styles = {
      "two-column": `.layout.two-column {
  display: flex;
  gap: 2rem;
  min-height: 400px;
}

.sidebar {
  flex: 0 0 250px;
  background: ${sidebarBgColor};
  padding: 1.5rem;
  border-radius: 8px;
}

.main-content {
  flex: 1;
  background: ${mainContentBgColor};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`,
      "three-column": `.layout.three-column {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  min-height: 300px;
}

.column {
  background: ${columnBgColor};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}`,
      "header-sidebar-content": `.layout.header-sidebar-content {
  min-height: 500px;
}

.header {
  background: ${headerBgColor};
  color: ${headerTextColor};
  padding: 1.5rem;
  border-radius: 8px 8px 0 0;
}

.body {
  display: flex;
  gap: 2rem;
  min-height: 400px;
}

.sidebar {
  flex: 0 0 250px;
  background: ${sidebarBgColor};
  padding: 1.5rem;
}

.content {
  flex: 1;
  background: ${mainContentBgColor};
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`,
      grid: `.layout.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.grid-item {
  background: ${gridItemBgColor};
  color: ${gridItemTextColor};
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.grid-item:hover {
  transform: scale(${gridItemHoverScale});
}`,
    };
    return styles[layoutType as keyof typeof styles];
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
            Layout Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Create responsive page layouts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>

            <div className="space-y-6">
              <div>
                <Label>Layout Type</Label>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {[
                    { value: "two-column", label: "Two Column" },
                    { value: "three-column", label: "Three Column" },
                    {
                      value: "header-sidebar-content",
                      label: "Header + Sidebar + Content",
                    },
                    { value: "grid", label: "Grid Layout" },
                  ].map((layout) => (
                    <Button
                      key={layout.value}
                      variant={layoutType === layout.value ? "default" : "outline"}
                      onClick={() => setLayoutType(layout.value)}
                      className="w-full"
                    >
                      {layout.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Pickers */}
              <div className="space-y-4">
                {layoutType === "two-column" && (
                  <>
                    <Label>Sidebar Background</Label>
                    <Input
                      type="color"
                      value={sidebarBgColor}
                      onChange={(e) => setSidebarBgColor(e.target.value)}
                      className="h-10"
                    />
                    <Label>Main Content Background</Label>
                    <Input
                      type="color"
                      value={mainContentBgColor}
                      onChange={(e) => setMainContentBgColor(e.target.value)}
                      className="h-10"
                    />
                  </>
                )}
                {layoutType === "three-column" && (
                  <>
                    <Label>Column Background</Label>
                    <Input
                      type="color"
                      value={columnBgColor}
                      onChange={(e) => setColumnBgColor(e.target.value)}
                      className="h-10"
                    />
                  </>
                )}
                {layoutType === "header-sidebar-content" && (
                  <>
                    <Label>Header Background</Label>
                    <Input
                      type="color"
                      value={headerBgColor}
                      onChange={(e) => setHeaderBgColor(e.target.value)}
                      className="h-10"
                    />
                    <Label>Header Text</Label>
                    <Input
                      type="color"
                      value={headerTextColor}
                      onChange={(e) => setHeaderTextColor(e.target.value)}
                      className="h-10"
                    />
                    <Label>Sidebar Background</Label>
                    <Input
                      type="color"
                      value={sidebarBgColor}
                      onChange={(e) => setSidebarBgColor(e.target.value)}
                      className="h-10"
                    />
                    <Label>Main Content Background</Label>
                    <Input
                      type="color"
                      value={mainContentBgColor}
                      onChange={(e) => setMainContentBgColor(e.target.value)}
                      className="h-10"
                    />
                  </>
                )}
                {layoutType === "grid" && (
                  <>
                    <Label>Grid Item Background</Label>
                    <Input
                      type="text"
                      value={gridItemBgColor}
                      onChange={(e) => setGridItemBgColor(e.target.value)}
                      className="h-10"
                    />
                    <Label>Grid Item Text</Label>
                    <Input
                      type="color"
                      value={gridItemTextColor}
                      onChange={(e) => setGridItemTextColor(e.target.value)}
                      className="h-10"
                    />
                    <Label>Grid Item Hover Scale</Label>
                    <Input
                      type="number"
                      step={0.01}
                      value={gridItemHoverScale}
                      onChange={(e) =>
                        setGridItemHoverScale(parseFloat(e.target.value))
                      }
                    />
                  </>
                )}
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
                  className="border rounded-lg overflow-auto p-4"
                  dangerouslySetInnerHTML={{
                    __html: `<style>${generateCSS()}</style>${generateHTML()}`,
                  }}
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
                      onClick={() =>
                        handleDownload(generateHTML(), "layout.html")
                      }
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
                      onClick={() => handleDownload(generateCSS(), "layout.css")}
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

export default LayoutBuilder;
