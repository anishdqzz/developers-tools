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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CardBuilder = () => {
  const { toast } = useToast();
  const [cardTitle, setCardTitle] = useState("Card Title");
  const [cardDescription, setCardDescription] = useState(
    "This is a card description"
  );
  const [cardImage, setCardImage] = useState(
    "https://via.placeholder.com/300x200"
  );
  const [buttonText, setButtonText] = useState("Learn More");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#666666");
  const [buttonColor, setButtonColor] = useState("#4CAF50");
  const [buttonTextColor, setButtonTextColor] = useState("#ffffff");
  const [hoverBgColor, setHoverBgColor] = useState("#f9f9f9");
  const [hoverTextColor, setHoverTextColor] = useState("#333333");
  const [buttonHoverColor, setButtonHoverColor] = useState("#45a049");
  const [buttonHoverTextColor, setButtonHoverTextColor] = useState("#ffffff");
  const [justifyContent, setJustifyContent] = useState("space-between");
  const [alignItems, setAlignItems] = useState("center");
  const [flexDirection, setFlexDirection] = useState("column");
  const [showPreview, setShowPreview] = useState(true);

  const generateHTML = () => {
    return `<div class="card">
  <img src="${cardImage}" alt="${cardTitle}" class="card-image">
  <div class="card-content">
    <h3 class="card-title">${cardTitle}</h3>
    <p class="card-description">${cardDescription}</p>
    <button class="card-button">${buttonText}</button>
  </div>
</div>`;
  };

  const generateCSS = () => {
    return `.card {
  background: ${bgColor};
  color: ${textColor};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s, color 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  background: ${hoverBgColor};
  color: ${hoverTextColor};
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: inherit;
}

.card-description {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-button {
  background: ${buttonColor};
  color: ${buttonTextColor};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, color 0.3s;
}

.card-button:hover {
  background: ${buttonHoverColor};
  color: ${buttonHoverTextColor};
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
            Card Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Design custom card components
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Card Title</Label>
                <Input
                  id="title"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={cardImage}
                  onChange={(e) => setCardImage(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="button">Button Text</Label>
                <Input
                  id="button"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
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
                  <Label htmlFor="textColor">Text</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buttonColor">Button</Label>
                  <Input
                    id="buttonColor"
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="buttonTextColor">Button Text</Label>
                  <Input
                    id="buttonTextColor"
                    type="color"
                    value={buttonTextColor}
                    onChange={(e) => setButtonTextColor(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
              </div>
              <div>
                <Label>Hover Effect (Card)</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="hoverBgColor">Background</Label>
                    <Input
                      id="hoverBgColor"
                      type="color"
                      value={hoverBgColor}
                      onChange={(e) => setHoverBgColor(e.target.value)}
                      className="mt-2 h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoverTextColor">Text</Label>
                    <Input
                      id="hoverTextColor"
                      type="color"
                      value={hoverTextColor}
                      onChange={(e) => setHoverTextColor(e.target.value)}
                      className="mt-2 h-10"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label>Hover Effect (Button)</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="buttonHoverColor">Background</Label>
                    <Input
                      id="buttonHoverColor"
                      type="color"
                      value={buttonHoverColor}
                      onChange={(e) => setButtonHoverColor(e.target.value)}
                      className="mt-2 h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonHoverTextColor">Text</Label>
                    <Input
                      id="buttonHoverTextColor"
                      type="color"
                      value={buttonHoverTextColor}
                      onChange={(e) =>
                        setButtonHoverTextColor(e.target.value)
                      }
                      className="mt-2 h-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="flexDirection">Flex Direction</Label>
                <Select
                  value={flexDirection}
                  onValueChange={setFlexDirection}
                >
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select flex direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">Row</SelectItem>
                    <SelectItem value="column">Column</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="justifyContent">Justify Content</Label>
                <Select
                  value={justifyContent}
                  onValueChange={setJustifyContent}
                >
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select justify content" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Flex Start</SelectItem>
                    <SelectItem value="flex-end">Flex End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="space-between">
                      Space Between
                    </SelectItem>
                    <SelectItem value="space-around">Space Around</SelectItem>
                    <SelectItem value="space-evenly">Space Evenly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alignItems">Align Items</Label>
                <Select value={alignItems} onValueChange={setAlignItems}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select align items" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Flex Start</SelectItem>
                    <SelectItem value="flex-end">Flex End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="baseline">Baseline</SelectItem>
                    <SelectItem value="stretch">Stretch</SelectItem>
                  </SelectContent>
                </Select>
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
                  className="flex justify-center"
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
                        handleDownload(generateHTML(), "card.html")
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
                      onClick={() =>
                        handleDownload(generateCSS(), "card.css")
                      }
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

export default CardBuilder;