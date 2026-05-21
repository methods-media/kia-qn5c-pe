import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, ArrowUpToLine, CornerUpLeft, Fuel } from 'lucide-react';
import { ASSET_URL } from '../App';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// بيانات الأبعاد
const dimensions = [
  { id: 'length', label: 'Length', value: 4695, unit: 'mm', angle: 0 },
  { id: 'width', label: 'Width', value: 1865, unit: 'mm', angle: 90 },
  { id: 'height', label: 'Height', value: 1645, unit: 'mm', angle: 180 },
  { id: 'wheelbase', label: 'Wheelbase', value: 2755, unit: 'mm', angle: 270 },
];

// بيانات الـ Specs Cards
const specs = [
  { label: 'Cargo Volume', value: '586', unit: 'L', desc: 'Best in class', icon: Box },
  { label: 'Ground Clearance', value: '210', unit: 'mm', desc: '*4WD Variation Only', icon: ArrowUpToLine },
  { label: 'Turning Radius', value: '5.9', unit: 'm', desc: 'City-friendly agility', icon: CornerUpLeft },
  { label: 'Fuel Tank', value: '54', unit: 'L', desc: 'Longer Trips', icon: Fuel },
];

export function Dimensions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const specsGridRef = useRef<HTMLDivElement>(null);
  const dimCardsRef = useRef<HTMLButtonElement[]>([]);
  const specCardsRef = useRef<HTMLDivElement[]>([]);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  const [activeDim, setActiveDim] = useState<string>('length');
  const [hasAnimated, setHasAnimated] = useState(false);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // أنيميشن الدخول الرئيسية
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Car image - dramatic entrance
      gsap.fromTo(carContainerRef.current,
        { scale: 0.7, opacity: 0, rotateY: -15 },
        {
          scale: 1, opacity: 1, rotateY: 0, duration: 1.8, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            onEnter: () => setHasAnimated(true),
          }
        }
      );

      // Dimension cards - stagger from bottom
      gsap.fromTo(dimCardsRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' }
        }
      );

      // Spec cards entrance
      gsap.fromTo(specCardsRef.current,
        { y: 50, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: specsGridRef.current, start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Counter animation عند الدخول
  useEffect(() => {
    if (!hasAnimated) return;

    counterRefs.current.forEach((el) => {
      if (!el) return;
      const target = parseInt(el.dataset.target || '0', 10);
      gsap.fromTo(el, { innerText: '0' }, {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function () {
          el.textContent = Math.round(parseFloat(el.innerText)).toLocaleString();
        }
      });
    });
  }, [hasAnimated]);

  // أنيميشن التبديل بين الأبعاد
  const handleDimClick = (id: string) => {
    if (id === activeDim) return;
    setActiveDim(id);

    // Flash effect on car
    if (carContainerRef.current) {
      gsap.fromTo(carContainerRef.current, { filter: 'brightness(1.4)' }, {
        filter: 'brightness(1)', duration: 0.6, ease: 'power2.out'
      });
    }
  };

  // حساب خط البُعد المختار (لعرض الخط المتحرك)
  const getLineStyle = () => {
    switch (activeDim) {
      case 'length':
        return { top: '51.5%', left: '9%', width: '82%', height: '5px', transform: 'none' };
      case 'width':
        return { top: '51.5%', left: '27%', width: '46%', height: '5px', transform: 'none' };
      case 'height':
        return { top: '14%', left: '50.7%', width: '5px', height: '70%', transform: 'none' };
      case 'wheelbase':
        return { top: '71.5%', left: '23%', width: '53%', height: '5px', transform: 'none' };
      default:
        return {};
    }
  };

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center relative py-24 w-full overflow-hidden bg-[#05141f]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-left mb-20 opacity-0">
          <span className="text-mb uppercase tracking-[0.2em] text-white/50 font-medium font-sans block mb-4">
            Dimensions
          </span>
          <h2 className="text-4xl md:text-4xl font-bold text-white font-sans">
            Every Dimension, Perfected.
          </h2>
        </div>

        {/* Interactive Car Area */}
        <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

          {/* Dimension Tabs - Left Side */}
          <div className="flex flex-row lg:flex-col gap-3 lg:w-[200px] shrink-0">
            {dimensions.map((dim, i) => (
              <button
                key={dim.id}
                ref={(el) => { if (el) dimCardsRef.current[i] = el; }}
                onClick={() => handleDimClick(dim.id)}
                className={`group relative px-5 py-4 rounded-2xl text-left transition-all duration-500 border opacity-0 ${activeDim === dim.id
                  ? 'bg-white border-white/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                  }`}
              >
                <span className={`block text-[12px] uppercase tracking-[0.2em] font-bold mb-1 transition-colors duration-300 ${activeDim === dim.id ? 'text-red-500' : 'text-white/50 group-hover:text-white/50'
                  }`}>
                  {dim.label}
                </span>
                <span
                  ref={(el) => { if (el) counterRefs.current[i] = el; }}
                  data-target={dim.value}
                  className={`text-2xl font-bold font-sans transition-colors duration-300 ${activeDim === dim.id ? 'text-[#05141f]' : 'text-white/50 group-hover:text-white/70'
                    }`}
                >
                  {dim.value.toLocaleString()}
                </span>
                <span className={`text-xs ml-1 transition-colors duration-300 ${activeDim === dim.id ? 'text-[#05141f]/60' : 'text-white/20'
                  }`}>
                  {dim.unit}
                </span>

                {/* Active indicator */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-500 ${activeDim === dim.id ? 'h-8 bg-red-500' : 'h-0 bg-transparent'
                  }`} />
              </button>
            ))}
          </div>

          {/* Car Image with Measurement Overlay */}
          <div className="flex-1 relative flex items-center justify-center" style={{ perspective: '1200px' }}>
            <div ref={carContainerRef} className="relative w-full max-w-6xl opacity-0">
              <img
                src={activeDim === 'width' ? `${ASSET_URL}/stills/sportage-dimensions-width.png` : `${ASSET_URL}/stills/sportage-dimensions.png`}
                alt={activeDim === 'width' ? "Kia Sportage Front View" : "Kia Sportage Side View"}
                className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-500"
                style={{ maxHeight: '600px' }}
                onError={(e) => (e.currentTarget.src = activeDim === 'width' ? `${ASSET_URL}/stills/sportage-dimensions-width.png` : `${ASSET_URL}/stills/sportage-dimensions.png`)}
              />

              {/* خط البُعد المتحرك */}
              <div
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={getLineStyle()}
              >
                <div className="w-full h-full bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
              </div>

              {/* نقط الأطراف */}
              {activeDim === 'length' && (
                <>
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '50%', left: '9%' }} />
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '50%', left: '90%' }} />
                </>
              )}
              {activeDim === 'wheelbase' && (
                <>
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '70%', left: '21.5%' }} />
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '70%', left: '74.5%' }} />
                </>
              )}
              {activeDim === 'height' && (
                <>
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '12%', left: '50%' }} />
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '80%', left: '50%' }} />
                </>
              )}
              {activeDim === 'width' && (
                <>
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '50%', left: '25.5%' }} />
                  <div className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-700" style={{ top: '50%', left: '72.5%' }} />
                </>
              )}

              {/* Badge label for active dimension */}
              <div className={`absolute transition-all duration-700 ease-out ${activeDim === 'length' ? 'top-[42%] left-1/2 -translate-x-1/2' :
                activeDim === 'width' ? 'top-[54%] left-[42.5%]' :
                  activeDim === 'height' ? 'top-[45%] left-[52%]' :
                    'top-[77%] left-1/2 -translate-x-1/2'
                }`}>
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-1.5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-red-300 text-xs font-bold uppercase tracking-wider">{dimensions.find(d => d.id === activeDim)?.label}</span>
                  <span className="text-white font-bold text-sm">{dimensions.find(d => d.id === activeDim)?.value.toLocaleString()} mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div ref={specsGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                ref={(el) => { if (el) specCardsRef.current[i] = el; }}
                className="group relative opacity-0 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 rounded-2xl p-6 transition-all duration-500 cursor-default overflow-hidden"
              >
                {/* Background Icon */}
                <Icon className="absolute -bottom-4 -right-4 w-28 h-28 text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none" strokeWidth={1} style={{ transform: isArabic ? 'scaleX(-1)' : 'none' }} />

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-red-500/5 to-transparent" />

                <span className="text-[12px] uppercase tracking-[0.25em] text-white/50 font-bold block mb-3 relative z-10">{spec.label}</span>
                <div className="relative z-10 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white font-sans">{spec.value}</span>
                  <span className="text-lg text-white/50 font-sans">{spec.unit}</span>
                </div>
                <span className="text-white/25 text-sm font-sans mt-2 block relative z-10">{spec.desc}</span>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default Dimensions;
