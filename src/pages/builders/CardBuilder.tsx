import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Copy, Download, Eye, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/ui/sidebar";

const CardBuilder = () => {
  const { toast } = useToast();
  const [cardTitle, setCardTitle] = useState("Card Title");
  const [cardDescription, setCardDescription] = useState(
    "This is a card description"
  );
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/300x200"
  );
  const [cardImage, setCardImage] = useState(
    "https://via.placeholder.com/300x200"
  );
  const [buttonText, setButtonText] = useState("Learn More");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [showPreview, setShowPreview] = useState(true);

  const handleAddImage = () => {
    setCardImage(imageUrl);
  };

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
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  text-align: ${textAlign};
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #333;
}

.card-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.card-button:hover {
  background: #45a049;
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
    <div className="flex h-screen bg-background">
      <Sidebar>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Card Title</Label>
              <Input
                id="title"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button onClick={handleAddImage} size="sm">
                  Add
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="button">Button Text</Label>
              <Input
                id="button"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <Select
                onValueChange={(value: "left" | "center" | "right") =>
                  setTextAlign(value)
                }
                defaultValue={textAlign}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bgColor">Background Color</Label>
              <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10"
              />
            </div>
          </CardContent>
        </Card>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <Navigation />
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showPreview && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="flex justify-center items-center h-full"
                    dangerouslySetInnerHTML={{
                      __html: `<style>${generateCSS()}</style>${generateHTML()}`,
                    }}
                  />
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <CardTitle>Code</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="html">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                  </TabsList>
                  <TabsContent value="html" className="mt-4">
                    <div className="flex gap-2 mb-4">
                      <Button
                        onClick={() => handleCopy(generateHTML())}
                        variant="outline"
                        className="flex-1"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
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
                  <TabsContent value="css" className="mt-4">
                    <div className="flex gap-2 mb-4">
                      <Button
                        onClick={() => handleCopy(generateCSS())}
                        variant="outline"
                        className="flex-1"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
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
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CardBuilder;