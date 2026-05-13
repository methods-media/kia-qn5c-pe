import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import ExteriorSequence from './components/ExteriorSequence.tsx';
import WheelbaseStretch from './components/WheelbaseStretch';
import InteriorSequence from './components/InteriorSequence.tsx';
import InteriorFeatures from './components/InteriorFeatures.tsx';
import Personalize from './components/Personalize.tsx';
import Performance from './components/Performance.tsx';
import SafetyFeatures from './components/SafetyFeatures.tsx';
import Dimensions from './components/Dimensions.tsx';
import Trims from './components/Trims.tsx';
import Footer from './components/Footer';
import { ChevronUp } from 'lucide-react';


function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#05141f] min-h-screen overflow-x-hidden relative">
      <Navbar />
      <div id="exterior"><ExteriorSequence /></div>
      <div id="wheelbase"><WheelbaseStretch /></div>
      <div id="interior-sequence"><InteriorSequence /></div>
      <div id="interior"><InteriorFeatures /></div>
      <div id="personalize"><Personalize /></div>
      <div id="performance"><Performance /></div>
      <div id="safety"><SafetyFeatures /></div>
      <div id="dimensions"><Dimensions /></div>
      <div id="trims"><Trims /></div>
      <Footer />

      {/* Floating UI Elements */}
      <div className="fixed bottom-3 left-4 md:bottom-4 md:left-6 text-[10px] md:text-xs text-white/50 z-50 pointer-events-none">
        Specifications may vary by region.
      </div>

      <button className="fixed right-[1%] bottom-[0%] -translate-y-1/2 bg-white text-[#05141f] hover:bg-[#05141f] hover:text-white hover:border-white px-3 py-3 rounded font-bold uppercase tracking-wider text-sm z-50 transition-all duration-300 shadow-2xl">
        Book Now
      </button>

      <button
        onClick={scrollToTop}
        className={`fixed right-4 bottom-4 md:right-8 md:bottom-[8%] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all duration-500 z-50 border border-white/20 hover:border-white/50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </main>
  );
}

export default App;
export const ASSET_URL = "https://media.mthds.dev";