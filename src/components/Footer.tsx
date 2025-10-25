import { Code2, Github, Twitter, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                OopsDev
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Your complete toolkit for modern web development. Build faster, code smarter.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/code-formatter" className="text-muted-foreground hover:text-primary transition-colors">
                  Code Formatter
                </Link>
              </li>
              <li>
                <Link to="/html-builders" className="text-muted-foreground hover:text-primary transition-colors">
                  HTML Builders
                </Link>
              </li>
              <li>
                <Link to="/css-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  CSS Tools
                </Link>
              </li>
              <li>
                <Link to="/js-learning" className="text-muted-foreground hover:text-primary transition-colors">
                  JS Learning
                </Link>
              </li>
              <li>
                <Link to="/icons" className="text-muted-foreground hover:text-primary transition-colors">
                  Icons
                </Link>
              </li>
              <li>
                <Link to="/ui-components" className="text-muted-foreground hover:text-primary transition-colors">
                  UI Components
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OopsDev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
