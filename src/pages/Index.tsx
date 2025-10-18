import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedTools } from "@/components/FeaturedTools";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";

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
