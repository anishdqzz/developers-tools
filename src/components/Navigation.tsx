import { Code2, Menu, X, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              OopsDev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/icons" className="text-foreground hover:text-primary transition-colors">
              Icons
            </Link>
            <Link to="/ui-components" className="text-foreground hover:text-primary transition-colors">
              Components
            </Link>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="mr-2">
                Login
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/icons"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Icons
            </Link>
            <Link
              to="/ui-components"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Components
            </Link>
            <a
              href="#about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <Link
              to="/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full mb-2">
                Login
              </Button>
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
