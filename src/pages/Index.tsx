import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { FeaturedTools } from "@/components/FeaturedTools";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <FeaturedTools />
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
