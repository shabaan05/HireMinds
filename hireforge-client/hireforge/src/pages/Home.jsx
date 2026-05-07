import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import CTASection from "../components/home/CTASection";
import Navbar from "../layout/Navbar";
const Home = () => {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">

      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <HowItWorks />

      <CTASection />


    </div>
  );
};

export default Home;