import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// الداتا بتاعة الجدول
const trimsData = [
    {
        category: "ENGINE",
        isOpenByDefault: true,
        features: [
            { name: "Engine Type", values: ["2.5L MPI", "1.6L T-GDi", "1.6L T-GDi", "1.6L T-GDi HEV"] },
            { name: "Horsepower", values: ["187 HP", "187 HP", "187 HP", "227 HP"] },
            { name: "Torque", values: ["178 lb-ft", "195 lb-ft", "195 lb-ft", "258 lb-ft"] },
            { name: "Transmission", values: ["8-Speed AT", "8-Speed DCT", "8-Speed DCT", "6-Speed AT"] },
        ]
    },
    {
        category: "DIMENSIONS",
        isOpenByDefault: false,
        features: [
            { name: "Overall Length", values: ["4660 mm", "4660 mm", "4660 mm", "4660 mm"] },
            { name: "Wheelbase", values: ["2755 mm", "2755 mm", "2755 mm", "2755 mm"] },
            { name: "Wheels", values: ["17-inch Alloy", "18-inch Alloy", "19-inch Alloy", "19-inch Black Alloy"] },
        ]
    },
    {
        category: "TECHNOLOGY",
        isOpenByDefault: false,
        features: [
            { name: "Infotainment", values: ["8-inch Touch", "12.3-inch Display", "Dual 12.3-inch", "Dual 12.3-inch Curved"] },
            { name: "Sound System", values: ["6 Speakers", "6 Speakers", "Harman Kardon Premium", "Harman Kardon Premium"] },
        ]
    },
    {
        category: "SAFETY",
        isOpenByDefault: false,
        features: [
            { name: "FCA", values: ["Standard", "Standard", "Advanced", "Advanced"] },
            { name: "Blind-Spot View", values: ["Not Available", "Not Available", "Standard", "Standard"] },
        ]
    }
];

export default function Trims() {
    const sectionRef = useRef<HTMLElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // State عشان نتحكم إيه اللي مفتوح وإيه اللي مقفول في الـ Accordion
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        trimsData.reduce((acc, section) => ({ ...acc, [section.category]: section.isOpenByDefault }), {})
    );

    const toggleSection = (category: string) => {
        setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
    };

    // أنيميشن دخول السيكشن
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
            );

            gsap.fromTo(tableRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="trims" className="py-24 min-h-screen bg-[#05141f] flex flex-col items-center justify-center relative overflow-hidden">

            {/* الهيدر */}
            <div ref={headerRef} className="header-text text-center mb-12 opacity-0">
                <span className="text-white/60 font-sans text-xs tracking-[0.3em] font-bold uppercase">Specifications</span>
                <h2 className="text-white font-sans text-4xl md:text-5xl font-bold mt-2">Compare Trims</h2>
            </div>

            {/* كونتينر الجدول (70% من الشاشة) */}
            <div ref={tableRef} className="w-[95%] lg:w-[70%] max-w-[1200px] border border-white/10 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm opacity-0">

                {/* عناوين الجدول (أسماء الفئات) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] p-6 border-b border-white/10 bg-white/[0.02]">
                    <div className="text-white/60 font-sans text-xs font-bold uppercase tracking-widest">Feature</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">LX</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">EX</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">SX</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">SX Prestige</div>
                </div>

                {/* أقسام الجدول (Accordions) */}
                <div className="flex flex-col">
                    {trimsData.map((section) => (
                        <div key={section.category} className="border-b border-white/5 last:border-none">

                            {/* زرار الـ Accordion */}
                            <button
                                onClick={() => toggleSection(section.category)}
                                className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr] p-5 items-center hover:bg-white/[0.03] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <ChevronDown className={`w-5 h-5 text-white transition-transform duration-300 ${openSections[section.category] ? 'rotate-180' : ''}`} />
                                    <span className="text-white font-sans text-sm font-bold uppercase tracking-wider">{section.category}</span>
                                </div>
                            </button>

                            {/* محتوى الـ Accordion (مربوط بأنيميشن سلس عن طريق grid-rows) */}
                            <div
                                className={`grid transition-all duration-500 ease-in-out ${openSections[section.category] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    {section.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] p-5 items-center bg-black/40 border-t border-white/5"
                                        >
                                            <div className="text-white/80 font-sans text-sm">{feature.name}</div>
                                            {feature.values.map((val, vIdx) => (
                                                <div key={vIdx} className="text-white font-sans text-xs md:text-sm text-center">{val}</div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}