import { Code, Palette, Braces, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Code,
    title: "HTML Learning",
    description: "Learn HTML tag with example",
    path: "/html-learning",
  },
  {
    icon: Palette,
    title: "CSS Learning",
    description: "Css Styling propertys with examples",
    path: "/css-learning",
  },
  {
    icon: Braces,
    title: "JavaScript",
    description: "Learn JavaScript Basic To Advance",
    path: "/js-learning",
  },
  {
    icon: Layers,
    title: "React Helpers",
    description: "Learn react With examples",
    path: "/react",
  },
];

export const Categories = () => {
  return (
    <section id="categories" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn Codes with Examples !!! 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link to={category.path} key={index}>
                <Card
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer group h-full"
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
                    <div className="text-sm text-primary font-mono"></div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
