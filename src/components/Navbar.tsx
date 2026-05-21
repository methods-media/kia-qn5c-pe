import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // عشان نغير شكل النافبار لما اليوزر يعمل سكرول
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTitle(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    if (newLang === 'ar') {
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
    }
  };

  const isArabic = i18n.language === 'ar';

  return (
    <nav dir="ltr" className={`fixed top-0 w-full h-[50px] z-50 transition-all duration-500 flex justify-center items-center ${scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]' : 'bg-black/10 backdrop-blur-md border-b border-white/5'}`}>
      <div className="w-[95%] md:w-[70%] flex justify-between items-center">

        {/* اللوجو والعنوان */}
        <div className="flex items-center relative">
          <img
            src="/Kia_Logo.svg"
            alt="Kia Logo"
            className="h-8 w-auto cursor-pointer"
          />
          <div className={`absolute left-full flex items-center transition-all duration-500 w-max ${showTitle ? 'opacity-100 translate-x-4' : 'opacity-0 translate-x-0 pointer-events-none'}`}>
            <span className="text-white/40 text-xl font-light -mt-1">|</span>
            <span className={`text-white font-semibold tracking-wide text-xs md:text-sm ml-4 uppercase ${isArabic ? 'text-right' : ''}`}>Sportage L 2026</span>
          </div>
        </div>

        {/* المينيو بتاعة الديسكتوب */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#exterior" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.exterior')}</a>
          <a href="#interior" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.interior')}</a>
          <a href="#personalize" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.personalize')}</a>
          <a href="#performance" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.performance')}</a>
          <a href="#safety" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.safety')}</a>
          <a href="#dimensions" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.dimensions')}</a>
          <a href="#trims" className={`text-white/80 hover:text-white text-sm font-semibold transition-colors ${isArabic ? 'text-right' : ''}`}>{t('navbar.trims')}</a>
        </div>

        {/* أزرار التحكم (اللغة + الموبايل) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-white/80 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase"
            title="Change Language"
          >
            {isArabic ? t('navbar.english') : t('navbar.arabic')}
          </button>

          {/* زرار الموبايل */}
          <button className="md:hidden text-white hover:text-red-500 transition-colors bg-white/5 p-1.5 rounded-full border border-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* القائمة بتاعة الموبايل لما تفتح */}
      <div className={`absolute top-[70px] left-0 w-full bg-black/90 backdrop-blur-2xl border-b border-white/20 p-6 flex flex-col items-center gap-6 md:hidden transition-all duration-300 transform origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <a href="#exterior" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.exterior')}</a>
        <a href="#interior" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.interior')}</a>
        <a href="#personalize" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.personalize')}</a>
        <a href="#performance" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.performance')}</a>
        <a href="#safety" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.safety')}</a>
        <a href="#dimensions" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.dimensions')}</a>
        <a href="#specs" className="text-white text-lg font-semibold uppercase tracking-wider hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('navbar.specs')}</a>
      </div>
    </nav>
  );
}
export default Navbar;
