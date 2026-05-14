import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// الداتا بتاعة الجدول
export const trimsData = [
    {
        category: "Exterior",
        features: [
            {
                name: "Wheels",
                gl: "Alloy 17 inch wheels new design", // [cite: 19, 20]
                gls: "Alloy 18 inch wheels (P) new design", // [cite: 15, 16]
                top: "Alloy 19 inch wheels (P) new design" // [cite: 17, 18]
            },
            {
                name: "Head Lamps",
                gl: "3 cell MFR LED LAMPS", // [cite: 13, 30]
                gls: "3 cell MFR LED LAMPS", // [cite: 13, 30]
                top: "LED Head Lamps 4 cube projection (P)" // [cite: 22, 23]
            },
            {
                name: "Fog Lamps",
                gl: "Rear LED Fog Lamps", // [cite: 31]
                gls: "Rear LED Fog Lamps", // [cite: 40]
                top: "LED Fog Lamps, Projection (P)" // [cite: 26, 27]
            },
            {
                name: "Daytime Running Light",
                gl: "Daytime Running Light (LED)", // [cite: 32]
                gls: "Daytime Running Light (LED)", // [cite: 34]
                top: "Daytime Running Light (LED)" // [cite: 36]
            },
            {
                name: "Rear Combination Lamp",
                gl: "RR Combination Lamp, LED", // [cite: 33]
                gls: "RR Combination Lamp, LED", // [cite: 37]
                top: "RR Combination Lamp, LED" // [cite: 28, 29]
            },
            {
                name: "Outside Mirrors",
                gl: "Manual Outside Mirror Folding", // [cite: 35]
                gls: "Electric Mirror Adjustment & Folding (P)", // [cite: 21]
                top: "Electric Mirror Adjustment & Folding" // [cite: 41]
            },
            {
                name: "Roof Options",
                gl: "-",
                gls: "Panoramic Sunroof (P) + Roof Rack (P)", // [cite: 25, 38, 39]
                top: "Panoramic Sunroof + Glossy Black Roof Rack" // [cite: 42, 43]
            },
            {
                name: "Rear Brakes",
                gl: "-",
                gls: "-",
                top: "Rear Disc 16 inch" // [cite: 24]
            }
        ]
    },
    {
        category: "Interior",
        features: [
            {
                name: "Seats Material",
                gl: "Cloth Seats", // [cite: 47]
                gls: "Artificial Leather Seats (P) / PU", // [cite: 48, 55]
                top: "Leather" // [cite: 56]
            },
            {
                name: "Seats Adjustment",
                gl: "6 way Manual Adjustment (Driver +Passenger)", // [cite: 51]
                gls: "6 way Power Seats (Driver) (P) + 6 way Manual Adjustment (Passenger) + Lumbar Support (P)", // [cite: 53, 59]
                top: "Memory Seat Adjustment (Driver) + 6-way Power (D+P) + Walk in device passenger" // [cite: 61, 64]
            },
            {
                name: "Seats Comfort",
                gl: "-",
                gls: "-",
                top: "Ventilated & Heated (Front seats)" // [cite: 75]
            },
            {
                name: "Rear Seats",
                gl: "Rear 6:4 Split back folding Seats", // [cite: 52, 74, 80]
                gls: "Rear 6:4 Split back folding Seats", // [cite: 52, 74, 80]
                top: "Rear 6:4 Split back folding Seats" // [cite: 52, 74, 80]
            },
            {
                name: "Steering Wheel Material",
                gl: "2 spoke PU steering wheel", // [cite: 72]
                gls: "Leather steering wheel", // [cite: 70]
                top: "Leather (2 tone) steering wheel" // [cite: 71]
            },
            {
                name: "Steering Adjustment",
                gl: "Steering Manual Tilt & Telescopic", // [cite: 62, 78, 83]
                gls: "Steering Manual Tilt & Telescopic", // [cite: 62, 78, 83]
                top: "Steering Manual Tilt & Telescopic" // [cite: 62, 78, 83]
            },
            {
                name: "Luggage Screen",
                gl: "Luggage Screen", // [cite: 68, 76, 81]
                gls: "Luggage screen", // [cite: 68, 76, 81]
                top: "Luggage screen" // [cite: 68, 76, 81]
            },
            {
                name: "Multimedia Screen",
                gl: "CCnc 12.3\" inch Multimedia", // [cite: 57, 79, 85]
                gls: "CCnc 12.3\" inch Multimedia", // [cite: 57, 79, 85]
                top: "CCnc 12.3\" inch Multimedia" // [cite: 57, 79, 85]
            },
            {
                name: "Interior Lighting",
                gl: "-",
                gls: "Overhead LED Console Lamp (P)", // [cite: 63]
                top: "Dynamic Welcome Lights (P) + Personal LED lamp (P) + Mood Lamp w/ Controller (P) for 1.5T & HEV" // [cite: 49, 66, 67]
            },
            {
                name: "Gear Shift",
                gl: "-",
                gls: "E-Shift for SBW only for 1.5T & HEV", // [cite: 65, 77, 82]
                top: "E-Shift for SBW only for 1.5T & HEV" // [cite: 65, 77, 82]
            },
            {
                name: "Window Control",
                gl: "-",
                gls: "-",
                top: "Window Control Power Up/Down & Saftey (Front) (P)" // [cite: 54]
            }
        ]
    },
    {
        category: "Safety",
        features: [
            {
                name: "Airbags",
                gl: "Airbags depowered Front (Driver + Passenger) & Front Throax", // [cite: 89]
                gls: "Airbags depowered Front (Driver + Passenger) & Front Throax + Curtain Airbags (P)", // [cite: 90, 94]
                top: "Airbags depowered Front (D+P)+ Front Thorax + Curtain" // [cite: 114]
            },
            {
                name: "Cruise Control",
                gl: "Cruise Control", // [cite: 93, 98]
                gls: "Cruise Control", // [cite: 93, 98]
                top: "Smart Cruise Control 2 w/ Stop & Go + DMS" // [cite: 91]
            },
            {
                name: "Braking & Stability Systems",
                gl: "ABS+ ESC+ DBC+ HAC+ MCB + EPB with Autohold", // [cite: 97, 100, 101, 104, 115, 116]
                gls: "ABS+ ESC+ DBC+ HAC+ MCB + EPB with Autohold", // [cite: 97, 100, 101, 104, 115, 116]
                top: "ABS+ ESC+ DBC+ HAC+ MCB + EPB with Autohold" // [cite: 97, 100, 101, 104, 115, 116]
            },
            {
                name: "Tire Pressure",
                gl: "Tire Pressure Management System", // [cite: 103, 108, 117]
                gls: "Tire Pressure Management System", // [cite: 103, 108, 117]
                top: "Tire Pressure Management System" // [cite: 103, 108, 117]
            },
            {
                name: "Parking Distance Warning",
                gl: "Parking Distance Warning Front, Reverse", // [cite: 107, 112]
                gls: "Parking Distance Warning Front, Reverse", // [cite: 107, 112]
                top: "PDW (F/S/R) + PCA (Reverse) (P)" // [cite: 99, 109]
            },
            {
                name: "Monitors & Cameras",
                gl: "Rear View Monitor (RVM)", // [cite: 111, 113]
                gls: "Rear View Monitor (RVM)", // [cite: 111, 113]
                top: "SVM + BVM (P)" // [cite: 102, 105]
            },
            {
                name: "Advanced ADAS",
                gl: "-",
                gls: "-",
                top: "BCA+LKA+FCA2 +LFA 2" // [cite: 95]
            }
        ]
    },
    {
        category: "Convenience",
        features: [
            {
                name: "Cluster Display",
                gl: "Integrated Display 4\" TFT", // [cite: 121, 138]
                gls: "Integrated Display 4\" TFT", // [cite: 121, 138]
                top: "Integrated Display 12.3 inch TFT (P)" // [cite: 129]
            },
            {
                name: "Key System",
                gl: "Smart Key & Button Start", // [cite: 136]
                gls: "smart key (fob) & button start (P)", // [cite: 127, 147]
                top: "Digital Key (P)" // [cite: 125, 126]
            },
            {
                name: "Air Conditioning",
                gl: "Manual AC control + Rear Air vent", // [cite: 133, 137]
                gls: "Auto Temp AC control (single) (P) + Rear Air vent", // [cite: 135, 149]
                top: "Auto Temp AC control (single) + Rear air vent" // [cite: 155, 156]
            },
            {
                name: "Bluetooth",
                gl: "Bluetooth W/ Voice Recognition (W/Custom)", // [cite: 130, 140, 148]
                gls: "Bluetooth W/ Voice Recognition (W/Custom)", // [cite: 130, 140, 148]
                top: "Bluetooth W/ Voice Recognition (W/Custom)" // [cite: 130, 140, 148]
            },
            {
                name: "Drive Mode",
                gl: "Drive Mode Select", // [cite: 146, 151, 153]
                gls: "Drive Mode Select", // [cite: 146, 151, 153]
                top: "Drive Mode Select" // [cite: 146, 151, 153]
            },
            {
                name: "Filters & Warnings",
                gl: "Air Filter + Low washer fluid warning", // [cite: 141, 143, 144, 150, 152, 154]
                gls: "Air Filter + Low Washer Fluid Warning", // [cite: 141, 143, 144, 150, 152, 154]
                top: "Air Filter + Low Washer Fluid Warning" // [cite: 141, 143, 144, 150, 152, 154]
            },
            {
                name: "Inside Mirror",
                gl: "-",
                gls: "Electronic Chromic Mirror (ECM) (P)", // [cite: 128, 145]
                top: "Electronic Chromic Mirror (ECM)" // [cite: 128, 145]
            },
            {
                name: "Wireless Charging",
                gl: "-",
                gls: "Wireless Charger (P)", // [cite: 131]
                top: "Wireless Charger" // [cite: 158]
            },
            {
                name: "OTA + CCS",
                gl: "-",
                gls: "-",
                top: "OTA + CCS(P)" // [cite: 123, 124, 157]
            },
            {
                name: "Tailgate",
                gl: "-",
                gls: "-",
                top: "Tailgate Power Opening (P)" // [cite: 132]
            }
        ]
    },
    {
        category: "Optional Extras",
        features: [
            {
                name: "Full Size Alloy",
                gl: "Available", // [cite: 162]
                gls: "Available", // [cite: 163]
                top: "Available" // [cite: 165]
            },
            {
                name: "Two Tone Exterior Color",
                gl: "Available", // [cite: 166]
                gls: "Available", // [cite: 167]
                top: "Available" // [cite: 168]
            },
            {
                name: "Curtain Airbags",
                gl: "-",
                gls: "Available", // [cite: 169]
                top: "-"
            },
            {
                name: "Head Up Display",
                gl: "-",
                gls: "Available", // [cite: 172, 173]
                top: "-"
            },
            {
                name: "In Built Map",
                gl: "-",
                gls: "Available", // [cite: 174]
                top: "Available" // [cite: 176, 187]
            },
            {
                name: "Leather (2 tone) steering wheel",
                gl: "-",
                gls: "Available", // [cite: 164, 177]
                top: "-"
            },
            {
                name: "Integrated Display 12.3\" TFT",
                gl: "-",
                gls: "Available", // [cite: 178]
                top: "-"
            },
            {
                name: "Additional ADAS (PCA / SCC / LKA / FCA / BCA)",
                gl: "-",
                gls: "-",
                top: "Available" // [cite: 170, 171, 175, 179]
            },
            {
                name: "Harman/Kardon Sound",
                gl: "-",
                gls: "-",
                top: "Available" // [cite: 181, 182]
            },
            {
                name: "Cameras & Sensors (BVM + SVM + PDW)",
                gl: "-",
                gls: "-",
                top: "Available" // [cite: 183, 185]
            },
            {
                name: "Front LED Fog lamps",
                gl: "-",
                gls: "-",
                top: "Available" // [cite: 188]
            }
        ]
    }
];

export default function Trims() {
    const sectionRef = useRef<HTMLElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // State عشان نتحكم إيه اللي مفتوح وإيه اللي مقفول في الـ Accordion
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        trimsData.reduce((acc, section, index) => ({ ...acc, [section.category]: index === 0 }), {})
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
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] p-6 border-b border-white/10 bg-white/[0.02]">
                    <div className="text-white/60 font-sans text-xs font-bold uppercase tracking-widest">Feature</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">GL</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">GLS</div>
                    <div className="text-white font-sans text-sm md:text-base font-bold text-center">TOP</div>
                </div>

                {/* أقسام الجدول (Accordions) */}
                <div className="flex flex-col">
                    {trimsData.map((section) => (
                        <div key={section.category} className="border-b border-white/5 last:border-none">

                            {/* زرار الـ Accordion */}
                            <button
                                onClick={() => toggleSection(section.category)}
                                className="w-full flex p-5 items-center hover:bg-white/[0.03] transition-colors"
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
                                            className="grid grid-cols-[2fr_1fr_1fr_1fr] p-5 items-center bg-black/40 border-t border-white/5"
                                        >
                                            <div className="text-white/80 font-sans text-sm">{feature.name}</div>
                                            <div className="text-white font-sans text-xs md:text-sm text-center">{feature.gl}</div>
                                            <div className="text-white font-sans text-xs md:text-sm text-center">{feature.gls}</div>
                                            <div className="text-white font-sans text-xs md:text-sm text-center">{feature.top}</div>
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