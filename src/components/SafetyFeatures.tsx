import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

// 1. الداتا بتاعة البوكس الثابت اللي على الشمال
const mainFeature = {
    title: "Forward Collision-Avoidance Assist 2 (FCA2)",
    description: "Warns if the preceding vehicle suddenly slows down or if the risk of collision with a vehicle, a pedestrian, or a cyclist is detected. Automatically assists with braking if the risk of a collision increases after warning.",
    video: `${ASSET_URL}/vids/kia-nq5e-pe-fca2.webm` // ⚠️ مسار الفيديو الأساسي
};

// 2. الداتا بتاعة السلايدر المنفصل اللي على اليمين (تقدر تحط صور أو فيديوهات)
const sliderItems = [
    {
        id: 1,
        type: "image", // ممكن تخليها image أو video
        src: `${ASSET_URL}/stills/kia-nq5e-pe-lfa.jpg`, // ⚠️ مسار الميديا
        title: "Lane Following Assist 2 (LFA2)",
        description: "LFA 2 helps center the vehicle in the lane. Steering control has been improved and a Hands-On Detection (HOD) sensor can determine whether the driver is holding the steering wheel for optimal system performance."
    },
    {
        id: 2,
        type: "video",
        src: `${ASSET_URL}/vids/kia-nq5e-pe-bca.mp4`,
        title: "Blind-spot Collision-avoidance Assist (BCA)",
        description: "BCA provides a warning when a potential collision is detected with a vehicle approaching from the rear during a lane change."
    },
    {
        id: 3,
        type: "video",
        src: `${ASSET_URL}/vids/kia-nq5e-pe-pca.mp4`,
        title: "Parking Collision Avoidance Assist (PCA)",
        description: "The Sportage’s front, side, and rear sensors make maneuvering into and out of parking spaces easier. The system detects pedestrians or nearby obstacles, provides warnings, and, when there is an increased risk of collision, automatically applies emergency braking for added protection."
    },
    {
        id: 4,
        type: "image",
        src: `${ASSET_URL}/stills/kia-nq5e-pe-aeb.png`,
        title: "Smart Cruise Control 2 (SCC2)",
        description: "SCC2 helps you drive at a preset speed while maintaining a safe distance from the vehicle ahead. It automatically brings the Sportage to a stop then proceeds again when the vehicle ahead accelerates. If the stop is extended, you may need to press the accelerator pedal. When activated, SCC drives automatically, reflecting the learned driving style."
    },
    {
        id: 5,
        type: "image",
        src: `${ASSET_URL}/stills/kia-nq5e-pe-parking-sensors.png`,
        title: "Parking Distance Warning F/S/R (PDW)",
        description: "During forward or reverse parking, sensors positioned at the front, sides, and rear detect surrounding obstacles, providing added safety through visual distance indicators and audible alerts."
    },
    {
        id: 6,
        type: "image",
        src: `${ASSET_URL}/stills/kia-nq5e-pe-svm.png`,
        title: "Surround View Monitor (SVM)",
        description: "A high-resolution display that gives you a 360-degree bird's-eye view of the vehicle and its surroundings, making parking and low-speed maneuvering safer and more precise."
    },
    {
        id: 7,
        type: "image",
        src: `${ASSET_URL}/stills/kia-nq5e-pe-ota.png`,
        title: "Connected Car Services & Over the Air Updates",
        description: "Kia Connect is your gateway to a smarter, more connected driving experience, seamlessly linking your Kia to your smartphone. From remote engine start to keyless driving, Kia Connect enhances convenience at every journey. With Over-the-Air (OTA) updates, your vehicle’s software and features stay up to date automatically and wirelessly, without the need for dealership visits."
    },
    {
        id: 8,
        type: "image",
        src: `${ASSET_URL}/stills/kia-nq5e-pe-digital-key2.png`,
        title: "Digital Key 2",
        description: "With Digital Key 2, take advantage of keyless entry and the ability to share your keys virtually with family and friends."
    }
];

export default function SafetyFeatures() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // State للسلايدر اليمين بس (مفصول تماماً عن الشمال)
    const [rightIndex, setRightIndex] = useState(0);

    // أنيميشن دخول السيكشن
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const nextRightSlide = () => setRightIndex((prev) => (prev + 1) % sliderItems.length);
    const prevRightSlide = () => setRightIndex((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
    const goToRightSlide = (index: number) => setRightIndex(index);

    const activeRightItem = sliderItems[rightIndex];

    return (
        <section ref={sectionRef} id="safety" className="py-24 bg-[#05141f] min-h-screen flex flex-col justify-center">
            <div className="max-w-[1400px] mx-auto w-full px-6">

                {/* الهيدر */}
                <div ref={headerRef} className="mb-12 opacity-0">
                    <span className="text-white/50 uppercase tracking-[0.2em] font-sans text-lg font-medium">Drive Wise</span>
                    <h2 className="text-white font-sans text-4xl md:text-4xl font-bold mt-2">A Smarter Way to Drive</h2>
                    <div className="w-[20%] h-[1px] bg-white mt-6"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-5">

                    {/* ----- الجزء الشمال (الأساسي والمنفصل) ----- */}
                    <div className="w-full lg:w-[60%] flex flex-col">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/20 aspect-video">
                            <video
                                src={mainFeature.video}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                // لو الفيديو مش موجود هيعرض خلفية رمادي مؤقتاً
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.style.backgroundColor = '#1a1a1a';
                                }}
                            />
                        </div>

                        <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mt-8">
                            {mainFeature.title}
                        </h3>
                        <p className="text-white/70 text-lg font-sans mt-4 leading-relaxed">
                            {mainFeature.description}
                        </p>
                    </div>

                    {/* ----- الجزء اليمين (السلايدر المستقل) ----- */}
                    <div className="w-full lg:w-[40%] flex flex-col justify-top">

                        {/* كونتينر الميديا بتاع السلايدر */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 aspect-video group">

                            {activeRightItem.type === 'video' ? (
                                <video
                                    key={`vid-${activeRightItem.id}`} // الـ key بيخلي رياكت يعمل ريفريش للفيديو مع التقليب
                                    src={activeRightItem.src}
                                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
                                    autoPlay muted loop playsInline
                                />
                            ) : (
                                <img
                                    key={`img-${activeRightItem.id}`}
                                    src={activeRightItem.src}
                                    alt={activeRightItem.title}
                                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
                                />
                            )}

                            {/* زراير السلايدر اليمين */}
                            <button onClick={prevRightSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button onClick={nextRightSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>

                        {/* تفاصيل السلايدر اليمين */}
                        <div className="text-center mt-6 min-h-[100px]">
                            <h4 key={`title-${activeRightItem.id}`} className="text-white font-sans text-2xl font-bold animate-[slideUp_0.4s_ease-out]">
                                {activeRightItem.title}
                            </h4>
                            <p key={`desc-${activeRightItem.id}`} className="text-white/60 font-sans text-md mt-2 mx-auto animate-[slideUp_0.5s_ease-out]">
                                {activeRightItem.description}
                            </p>
                        </div>

                        {/* نقط السلايدر (Dots) */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                            {sliderItems.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToRightSlide(i)}
                                    className={`rounded-full transition-all duration-300 ${i === rightIndex ? 'w-2.5 h-2.5 bg-white' : 'w-2 h-2 bg-white hover:bg-white/'}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(4px); }
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