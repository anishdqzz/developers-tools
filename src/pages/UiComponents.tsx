import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const UiComponents = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const buttonExamples = [
    {
      title: "Default Button",
      preview: <Button>Click Me</Button>,
      code: `<Button>Click Me</Button>`,
    },
    {
      title: "Outline Button",
      preview: <Button variant="outline">Outline</Button>,
      code: `<Button variant="outline">Outline</Button>`,
    },
    {
      title: "Destructive Button",
      preview: <Button variant="destructive">Delete</Button>,
      code: `<Button variant="destructive">Delete</Button>`,
    },
    {
      title: "Secondary Button",
      preview: <Button variant="secondary">Secondary</Button>,
      code: `<Button variant="secondary">Secondary</Button>`,
    },
    {
      title: "Ghost Button",
      preview: <Button variant="ghost">Ghost</Button>,
      code: `<Button variant="ghost">Ghost</Button>`,
    },
    {
      title: "Link Button",
      preview: <Button variant="link">Link</Button>,
      code: `<Button variant="link">Link</Button>`,
    },
    {
      title: "Large Button",
      preview: <Button size="lg">Large</Button>,
      code: `<Button size="lg">Large</Button>`,
    },
    {
      title: "Small Button",
      preview: <Button size="sm">Small</Button>,
      code: `<Button size="sm">Small</Button>`,
    },
  ];

  const cardExamples = [
    {
      title: "Simple Card",
      preview: (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-2">Card Title</h3>
          <p className="text-muted-foreground">This is a simple card component.</p>
        </Card>
      ),
      code: `<Card className="p-6">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-muted-foreground">This is a simple card component.</p>
</Card>`,
    },
    {
      title: "Card with Image",
      preview: (
        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-primary" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Image Card</h3>
            <p className="text-muted-foreground">Card with image header</p>
          </div>
        </Card>
      ),
      code: `<Card className="overflow-hidden">
  <div className="h-40 bg-gradient-primary" />
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">Image Card</h3>
    <p className="text-muted-foreground">Card with image header</p>
  </div>
</Card>`,
    },
  ];

  const inputExamples = [
    {
      title: "Text Input",
      preview: <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Enter text..." />,
      code: `<input 
  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
  placeholder="Enter text..." 
/>`,
    },
    {
      title: "Email Input",
      preview: <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Enter email..." />,
      code: `<input 
  type="email"
  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
  placeholder="Enter email..." 
/>`,
    },
  ];

  const badgeExamples = [
    {
      title: "Default Badge",
      preview: <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground">Badge</span>,
      code: `<span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground">
  Badge
</span>`,
    },
    {
      title: "Secondary Badge",
      preview: <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">Secondary</span>,
      code: `<span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">
  Secondary
</span>`,
    },
    {
      title: "Outline Badge",
      preview: <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-input">Outline</span>,
      code: `<span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-input">
  Outline
</span>`,
    },
    {
      title: "Success Badge",
      preview: <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-green-500 text-white">Success</span>,
      code: `<span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-green-500 text-white">
  Success
</span>`,
    },
    {
      title: "Warning Badge",
      preview: <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-yellow-500 text-white">Warning</span>,
      code: `<span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-yellow-500 text-white">
  Warning
</span>`,
    },
    {
      title: "Error Badge",
      preview: <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-500 text-white">Error</span>,
      code: `<span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-500 text-white">
  Error
</span>`,
    },
  ];

  const alertExamples = [
    {
      title: "Info Alert",
      preview: (
        <div className="border border-blue-500 bg-blue-50 text-blue-900 p-4 rounded-lg">
          <strong className="font-semibold">Info:</strong> This is an informational message.
        </div>
      ),
      code: `<div className="border border-blue-500 bg-blue-50 text-blue-900 p-4 rounded-lg">
  <strong className="font-semibold">Info:</strong> This is an informational message.
</div>`,
    },
    {
      title: "Success Alert",
      preview: (
        <div className="border border-green-500 bg-green-50 text-green-900 p-4 rounded-lg">
          <strong className="font-semibold">Success:</strong> Operation completed successfully!
        </div>
      ),
      code: `<div className="border border-green-500 bg-green-50 text-green-900 p-4 rounded-lg">
  <strong className="font-semibold">Success:</strong> Operation completed successfully!
</div>`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            UI Components
          </h1>
          <p className="text-xl text-muted-foreground">
            Beautiful, ready-to-use UI components with code examples
          </p>
        </div>

        <Tabs defaultValue="buttons" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons">
            <div className="grid md:grid-cols-2 gap-6">
              {buttonExamples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                  <div className="mb-4 p-6 bg-muted rounded-lg flex items-center justify-center">
                    {example.preview}
                  </div>
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(example.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid md:grid-cols-2 gap-6">
              {cardExamples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                  <div className="mb-4">
                    {example.preview}
                  </div>
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(example.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inputs">
            <div className="grid md:grid-cols-2 gap-6">
              {inputExamples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                  <div className="mb-4 p-6 bg-muted rounded-lg">
                    {example.preview}
                  </div>
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(example.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <div className="grid md:grid-cols-2 gap-6">
              {badgeExamples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                  <div className="mb-4 p-6 bg-muted rounded-lg flex items-center justify-center">
                    {example.preview}
                  </div>
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(example.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <div className="grid md:grid-cols-2 gap-6">
              {alertExamples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                  <div className="mb-4">
                    {example.preview}
                  </div>
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(example.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UiComponents;
