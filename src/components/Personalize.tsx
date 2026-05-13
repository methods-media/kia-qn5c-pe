import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCcw } from 'lucide-react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import '@photo-sphere-viewer/core/index.css';
import { ASSET_URL } from '../App';

gsap.registerPlugin(ScrollTrigger);

// بيانات الألوان
const colors = [
    { id: 'black', name: 'Aurora Black Pearl', hex: '#000000', img: `${ASSET_URL}/colors/kia-nq5e-pe-aurora-black-pearl.webp` },
    { id: 'green', name: 'Jungle Wood Green', hex: '#293a0aff', img: `${ASSET_URL}/colors/kia-nq5e-pe-jungle-wood-green.webp` },
    { id: 'white', name: 'Snow White Pearl', hex: '#f0f0f0', img: `${ASSET_URL}/colors/kia-nq5e-pe-snow-white-pearl.webp` },
    { id: 'gray-matte', name: 'Urban Gray Matte', hex: '#818181ff', img: `${ASSET_URL}/colors/kia-nq5e-pe-urban-gray-matte.webp` },
    { id: 'grey', name: 'Urban Grey', hex: '#7d7d7d', img: `${ASSET_URL}/colors/kia-nq5e-pe-urban-gray.webp` },
    { id: 'wolf-gray', name: 'Wolf Grey', hex: '#7d7d7d', img: `${ASSET_URL}/colors/kia-nq5e-pe-wolf-gray.webp` },
    { id: 'blue', name: 'Yacht Blue', hex: '#005ddfff', img: `${ASSET_URL}/colors/kia-nq5e-pe-yacht-blue.webp` },

];

export default function Personalize() {
    const sectionRef = useRef<HTMLElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // States
    const [viewMode, setViewMode] = useState<'color' | 'ext360' | 'int360'>('color');
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [isDragging, setIsDragging] = useState(false);
    const [frameIndex, setFrameIndex] = useState(0);
    const [showUI, setShowUI] = useState(true);
    const [panoOffset, setPanoOffset] = useState(0);

    // Refs for Dragging Logic
    const dragStartX = useRef(0);
    const dragStartFrame = useRef(0);
    const dragStartPanoOffset = useRef(0);

    // Refs for Preloaded Images 
    const extImages = useRef<HTMLImageElement[]>([]);

    // 1. تحميل صور الـ 360 الخارجي (Preloading)
    useEffect(() => {
        const totalFrames = 72;
        const extBaseUrl = `${ASSET_URL}/360/kia-nq5e-pe-ext360-`;

        for (let i = 0; i < totalFrames; i++) {
            const num = i.toString().padStart(2, '0');
            const extImg = new Image();
            extImg.crossOrigin = "anonymous";
            extImg.src = `${extBaseUrl}${num}.webp`;
            extImages.current.push(extImg);
        }
    }, []);

    // 2. رسم الصورة على الـ Canvas بناءً على الفريم الحالي للمود الخارجي
    useEffect(() => {
        if (viewMode !== 'ext360') return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const imgToDraw = extImages.current[frameIndex];

        const render = () => {
            if (!imgToDraw || !imgToDraw.complete) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ratio = Math.max(canvas.width / imgToDraw.width, canvas.height / imgToDraw.height);
            const cx = (canvas.width - imgToDraw.width * ratio) / 2;
            const cy = (canvas.height - imgToDraw.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height, cx, cy, imgToDraw.width * ratio, imgToDraw.height * ratio);
        };

        if (imgToDraw?.complete) {
            render();
        } else if (imgToDraw) {
            imgToDraw.onload = render;
        }
    }, [frameIndex, viewMode]);

    // 3. أنيميشن السكرول للبوكس
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(boxRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 40%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // 4. لوجيك سحب الماوس (Dragging) 
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (viewMode === 'color') return;
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        dragStartX.current = clientX;
        dragStartFrame.current = frameIndex;
        dragStartPanoOffset.current = panoOffset;
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || viewMode === 'color') return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - dragStartX.current;

        if (viewMode === 'ext360') {
            const framesToMove = Math.floor(deltaX / 10);
            let newFrame = (dragStartFrame.current + framesToMove) % 72; // reversed dragging logic
            if (newFrame < 0) newFrame += 72;
            setFrameIndex(newFrame);
        } else if (viewMode === 'int360') {
            // Pan interior panorama image
            setPanoOffset(dragStartPanoOffset.current + deltaX);
        }
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(false);
        if (e.type === 'mouseleave') return;

        let clientX = dragStartX.current;
        if ('changedTouches' in e && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
        } else if ('clientX' in e) {
            clientX = (e as React.MouseEvent).clientX;
        }

        // Toggle UI Box dynamically when clicking (delta < 5) on the 360 views
        if (Math.abs(clientX - dragStartX.current) < 5 && (viewMode === 'ext360' || viewMode === 'int360')) {
            setShowUI(!showUI);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="personalize"
            className="relative h-screen w-full bg-[#05141f] overflow-hidden select-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ cursor: viewMode !== 'color' ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >

            {/* --- طبقة العرض --- */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
                {/* 1. Colors - Full Viewport Crossfade */}
                {colors.map((color) => {
                    const isActive = viewMode === 'color' && selectedColor.id === color.id;
                    return (
                        <img
                            key={color.id}
                            src={color.img}
                            alt={color.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            style={{ transitionDelay: isActive ? '0ms' : '800ms' }}
                        />
                    );
                })}

                {/* 2. Exterior 360 Canvas */}
                <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${viewMode === 'ext360' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                ></canvas>

                {/* 3. Interior 360 Panoramic */}
                <div
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${viewMode === 'int360' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <ReactPhotoSphereViewer
                        src={`${ASSET_URL}/360/kia-nq5e-pe-interior360.jpg`}
                        height="100vh"
                        width="100%"
                        onClick={() => setShowUI(!showUI)}
                        navbar={false}
                    />
                </div>
            </div>

            {/* --- البوكس الزجاجي (UI Box) --- */}
            <div
                ref={boxRef}
                className="absolute top-1/2 right-6 md:right-20 -translate-y-1/2 z-20"
            >
                <div
                    className={`transition-all duration-500 ease-in-out ${!showUI ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100 translate-x-0'}`}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-[340px] shadow-2xl text-center">

                        <span className="block text-white/50 font-sans text-md uppercase tracking-[0.1em] text-left mb-1">Personalize</span>
                        <h2 className="text-white font-sans font-semibold text-2xl mb-8 text-left">Choose Your Color</h2>

                        {/* زراير الألوان */}
                        <div className="flex justify-center gap-2 mb-4">
                            {colors.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => {
                                        setViewMode('color');
                                        setSelectedColor(color);
                                    }}
                                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor.id === color.id && viewMode === 'color' ? 'scale-110 border-white' : 'border-transparent hover:border-white/50'}`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>

                        <p className="text-white font-sans text-lg mb-4 text-center">{selectedColor.name}</p>

                        <hr className="border-white/20 mb-5" />

                        {/* جزء الـ 360 */}
                        <div className="flex justify-center items-center gap-3 mb-6">
                            <RefreshCcw className="w-6 h-6 text-white" />
                            <span className="text-white font-sans font-medium text-2xl">360 View</span>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => { setViewMode('ext360'); setFrameIndex(0); setShowUI(true); }}
                                className={`flex-1 py-3 px-4 rounded-xl font-sans font-bold text-md transition-colors ${viewMode === 'ext360' ? 'bg-[#06141F] text-[#FFFFFF] border border-[#2a4059]' : 'bg-[#FFFFFF] text-[#06141F]-700 hover:text-[#FFFFFF] hover:bg-[#06141F] border border-transparent'}`}
                            >
                                Exterior
                            </button>
                            <button
                                onClick={() => { setViewMode('int360'); setShowUI(true); }}
                                className={`flex-1 py-3 px-4 rounded-xl font-sans font-bold text-md transition-colors ${viewMode === 'int360' ? 'bg-[#06141F] text-[#FFFFFF] border border-[#2a4059]' : 'bg-[#FFFFFF] text-[#06141F]-700 hover:text-[#FFFFFF] hover:bg-[#06141F] border border-transparent'}`}
                            >
                                Interior
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Hint overlay for clicking when UI is hidden */}
            {!showUI && (viewMode === 'ext360' || viewMode === 'int360') && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-sans pointer-events-none transition-opacity duration-500">
                    Click anywhere to show menu
                </div>
            )}

        </section>
    );
}