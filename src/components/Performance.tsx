import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Share2, Road } from 'lucide-react'; // أيقونات تقريبية للتصميم
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

const performanceData = [
    {
        id: 1,
        icon: <Gauge className="w-10 h-10 text-white/80 font-light mb-6" strokeWidth={1} />,
        title: "1.5L T-GDI",
        desc: "The  1.5L Turbocharged engine delivers an impressive surge of power and torque, ensuring a dynamic, responsive, and thrilling driving experience on every trip."
    },
    {
        id: 2,
        icon: <Share2 className="w-10 h-10 text-white/80 font-light mb-6" strokeWidth={1} />,
        title: "All-Wheel Drive",
        desc: "The intelligent All-Wheel Drive system continuously adapts to changing conditions, delivering optimal traction and stability to all four wheels, no matter the terrain or weather."
    },
    {
        id: 3,
        icon: <Road className="w-10 h-10 text-white/80 font-light mb-6" strokeWidth={1} />,
        title: "Multi-Terrain Mode",
        desc: "Sportage provides four driving modes, which can be freely switched according to your needs."
    }
];

export default function Performance() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // أنيميشن العنوان (بينزل من فوق)
            gsap.fromTo(headerRef.current,
                { y: -30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
                }
            );

            // أنيميشن المميزات (بتطلع من تحت ورا بعض)
            gsap.fromTo(itemsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="performance" className="relative w-full h-screen bg-[#05141f] overflow-hidden flex flex-col">

            {/* خلفية الفيديو */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    // ⚠️ حط مسار الفيديو بتاعك هنا (سواء Local أو سيرفر)
                    src={`${ASSET_URL}/vids/kia-nq5e-pe-performance.webm`}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    // لو مفيش فيديو هيعرض الصورة دي كـ Fallback مؤقتاً
                    poster={`${ASSET_URL}/seq/ext/kia-nq5e-pe-heroseq-00.webp`}
                />
                {/* Gradient Overlay علشان الكلام يبان */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#06141F]/100 via-transparent to-[#05141f]/100"></div>
            </div>

            {/* المحتوى */}
            <div className="relative z-10 flex flex-col justify-between w-full h-full max-w-[1400px] mx-auto px-6 py-24 md:py-32 pointer-events-none">

                {/* الهيدر اللي فوق على الشمال */}
                <div ref={headerRef} className="opacity-0">
                    <span className="text-white/50 uppercase font-sans text-sm md:text-base font-semibold tracking-[0.2em]">
                        Performance
                    </span>
                    <h2 className="text-white font-sans text-4xl md:text-4xl lg:text-4xl font-bold mt-2 tracking-tight">
                        Go Anywhere With Ease
                    </h2>
                    <div className="w-[200px] h-[1px] bg-white mt-6"></div>
                </div>

                {/* مميزات الأداء اللي تحت */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-10">
                    {performanceData.map((item, index) => (
                        <div
                            key={item.id}
                            ref={(el) => { if (el) itemsRef.current[index] = el; }}
                            className="opacity-0 flex flex-col"
                        >
                            {item.icon}
                            <h3 className="text-white font-sans text-2xl md:text-3xl font-bold mb-3 drop-shadow-md">
                                {item.title}
                            </h3>
                            <p className="text-white/70 font-sans text-base md:text-lg leading-relaxed drop-shadow-sm max-w-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}