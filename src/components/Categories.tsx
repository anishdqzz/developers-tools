import { Code, Palette, Braces, Layers, Database, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const categories = [
  {
    icon: Code,
    title: "HTML Tools",
    description: "HTML generators, validators, and formatters",
    count: "12 tools",
  },
  {
    icon: Palette,
    title: "CSS Utilities",
    description: "Gradient generators, color pickers, animations",
    count: "15 tools",
  },
  {
    icon: Braces,
    title: "JavaScript",
    description: "Code minifiers, beautifiers, and validators",
    count: "18 tools",
  },
  {
    icon: Layers,
    title: "React Helpers",
    description: "Component generators and React-specific utilities",
    count: "10 tools",
  },
  {
    icon: Database,
    title: "Data Tools",
    description: "JSON formatters, converters, and validators",
    count: "8 tools",
  },
  {
    icon: Wand2,
    title: "Generators",
    description: "Lorem ipsum, icons, images, and more",
    count: "14 tools",
  },
];

export const Categories = () => {
  return (
    <section id="categories" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate through our organized collection of development tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-primary font-mono">{category.count}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
