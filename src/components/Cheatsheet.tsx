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
}

export const CheatSheet = ({ title, items }: CheatSheetProps) => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <div className="relative">
                <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
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
