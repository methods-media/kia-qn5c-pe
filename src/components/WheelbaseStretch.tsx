import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

export default function WheelbaseMeasurement() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "center center",
                    end: "+=150%",
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => {
                        // الطول الإجمالي 4660
                        const currentLength = Math.round(self.progress * 4695);
                        if (counterRef.current) {
                            counterRef.current.innerText = `${currentLength} mm`;
                        }
                    }
                }
            });

            // حركة التيكست في الخلفية
            tl.fromTo(bgTextRef.current,
                { y: "80%" },
                { y: "-80%", ease: "none" },
                0
            );

            // رسم الخط (بيكبر في العرض لحد 82% عشان يغطي العربية بالظبط من غير الشفاف)
            tl.fromTo(lineRef.current,
                { width: "0%" },
                { width: "75%", ease: "none" },
                0
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const carImgUrl = `${ASSET_URL}/stills/kia-nq5e-lpe-longwheelbase.png`;

    return (
        <section ref={sectionRef} id="wheelbase" className="relative h-screen w-full bg-[#05141F] overflow-hidden flex items-center justify-center">

            {/* التيكست العملاق في الخلفية */}
            <div
                ref={bgTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none opacity-[0.06]"
            >
                <h1 className="text-[12vw] font-black text-white whitespace-nowrap uppercase tracking-tighter leading-[0.8] text-center">
                    Class-Leading
                    <br />
                    Spaciousness
                </h1>
            </div>

            {/* الكونتينر كبرناه جداً عشان العربية تملا الشاشة */}
            <div className="relative z-10 w-[95vw] max-w-[1600px] mx-auto mt-10">

                {/* صورة العربية */}
                <img
                    src={carImgUrl}
                    alt="Kia Sportage L Side"
                    className="w-full h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] transform scale-110"
                />

                {/* خط القياس (بيترسم من عند الاكصدام) */}
                <div
                    className="absolute top-[50%] left-[13%] h-[3px] bg-red-500 z-20 shadow-[0_0_15px_rgba(239,68,68,1)]"
                    ref={lineRef}
                >
                    {/* العلامة العمودية في بداية الخط */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[40px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>

                    {/* العلامة العمودية في نهاية الخط (بتتحرك معاه) */}
                    <div className="absolute right-[0%] top-1/2 -translate-y-1/2 w-[3px] h-[40px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>

                    {/* عداد الأرقام (مربوط بنهاية الخط وبيمشي معاه) */}
                    <div className="absolute right-[0%] -top-16 translate-x-1/2 bg-red-500 text-white font-bold font-sans text-3xl md:text-4xl px-6 py-2 rounded-full whitespace-nowrap shadow-2xl border-2 border-white/20">
                        <span ref={counterRef}>0 mm</span>
                        {/* المثلث الصغير اللي تحت العداد */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-red-500"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}