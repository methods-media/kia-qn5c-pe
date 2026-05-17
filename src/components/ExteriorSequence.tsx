import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, ShieldCheck, ChevronLeft, ChevronRight, Road, Gauge } from 'lucide-react';
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

const sliderData = [

  {
    title: "Star-map Signature Lighting",
    desc: "Kia’s signature Star-map daytime running lights and redesigned radiator grille come together to create a more confident front design and an instantly recognizable presence.",
    type: "sequence"
  },
  {
    title: "Vertically Shaped LED Headlights",
    desc: "Illuminate the path ahead with distinct style. The striking vertically shaped LED headlights not only provide superior nighttime visibility but also give the Sportage a bold, futuristic signature look that stands out.",
    type: "static",
    src: `${ASSET_URL}/stills/kia-nq5e-pe-headlights-on.webp`
  },
  {
    title: "LED Taillights with Star-map",
    desc: "The rear combination lamps with new graphics and the characteristic Star Map design immediately attract attention.",
    type: "static",
    src: `${ASSET_URL}/stills/kia-nq5e-pe-taillights-on.webp`
  },
  {
    title: "New Design Alloy Wheels",
    desc: "The 19-inch wheels take both performance and design to the next level, delivering the ideal balance between elegance and sportiness.",
    type: "static",
    src: `${ASSET_URL}/stills/kia-nq5e-pe-rims.webp`
  }
];

export default function ExteriorSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiStartRef = useRef<HTMLDivElement>(null);
  const uiEndRef = useRef<HTMLDivElement>(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const frameObj = useRef({ frame: 0 });
  const images = useRef<HTMLImageElement[]>([]);
  const staticImages = useRef<HTMLImageElement[]>([]);
  const slideIndexRef = useRef(0);

  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loadImages = () => {
      if (images.current.length > 0) return; // Prevent multiple loads
      const baseUrl = `${ASSET_URL}/seqs/ext/kia-nq5e-pe-heroseq-`;

      for (let i = 2; i <= 60; i++) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        const num = i.toString().padStart(2, '0');
        img.src = `${baseUrl}${num}.webp`;
        if (i === 0) {
          img.onload = () => renderCanvas(img);
        }
        images.current.push(img);
      }

      sliderData.forEach((slide, idx) => {
        if (slide.type === "static" && slide.src) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = slide.src;
          staticImages.current[idx] = img;
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadImages();
        observer.disconnect();
      }
    }, { rootMargin: "1500px" });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const renderCanvas = (imgToDraw: HTMLImageElement) => {
      if (!imgToDraw || !imgToDraw.complete) return;
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      const ratio = Math.max(canvas.width / imgToDraw.width, canvas.height / imgToDraw.height);
      const cx = (canvas.width - imgToDraw.width * ratio) / 2;
      const cy = (canvas.height - imgToDraw.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height, cx, cy, imgToDraw.width * ratio, imgToDraw.height * ratio);
    };

    const renderCurrentState = () => {
      if (slideIndexRef.current === 0) {
        const f = Math.round(frameObj.current.frame);
        if (images.current[f]) renderCanvas(images.current[f]);
      } else {
        if (staticImages.current[slideIndexRef.current]) {
          renderCanvas(staticImages.current[slideIndexRef.current]);
        }
      }
    };

    const handleResize = () => renderCurrentState();
    window.addEventListener('resize', handleResize);

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.15,
          pin: true,
          onUpdate: () => {
            if (slideIndexRef.current !== 0) {
              setSlideIndex(0);
            }
            renderCurrentState();
          }
        }
      });

      tl.to(frameObj.current, {
        frame: 60,
        ease: "none",
        duration: 1
      }, 0);

      tl.to(uiStartRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power1.inOut"
      }, 0);

      tl.fromTo(uiEndRef.current,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.15, ease: "power1.inOut" },
        0.85
      );
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
      observer.disconnect();
    };
  }, []);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const renderCanvas = (imgToDraw: HTMLImageElement) => {
      if (!imgToDraw || !imgToDraw.complete) return;
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      const ratio = Math.max(canvas.width / imgToDraw.width, canvas.height / imgToDraw.height);
      const cx = (canvas.width - imgToDraw.width * ratio) / 2;
      const cy = (canvas.height - imgToDraw.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height, cx, cy, imgToDraw.width * ratio, imgToDraw.height * ratio);
    };

    if (slideIndex === 0) {
      const f = Math.round(frameObj.current.frame);
      if (images.current[f]) renderCanvas(images.current[f]);
    } else {
      if (staticImages.current[slideIndex]) {
        renderCanvas(staticImages.current[slideIndex]);
      }
    }
  }, [slideIndex]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0"></canvas>

      <div ref={uiStartRef} className="absolute inset-0 z-10 flex flex-col md:flex-row justify-between p-8 md:p-16 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 50%, rgba(0,0,0,0.4) 0%, transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%)" }}>
        <div className="mt-10 md:mt-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-sans" style={{ textShadow: "0 4px 8px rgba(0,0,0,0.6)" }}>The Kia Sportage L</h1>
          <p className="text-white text-2xl md:text-3xl mt-3 font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>This is next level</p>
        </div>
        <div className="flex flex-col gap-10 mt-20 md:mt-32 items-end text-right">
          <div className="flex flex-col items-end">
            <Gauge className="w-12 h-12 text-white mb-2 filter drop-shadow-md" />
            <h3 className="text-white text-3xl font-bold font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>1.5L Turbo</h3>
            <p className="text-white/80 text-lg font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>200 Horsepower</p>
          </div>
          <div className="flex flex-col items-end">
            <Settings className="w-12 h-12 text-white mb-2 filter drop-shadow-md" />
            <h3 className="text-white text-3xl font-bold font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>8-Speed</h3>
            <p className="text-white/80 text-lg font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Automatic Transmission</p>
          </div>
          <div className="flex flex-col items-end">
            <Road className="w-12 h-12 text-white mb-2 filter drop-shadow-md" />
            <h3 className="text-white text-3xl font-bold font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Drive Mode</h3>
            <p className="text-white/80 text-lg font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Multi-Terrain Mode</p>
          </div>
          <div className="flex flex-col items-end">
            <ShieldCheck className="w-12 h-12 text-white mb-2 filter drop-shadow-md" />
            <h3 className="text-white text-3xl font-bold font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>5-Years<br />Warranty</h3>
            <p className="text-white/80 text-lg font-sans" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>150,000 Km WCF</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-7 h-11 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce"></div>
          </div>
          <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Scroll to Start</span>
        </div>
      </div>

      <div ref={uiEndRef} className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 opacity-0 pointer-events-none" style={{ background: "linear-gradient(to top right, rgba(0,0,0,0.8) 0%, transparent 50%)" }}>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
          <button onClick={prevSlide} className="pointer-events-auto w-14 h-14 rounded-full bg-black/20 hover:bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={nextSlide} className="pointer-events-auto w-14 h-14 rounded-full bg-black/20 hover:bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
        <div className="max-w-3xl mb-10 relative z-10 pointer-events-auto">
          <h2 className="text-white text-4xl md:text-4xl font-bold font-sans mb-4 transition-all duration-300" style={{ textShadow: "0 4px 8px rgba(0,0,0,0.6)" }}>
            {sliderData[slideIndex].title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-sans leading-relaxed transition-all duration-300" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}>
            {sliderData[slideIndex].desc}
          </p>
        </div>
      </div>
    </section>
  );
}