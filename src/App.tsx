import { useState, useCallback } from "react";
import { useLenis } from "./hooks/useLenis";
import Loader from "./components/sections/Loader";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Industries from "./components/sections/Industries";
import Process from "./components/sections/Process";
import Packages from "./components/sections/Packages";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Industries />
        <Process />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
