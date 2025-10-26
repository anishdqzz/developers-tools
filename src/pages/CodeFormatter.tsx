import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Code, FileCode, Braces } from "lucide-react";
import { Link } from "react-router-dom";

const CodeFormatter = () => {
  const formatters = [
    {
      title: "HTML",
      description: "Format your code with our powerful builders",
      icon: Code,
      path: "/html-builders",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "CSS",
      description: "Generate and beautify your CSS code with AI",
      icon: FileCode,
      path: "/css-tools",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "JavaScript",
      description: "Learn JavaScript with interactive examples",
      icon: Braces,
      path: "/js-learning",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Code Formatter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your code type to format and build
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {formatters.map((formatter) => {
            const Icon = formatter.icon;
            return (
              <Link key={formatter.title} to={formatter.path}>
                <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${formatter.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{formatter.title}</h3>
                  <p className="text-muted-foreground">{formatter.description}</p>
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

export default CodeFormatter;
