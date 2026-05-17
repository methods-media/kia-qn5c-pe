import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, Zap, Fuel, Gauge, RefreshCw, Car } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const powertrainsData = [
    {
        id: "gamma",
        name: "Gamma II 1.5T-GDI",
        engine: "ICE",
        engineIcon: <Fuel className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        transmission: "8AT",
        transmissionIcon: <Settings className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        axle: "2WD/4WD",
        axleIcon: <Car className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        power: "200 ps",
        powerIcon: <Gauge className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        torque: "25.8 kgf.m",
        torqueIcon: <RefreshCw className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        isHEV: false
    },
    {
        id: "nu-mpi",
        name: "Nu PE 2.0 MPI",
        engine: "ICE",
        engineIcon: <Fuel className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        transmission: "6AT",
        transmissionIcon: <Settings className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        axle: "2WD",
        axleIcon: <Car className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        power: "159 ps",
        powerIcon: <Gauge className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        torque: "19.5 kgf.m",
        torqueIcon: <RefreshCw className="w-6 h-6 text-white/70 group-hover:text-red-500 transition-colors duration-300" />,
        isHEV: false
    },
    {
        id: "nu-hev",
        name: "Nu PE 2.0 GDI HEV",
        engine: "HEV",
        engineIcon: <Zap className="w-6 h-6 text-white/70 group-hover:text-[#c7ff00] transition-colors duration-300" />,
        transmission: "6AT",
        transmissionIcon: <Settings className="w-6 h-6 text-white/70 group-hover:text-[#c7ff00] transition-colors duration-300" />,
        axle: "2WD",
        axleIcon: <Car className="w-6 h-6 text-white/70 group-hover:text-[#c7ff00] transition-colors duration-300" />,
        power: "201 ps (comb)",
        powerIcon: <Gauge className="w-6 h-6 text-white/70 group-hover:text-[#c7ff00] transition-colors duration-300" />,
        torque: "35.7 kgf.m (comb)",
        torqueIcon: <RefreshCw className="w-6 h-6 text-white/70 group-hover:text-[#c7ff00] transition-colors duration-300" />,
        isHEV: true
    }
];

export default function Powertrains() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );

            gsap.fromTo(cardsRef.current,
                { y: 80, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="powertrains" className="py-16 bg-[#05141f] flex flex-col items-center justify-center relative overflow-hidden z-10">
            {/* Header */}
            <div ref={headerRef} className="w-full max-w-[1400px] mx-auto text-center mb-10 opacity-0 px-6">
                <h2 className="text-white font-sans text-4xl md:text-4xl font-bold mt-2">Drivetrain Variations</h2>
            </div>

            {/* Cards Container */}
            <div className="w-full max-w-[1400px] px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {powertrainsData.map((powertrain, index) => (
                    <div
                        key={powertrain.id}
                        ref={(el) => { if (el) cardsRef.current[index] = el; }}
                        className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 opacity-0 bg-black/20 border border-white/10
                            ${powertrain.isHEV
                                ? 'hover:border-[#c7ff00]/80 hover:bg-gradient-to-br hover:from-black/40 hover:to-black/20 hover:shadow-[0_0_40px_rgba(199,255,0,0.15)]'
                                : 'hover:border-red-500/80 hover:bg-black/40 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]'}`}
                    >
                        {/* Background Watermark Icon */}
                        <div className="absolute -bottom-6 -right-6 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                            {powertrain.isHEV ? (
                                <Zap className="w-56 h-56 text-[#c7ff00]" strokeWidth={1} />
                            ) : (
                                <Fuel className="w-56 h-56 text-red-500" strokeWidth={1} />
                            )}
                        </div>

                        {/* Glow Effect for HEV on hover only */}
                        {powertrain.isHEV && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-transparent group-hover:bg-[#c7ff00]/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 transition-colors duration-500"></div>
                        )}

                        <div className="relative z-10">
                            {/* Powertrain Title */}
                            <h3 className={`font-sans text-2xl md:text-3xl font-bold mb-8 transition-colors duration-300 text-white ${powertrain.isHEV ? 'group-hover:text-[#c7ff00]' : 'group-hover:text-red-500'}`}>
                                {powertrain.name}
                            </h3>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                                {/* Engine */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {powertrain.engineIcon}
                                        </div>
                                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Engine</span>
                                    </div>
                                    <span className="text-white font-sans text-lg font-medium pl-[52px]">{powertrain.engine}</span>
                                </div>

                                {/* Transmission */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {powertrain.transmissionIcon}
                                        </div>
                                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Transmission</span>
                                    </div>
                                    <span className="text-white font-sans text-lg font-medium pl-[52px]">{powertrain.transmission}</span>
                                </div>

                                {/* Axle Type */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {powertrain.axleIcon}
                                        </div>
                                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Axle Type</span>
                                    </div>
                                    <span className="text-white font-sans text-lg font-medium pl-[52px]">{powertrain.axle}</span>
                                </div>

                                {/* Power */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {powertrain.powerIcon}
                                        </div>
                                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Power</span>
                                    </div>
                                    <span className="text-white font-sans text-lg font-medium pl-[52px]">{powertrain.power}</span>
                                </div>

                                {/* Torque */}
                                <div className="flex flex-col gap-2 col-span-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {powertrain.torqueIcon}
                                        </div>
                                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Torque</span>
                                    </div>
                                    <span className="text-white font-sans text-lg font-medium pl-[52px]">{powertrain.torque}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
