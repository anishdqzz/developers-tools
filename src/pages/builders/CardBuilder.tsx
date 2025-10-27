
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { Copy, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CardBuilder = () => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(true);

  const [cardState, setCardState] = useState({
    title: "Card Title",
    description: "This is a card description.",
    imageUrl: "https://via.placeholder.com/300x200",
    buttonText: "Learn More",
    bgColor: "#ffffff",
    textColor: "#000000",
    buttonColor: "#4CAF50",
    buttonTextColor: "#ffffff",
    textAlign: "left" as "left" | "center" | "right",
    fontFamily: "Arial, sans-serif",
  });

  const handleStateChange = (key: string, value: string) => {
    setCardState((prevState) => ({ ...prevState, [key]: value }));
  };

  const generatedHTML = useMemo(() => {
    return `
<div class="card">
  <img src="${cardState.imageUrl}" alt="${cardState.title}" class="card-image">
  <div class="card-content">
    <h3 class="card-title">${cardState.title}</h3>
    <p class="card-description">${cardState.description}</p>
    <button class="card-button">${cardState.buttonText}</button>
  </div>
</div>
    `.trim();
  }, [cardState]);

  const generatedCSS = useMemo(() => {
    return `
.card {
  font-family: ${cardState.fontFamily};
  background: ${cardState.bgColor};
  color: ${cardState.textColor};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 380px;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.card-content {
  padding: 2rem;
  text-align: ${cardState.textAlign};
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.card-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${cardState.textColor}99;
}

.card-button {
  background: ${cardState.buttonColor};
  color: ${cardState.buttonTextColor};
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.card-button:hover {
  filter: brightness(0.9);
}
    `.trim();
  }, [cardState]);

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Interactive Card Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Design and export custom cards with live preview
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="lg:col-span-1 p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Customize Your Card</h2>
            <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
              <Customizer
                label="Title"
                id="title"
                value={cardState.title}
                onChange={(e) => handleStateChange("title", e.target.value)}
              />
              <Customizer
                label="Description"
                id="description"
                value={cardState.description}
                onChange={(e) =>
                  handleStateChange("description", e.target.value)
                }
                type="textarea"
              />
              <Customizer
                label="Image URL"
                id="imageUrl"
                value={cardState.imageUrl}
                onChange={(e) =>
                  handleStateChange("imageUrl", e.target.value)
                }
              />
              <Customizer
                label="Button Text"
                id="buttonText"
                value={cardState.buttonText}
                onChange={(e) =>
                  handleStateChange("buttonText", e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Background"
                  id="bgColor"
                  value={cardState.bgColor}
                  onChange={(e) =>
                    handleStateChange("bgColor", e.target.value)
                  }
                />
                <ColorPicker
                  label="Text"
                  id="textColor"
                  value={cardState.textColor}
                  onChange={(e) =>
                    handleStateChange("textColor", e.target.value)
                  }
                />
                <ColorPicker
                  label="Button"
                  id="buttonColor"
                  value={cardState.buttonColor}
                  onChange={(e) =>
                    handleStateChange("buttonColor", e.target.value)
                  }
                />
                <ColorPicker
                  label="Button Text"
                  id="buttonTextColor"
                  value={cardState.buttonTextColor}
                  onChange={(e) =>
                    handleStateChange("buttonTextColor", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Text Alignment</Label>
                <Select
                  value={cardState.textAlign}
                  onValueChange={(value) => handleStateChange("textAlign", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Font Family</Label>
                <Select
                  value={cardState.fontFamily}
                  onValueChange={(value) =>
                    handleStateChange("fontFamily", value)
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="'Helvetica Neue', sans-serif">
                      Helvetica Neue
                    </SelectItem>
                    <SelectItem value="'Times New Roman', serif">
                      Times New Roman
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Preview & Code</h2>
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
              >
                <Eye className="mr-2 h-4 w-4" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
            </div>

            {showPreview && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Live Preview</h3>
                <div className="flex justify-center items-center p-4 bg-muted rounded-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<style>${generatedCSS}</style>${generatedHTML}`,
                    }}
                  />
                </div>
              </Card>
            )}

            <Card className="p-6">
              <Tabs defaultValue="html">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                </TabsList>
                <CodeTab
                  value="html"
                  code={generatedHTML}
                  onCopy={() => handleCopy(generatedHTML)}
                  onDownload={() =>
                    handleDownload(generatedHTML, "card.html")
                  }
                />
                <CodeTab
                  value="css"
                  code={generatedCSS}
                  onCopy={() => handleCopy(generatedCSS)}
                  onDownload={() => handleDownload(generatedCSS, "card.css")}
                />
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Customizer = ({
  label,
  id,
  type = "text",
  ...props
}: {
  label: string;
  id: string;
  type?: string;
  [key: string]: any;
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    {type === "textarea" ? (
      <textarea
        id={id}
        className="w-full p-2 border rounded mt-2"
        {...props}
      />
    ) : (
      <Input id={id} type={type} className="mt-2" {...props} />
    )}
  </div>
);

const ColorPicker = ({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
  [key: string]: any;
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type="color"
      className="w-full h-10 mt-2 p-1"
      {...props}
    />
  </div>
);

const CodeTab = ({
  value,
  code,
  onCopy,
  onDownload,
}: {
  value: string;
  code: string;
  onCopy: () => void;
  onDownload: () => void;
}) => (
  <TabsContent value={value} className="space-y-4 mt-4">
    <div className="flex gap-2">
      <Button onClick={onCopy} variant="outline" className="flex-1">
        <Copy className="mr-2 h-4 w-4" />
        Copy {value.toUpperCase()}
      </Button>
      <Button onClick={onDownload} variant="outline" className="flex-1">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
  </TabsContent>
);

export default CardBuilder;
