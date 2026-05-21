import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer';
import { ChevronUp } from 'lucide-react';
import { useTranslation } from './contexts/LanguageContext';

const ExteriorSequence = lazy(() => import('./components/ExteriorSequence.tsx'));
const WheelbaseStretch = lazy(() => import('./components/WheelbaseStretch'));
const InteriorSequence = lazy(() => import('./components/InteriorSequence.tsx'));
const InteriorFeatures = lazy(() => import('./components/InteriorFeatures.tsx'));
const Personalize = lazy(() => import('./components/Personalize.tsx'));
const Performance = lazy(() => import('./components/Performance.tsx'));
const Powertrains = lazy(() => import('./components/Powertrains.tsx'));
const SafetyFeatures = lazy(() => import('./components/SafetyFeatures.tsx'));
const Dimensions = lazy(() => import('./components/Dimensions.tsx'));
const Trims = lazy(() => import('./components/Trims.tsx'));

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t, i18n } = useTranslation();

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

  const FallbackLoader = () => (
    <div className="h-screen w-full bg-[#05141f] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );

  const isArabic = i18n.language === 'ar';

  return (
    <main className="bg-[#05141f] min-h-screen overflow-x-hidden relative">
      <Navbar />
      <Suspense fallback={<FallbackLoader />}>
        <div id="exterior"><ExteriorSequence /></div>
        <div id="wheelbase"><WheelbaseStretch /></div>
        <div id="interior-sequence"><InteriorSequence /></div>
        <div id="interior"><InteriorFeatures /></div>
        <div id="personalize"><Personalize /></div>
        <div id="performance"><Performance /></div>
        <div id="powertrains"><Powertrains /></div>
        <div id="safety"><SafetyFeatures /></div>
        <div id="dimensions"><Dimensions /></div>
        <div id="trims"><Trims /></div>
      </Suspense>
      <Footer />

      {/* Floating UI Elements */}
      <div dir={isArabic ? "rtl" : "ltr"} className={`fixed bottom-3 text-[10px] md:text-xs text-white/50 z-50 pointer-events-none ${isArabic ? 'right-4 md:right-6' : 'left-4 md:left-6'}`}>
        {t('app.specDisclaimer')}
      </div>

      <button dir={isArabic ? "rtl" : "ltr"} className={`fixed bottom-[0%] -translate-y-1/2 bg-white text-[#05141f] hover:bg-[#05141f] hover:text-white hover:border-white px-3 py-3 rounded font-bold uppercase tracking-wider text-sm z-50 transition-all duration-300 shadow-2xl ${isArabic ? 'left-[1%]' : 'right-[1%]'}`}>
        {t('app.bookNow')}
      </button>

      <button
        dir="ltr"
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