import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-panoramic-display.webp`,
        title: "Panoramic Dual Curved 12.3” Display",
        description: "12.3-inch dual panoramic curved screen with an intuitive interface, wireless Apple CarPlay & Android Auto, and real-time navigation.",
    },
    {
        image: `${ASSET_URL}/stills/Kia-Sportage-L-Leather-Seats.webp`,
        title: "Premium Leather Seats",
        description: "Ventilated Artificial Leather seats with power adjustment, memory function & lumbar support.",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-sunroof.webp`,
        title: "Panoramic Sunroof",
        description: "Full-length panoramic glass roof with electrochromic dimming, flooding the cabin with natural light while maintaining UV protection.",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-speakers.webp`,
        title: "Premium Harman/Kardon Audio System",
        description: "The Harman/Kardon® system features 8 powerful speakers strategically placed throughout the interior, an external amplifier and Active Sound Design (ASD) technology for rich, detailed sound and an unrivaled listening experience",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-ambient-light.webp`,
        title: "Ambient Lighting",
        description: "Ambient lighting integrated into the crash pad and center console can be customized to create the perfect interior atmosphere.",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-steering-wheel.webp`,
        title: "Double D-Cut Steering Wheel",
        description: "A sporty, multi-function steering wheel that provides easy access to various controls while adding a touch of sophistication to the interior",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-ac-switch.webp`,
        title: "Dual-Function Infotainment & Climate Controls",
        description: "Seamlessly switch between climate and infotainment controls at the touch of a button.",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-wireless-charger.webp`,
        title: "Wireless Charging",
        description: "Simply place a compatible mobile device on the pad to charge the battery",
    },
    {
        image: `${ASSET_URL}/stills/kia-nq5e-pe-hud.webp`,
        title: "10” Head-Up Display",
        description: "Projecting key driving information on a 10-inch high-definition head-up display, you can focus more on the road ahead.",
    },
];

export default function InteriorFeatures() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // State للتحكم في السلايد الحالي
    const [activeIndex, setActiveIndex] = useState(0);

    // حساب الإندكس بتاع السلايد اللي قبل واللي بعد
    const prevIdx = (activeIndex - 1 + features.length) % features.length;
    const nextIdx = (activeIndex + 1) % features.length;

    // أنيميشن العنوان
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const nextSlide = () => setActiveIndex(nextIdx);
    const prevSlide = () => setActiveIndex(prevIdx);
    const goToSlide = (index: number) => setActiveIndex(index);

    // كلاس الـ Glass اللي كان في الـ CSS حولناه لـ Tailwind مباشر
    const glassClass = "bg-white/[0.03] backdrop-blur-[10px] border border-white/10";

    return (
        <section ref={sectionRef} id="interior-features" className="relative overflow-hidden min-h-screen py-24 w-full flex flex-col justify-center bg-[#05141f]">
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6">

                {/* الهيدر */}
                <div ref={titleRef} className="text-center mb-16 opacity-0">
                    <span className="text-md tracking-[0.2em] uppercase text-white/50 font-medium font-sans">Interior</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 font-sans">
                        Crafted for Comfort
                    </h2>
                </div>

                {/* السلايدر (Carousel) */}
                <div className="relative w-full flex items-center justify-center min-h-[500px]">

                    {/* الكارت اللي فات (طائر على الشمال) */}
                    <div
                        onClick={prevSlide}
                        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-64 xl:w-72 z-0 cursor-pointer opacity-30 hover:opacity-60 transition-all duration-300 transform -translate-x-1/3"
                    >
                        <div className={`${glassClass} rounded-2xl overflow-hidden flex flex-col h-full`}>
                            <img src={features[prevIdx].image} alt="Previous" className="w-full h-56 object-cover" />
                            <div className="p-4 bg-black/20">
                                <h4 className="text-base font-bold text-white truncate font-sans">{features[prevIdx].title}</h4>
                            </div>
                        </div>
                    </div>

                    {/* الكارت الأساسي (في النص) */}
                    <div className="relative z-10 w-full max-w-[1270px] mx-auto transition-all duration-500">
                        <div className={`${glassClass} rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:h-[550px]`}>

                            {/* الصورة */}
                            <div className="w-full lg:w-[650px] xl:w-[850px] h-[300px] md:h-[400px] lg:h-full flex-shrink-0 relative">
                                <img
                                    key={activeIndex}
                                    src={features[activeIndex].image}
                                    alt="Active"
                                    className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out]"
                                />
                            </div>

                            {/* الكلام */}
                            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between min-w-[350px]">

                                {/* الأرقام */}
                                <div className="flex items-center gap-4">
                                    <span className="text-6xl md:text-5xl font-bold text-white/30 font-sans">
                                        {String(activeIndex + 1).padStart(2, "0")}
                                    </span>
                                    <div className="h-px flex-1 bg-white"></div>
                                    <span className="text-base text-white/60 font-semibold tracking-widest font-sans">
                                        {String(activeIndex + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* العنوان والتفاصيل */}
                                <div className="flex flex-col justify-center space-y-5 py-6">
                                    <h3 className="text-3xl lg:text-2xl xl:text-2xl font-bold text-white leading-tight font-sans animate-[slideUp_0.5s_ease-out]">
                                        {features[activeIndex].title}
                                    </h3>
                                    <p className="text-white/80 leading-relaxed text-md font-sans animate-[slideUp_0.6s_ease-out]">
                                        {features[activeIndex].description}
                                    </p>
                                </div>

                                {/* زراير التحكم والنقط */}
                                <div className="flex items-center justify-between w-full pt-6 border-t border-white/10 mt-auto">
                                    <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-colors shrink-0">
                                        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                                    </button>

                                    {/* النقط (Dots) */}
                                    <div className="flex items-center justify-center gap-2 px-2 flex-wrap">
                                        {features.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => goToSlide(i)}
                                                className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 md:w-8 bg-white' : 'w-2 md:w-2.5 bg-white/30 hover:bg-white/60'}`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-colors shrink-0">
                                        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* الكارت الجاي (طائر على اليمين) */}
                    <div
                        onClick={nextSlide}
                        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-64 xl:w-72 z-0 cursor-pointer opacity-30 hover:opacity-60 transition-all duration-300 transform translate-x-1/3"
                    >
                        <div className={`${glassClass} rounded-2xl overflow-hidden flex flex-col h-full`}>
                            <img src={features[nextIdx].image} alt="Next" className="w-full h-56 object-cover" />
                            <div className="p-4 bg-black/20">
                                <h4 className="text-base font-bold text-white truncate font-sans">{features[nextIdx].title}</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ضفنا أنيميشن خفيف للـ CSS عشان النقلة بين الصور تكون شيك */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0.8; filter: blur(2px); }
          to { opacity: 1; filter: blur(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
}