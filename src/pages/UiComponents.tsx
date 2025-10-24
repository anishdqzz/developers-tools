import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Copy,
  SquareMousePointer,
  RectangleHorizontal,
  Type,
  Badge as BadgeIcon,
  AlertTriangle,
  Mail,
  Loader2,
  Bird,
  Terminal,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";
import { toast } from "sonner";

const UiComponents = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const componentCategories = [
    {
      title: "Buttons",
      description: "Various styles for user actions.",
      icon: SquareMousePointer,
      id: "buttons",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Cards",
      description: "Flexible content containers.",
      icon: RectangleHorizontal,
      id: "cards",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Inputs",
      description: "Text fields for user input.",
      icon: Type,
      id: "inputs",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Badges",
      description: "Small status indicators.",
      icon: BadgeIcon,
      id: "badges",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Alerts",
      description: "Contextual feedback messages.",
      icon: AlertTriangle,
      id: "alerts",
      color: "from-red-500 to-orange-500",
    },
  ];

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
      title: "Icon Button",
      preview: (
        <Button variant="outline" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
      ),
      code: `<Button variant="outline" size="icon">
  <Mail className="h-4 w-4" />
</Button>`,
    },
    {
      title: "Loading Button",
      preview: (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ),
      code: `<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`,
    },
  ];

  const cardExamples = [
    {
      title: "Simple Card",
      preview: (
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>This is a simple card component.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here.</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      ),
      code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>This is a simple card component.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
    },
    {
      title: "Card with Image",
      preview: (
        <Card className="overflow-hidden">
          <img src="https://source.unsplash.com/random/400x200" alt="Card image" className="w-full h-auto" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Image Card</h3>
            <p className="text-muted-foreground">Card with image header</p>
          </div>
        </Card>
      ),
      code: `<Card className="overflow-hidden">
  <img src="https://source.unsplash.com/random/400x200" alt="Card image" className="w-full h-auto" />
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
      preview: <Input placeholder="Enter text..." />,
      code: `<Input placeholder="Enter text..." />`,
    },
    {
      title: "Input with Icon",
      preview: (
        <div className="relative">
          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Email" className="pl-10" />
        </div>
      ),
      code: `<div className="relative">
  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Email" className="pl-10" />
</div>`,
    },
    {
        title: "Input with Button",
        preview: (
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Subscribe</Button>
            </div>
        ),
        code: `<div className="flex w-full max-w-sm items-center space-x-2">
    <Input type="email" placeholder="Email" />
    <Button type="submit">Subscribe</Button>
</div>`
    },
    {
        title: "Disabled Input",
        preview: <Input disabled placeholder="Disabled input" />,
        code: `<Input disabled placeholder="Disabled input" />`
    }
  ];

  const badgeExamples = [
    {
      title: "Default Badge",
      preview: <Badge>Badge</Badge>,
      code: `<Badge>Badge</Badge>`,
    },
    {
      title: "Secondary Badge",
      preview: <Badge variant="secondary">Secondary</Badge>,
      code: `<Badge variant="secondary">Secondary</Badge>`,
    },
    {
      title: "Outline Badge",
      preview: <Badge variant="outline">Outline</Badge>,
      code: `<Badge variant="outline">Outline</Badge>`,
    },
    {
        title: "Destructive Badge",
        preview: <Badge variant="destructive">Destructive</Badge>,
        code: `<Badge variant="destructive">Destructive</Badge>`
    },
    {
        title: "Badge with Icon",
        preview: <Badge><Bird className="mr-1 h-3 w-3" />Twitter</Badge>,
        code: `<Badge><Bird className="mr-1 h-3 w-3" />Twitter</Badge>`
    }
  ];

  const alertExamples = [
    {
      title: "Info Alert",
      preview: (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can use a terminal in this application.
          </AlertDescription>
        </Alert>
      ),
      code: `<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can use a terminal in this application.
  </AlertDescription>
</Alert>`,
    },
    {
      title: "Success Alert",
      preview: (
        <Alert variant="default" className="bg-green-100 border-green-400 text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
      ),
      code: `<Alert variant="default" className="bg-green-100 border-green-400 text-green-700">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`,
    },
    {
      title: "Warning Alert",
      preview: (
        <Alert variant="default" className="bg-yellow-100 border-yellow-400 text-yellow-700">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Please be cautious when proceeding.
          </AlertDescription>
        </Alert>
      ),
      code: `<Alert variant="default" className="bg-yellow-100 border-yellow-400 text-yellow-700">
  <ShieldAlert className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Please be cautious when proceeding.
  </AlertDescription>
</Alert>`,
    },
    {
      title: "Destructive Alert",
      preview: (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      ),
      code: `<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
    },
  ];

  const allExamples = [
    { id: "buttons", title: "Buttons", examples: buttonExamples },
    { id: "cards", title: "Cards", examples: cardExamples },
    { id: "inputs", title: "Inputs", examples: inputExamples },
    { id: "badges", title: "Badges", examples: badgeExamples },
    { id: "alerts", title: "Alerts", examples: alertExamples },
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

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mb-16">
          {componentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                onClick={() => scrollToSection(category.id)}
                className="cursor-pointer"
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 group h-full text-center">
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </Card>
              </div>
            );
          })}
        </div>

        {allExamples.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="pt-20 -mt-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              {section.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {section.examples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{example.title}</h3>
                  <div
                    className={`mb-4 p-6 bg-muted rounded-lg flex items-center justify-center ${
                      section.id === "cards" ? "" : "min-h-[120px]"
                    }`}
                  >
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
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default UiComponents;
