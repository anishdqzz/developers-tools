import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Menu, Table, FileText, ImageIcon, Layout } from "lucide-react";
import { Link } from "react-router-dom";

const HtmlBuilders = () => {
  const builders = [
    {
      title: "Navbar Builder",
      description: "Build beautiful navigation bars with live preview",
      icon: Menu,
      path: "/builders/navbar",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Table Builder",
      description: "Create responsive tables easily",
      icon: Table,
      path: "/builders/table",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Form Builder",
      description: "Generate forms with validation",
      icon: FileText,
      path: "/builders/form",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Card Builder",
      description: "Design custom card components",
      icon: ImageIcon,
      path: "/builders/card",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Layout Builder",
      description: "Create responsive layouts",
      icon: Layout,
      path: "/builders/layout",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            HTML Builders
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a builder to create HTML components with live preview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {builders.map((builder) => {
            const Icon = builder.icon;
            return (
              <Link key={builder.title} to={builder.path}>
                <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${builder.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{builder.title}</h3>
                  <p className="text-muted-foreground">{builder.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HtmlBuilders;
