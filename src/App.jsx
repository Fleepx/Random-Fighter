import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import TaglineReveal from "./components/TaglineReveal";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#contenido" className="rf-skip-link">
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido">
        <Hero />
        <Problem />
        <TaglineReveal />
        <Benefits />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
