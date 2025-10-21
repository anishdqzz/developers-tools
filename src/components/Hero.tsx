import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-glow">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">Your Complete Web Dev Arsenal</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Faster with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Developer Tools
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Essential toolkit for modern web developers. From HTML to React, we've got everything you need to code smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tools">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 shadow-glow"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#about">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary/50 hover:bg-primary/10"
              >
                View Documentation
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground mt-2">Dev Tools</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">10+</div>
              <div className="text-muted-foreground mt-2">Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground mt-2">Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
