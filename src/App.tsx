import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CssTools from "./pages/CssTools";
import CodeFormatter from "./pages/CodeFormatter";
import HtmlBuilders from "./pages/HtmlBuilders";
import NavbarBuilder from "./pages/builders/NavbarBuilder";
import TableBuilder from "./pages/builders/TableBuilder";
import FormBuilder from "./pages/builders/FormBuilder";
import CardBuilder from "./pages/builders/CardBuilder";
import LayoutBuilder from "./pages/builders/LayoutBuilder";
import JsLearning from "./pages/JsLearning";
import Icons from "./pages/Icons";
import UiComponents from "./pages/UiComponents";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import HtmlLearning from "./pages/HtmlLearning";
import CssLearning from "./pages/CssLearning"; // Import CssLearning

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/css-tools" element={<CssTools />} />
          <Route path="/code-formatter" element={<CodeFormatter />} />
          <Route path="/html-builders" element={<HtmlBuilders />} />
          <Route path="/builders/navbar" element={<NavbarBuilder />} />
          <Route path="/builders/table" element={<TableBuilder />} />
          <Route path="/builders/form" element={<FormBuilder />} />
          <Route path="/builders/card" element={<CardBuilder />} />
          <Route path="/builders/layout" element={<LayoutBuilder />} />
          <Route path="/js-learning" element={<JsLearning />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/html-learning" element={<HtmlLearning />} />
          <Route path="/css-learning" element={<CssLearning />} /> {/* Add CssLearning route */}
          <Route path="/ui-components" element={<UiComponents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
