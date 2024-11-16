import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PopularRecipes from "@/components/PopularRecipes";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-emerald-800">
      <Navigation />
      <Hero />
      <PopularRecipes />
      <Footer />
    </div>
  );
};

export default Home;
