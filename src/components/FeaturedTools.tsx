import { Palette, Code, Sparkles, FileCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    icon: Palette,
    title: "CSS Generator",
    description: "AI-powered CSS generation from your HTML code",
    tags: ["CSS", "AI"],
    path: "/css-tools",
  },
  {
    icon: FileCode,
    title: "Code Formatter",
    description: "Format your code with powerful builders",
    tags: ["HTML", "CSS", "JS"],
    path: "/code-formatter",
  },
  {
    icon: Code,
    title: "Icon Library",
    description: "Browse and copy 100+ beautiful icons",
    tags: ["Icons",],
    path: "/icons",
  },
  {
    icon: Sparkles,
    title: "UI Components",
    description: "Ready-to-use UI components with code",
    tags: ["UI", "Components"],
    path: "/ui-components",
  },
];

export const FeaturedTools = () => {
  const navigate = useNavigate();

  const handleToolClick = (path: string) => {
    if (path === "#") {
      return;
    }
    navigate(path);
  };

  return (
    <section id="tools" className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Most popular tools used by developers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card
                key={index}
                className="bg-card border-border hover:shadow-card transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all">
                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full bg-secondary text-sm font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleToolClick(tool.path)}
                    disabled={tool.path === "#"}
                  >
                    {tool.path === "#" ? "Coming Soon" : "Try It"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
