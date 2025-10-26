import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CheatSheetItem {
  title: string;
  code: string;
}

interface CheatSheetProps {
  title: string;
  items: CheatSheetItem[];
  cardBgColor?: string;
  cardTextColor?: string;
}

export const CheatSheet = ({ title, items, cardBgColor, cardTextColor }: CheatSheetProps) => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 pb-16">
        {title && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <Card key={index} className="p-6" style={{ backgroundColor: cardBgColor, color: cardTextColor }}>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <div className="relative">
                <pre className="p-4 rounded-lg text-sm overflow-x-auto" style={{ backgroundColor: cardBgColor ? (getContrastingColor(cardBgColor)) : "", color: cardBgColor ? (getContrastingColor(getContrastingColor(cardBgColor))) : "" }}>
                  <code>{item.code}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode(item.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

function getContrastingColor(hexcolor: string | undefined) {
  if (!hexcolor) return "";
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}
