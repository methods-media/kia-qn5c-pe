import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

export default function InteriorSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiStartRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const frameObj = useRef({ frame: 0 });
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loadImages = () => {
      if (images.current.length > 0) return; // Prevent multiple loads
      const frameCount = 30;
      const baseUrl = `${ASSET_URL}/seqs/int/kia-nq5e-pe-intrseq-`;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        const num = i.toString().padStart(2, '0');
        img.src = `${baseUrl}${num}.webp`;
        if (i === 0) {
          img.onload = () => renderCanvas(img);
        }
        images.current.push(img);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadImages();
        observer.disconnect();
      }
    }, { rootMargin: "1500px" }); // Load when within 1500px

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const renderCanvas = (imgToDraw: HTMLImageElement) => {
      if (!imgToDraw || !imgToDraw.complete) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ratio = Math.max(canvas.width / imgToDraw.width, canvas.height / imgToDraw.height);
      const cx = (canvas.width - imgToDraw.width * ratio) / 2;
      const cy = (canvas.height - imgToDraw.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height, cx, cy, imgToDraw.width * ratio, imgToDraw.height * ratio);
    };

    const renderCurrentState = () => {
      const f = Math.round(frameObj.current.frame);
      if (images.current[f]) renderCanvas(images.current[f]);
    };

    const handleResize = () => renderCurrentState();
    window.addEventListener('resize', handleResize);

    const ctxGsap = gsap.context(() => {
      // 1. Entrance Animation (Premium Staggered Fade & Slide In)
      if (textContainerRef.current) {
        gsap.fromTo(textContainerRef.current.children,
          { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // 2. Scrub Timeline (Sequence + Depth Zoom-In Effect)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 0.5,
          pin: true,
          onUpdate: renderCurrentState
        }
      });

      tl.to(frameObj.current, {
        frame: frameCount - 1,
        ease: "none",
        duration: 1
      }, 0);

      // Zoom-in depth scrolling effect for the text
      tl.to(textContainerRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: "blur(15px)",
        ease: "power2.in",
        duration: 0.4
      }, 0);

      // Fade out the dark gradient overlay
      tl.to(uiStartRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0);
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} id="interior-sequence" className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0"></canvas>

      <div ref={uiStartRef} className="absolute inset-0 z-10 flex flex-col justify-center items-center p-8 md:p-16 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)" }}>
        <div ref={textContainerRef} className="text-center mt-20">
          <span className="text-md tracking-[0.2em] uppercase text-white font-semibold font-sans mb-4 block">Interior Space</span>
          <h2 className="text-white text-5xl md:text-7xl font-bold font-sans tracking-tight drop-shadow-2xl">
            Immersive Journey
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mt-6 font-sans max-w-2xl mx-auto drop-shadow-lg">
            Step inside and experience unparalleled comfort and cutting-edge technology.
          </p>
        </div>
      </div>
    </section>
  );
}
