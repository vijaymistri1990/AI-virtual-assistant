import { useState } from "react";
import { Mic } from "lucide-react";

const themes = {
  dark: {
    bg: "bg-[#0B1120]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1),transparent_45%)]",
    orb: "from-purple-400 via-violet-400 to-emerald-400",
    cardBorder: "border border-white/10",
    text: "text-white",
    sub: "text-white/65",
    listening: "text-emerald-400",
    wave: "bg-emerald-400",
    button: "from-purple-500 to-violet-400",
    micGlow: "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
  },
  light: {
    bg: "bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_45%)]",
    orb: "from-blue-300 via-cyan-300 to-pink-300",
    cardBorder: "border border-[#dbeafe]",
    text: "text-[#081028]",
    sub: "text-[#475569]",
    listening: "text-blue-500",
    wave: "bg-blue-500",
    button: "from-blue-500 to-cyan-500",
    micGlow: "shadow-[0_0_60px_rgba(59,130,246,0.35)]",
  },
  glass: {
    bg: "bg-black/20 backdrop-blur-[45px]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]",
    orb: "from-cyan-200 via-violet-300 to-fuchsia-300",
    cardBorder: "border border-white/10",
    text: "text-white",
    sub: "text-white/70",
    listening: "text-fuchsia-400",
    wave: "bg-fuchsia-400",
    button: "from-cyan-400 to-violet-500",
    micGlow: "shadow-[0_0_60px_rgba(192,132,252,0.45)]",
  },
  neon: {
    bg: "bg-[#03120d]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]",
    orb: "from-emerald-300 via-green-400 to-cyan-400",
    cardBorder: "border border-emerald-400/20",
    text: "text-emerald-50",
    sub: "text-emerald-100/70",
    listening: "text-emerald-300",
    wave: "bg-emerald-300",
    button: "from-emerald-400 to-green-500",
    micGlow: "shadow-[0_0_70px_rgba(16,185,129,0.45)]",
  },
};

const AssistantPreview = () => {
    const [theme,setTheme]= useState('dark')
    const current = themes[theme]
  return (
    <div className='flex items-center justify-center px-3 sm:px-4 py-10 sm:py-14'>
      <div className={`relative w-70 h-112.5 sm:w-82.5 sm:h-125 md:w-95 md:h-137.5 rounded-4xl sm:rounded-[42px] overflow-hidden transition-all duration-500 ${current.bg} ${current.cardBorder} shadow-[0_20px_80px_rgba(0,0,0,0.28)]`}>
        <div className={`absolute inset-0 ${current.overlay}`}/>
        <div className='absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2'>
          <button onClick={() => setTheme("dark")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#050816] border transition-all cursor-pointer ${
            theme === "dark"
              ? "border-purple-400 scale-110"
              : "border-white/20"
          }`}/>
          <button onClick={() => setTheme("light")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border transition-all cursor-pointer ${
            theme === "light"
              ? "border-blue-400 scale-110"
              : "border-black/20"
          }`}/>
          <button onClick={() => setTheme("glass")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/30 border transition-all cursor-pointer ${
            theme === "glass"
              ? "border-white scale-110"
              : "border-white/20"
          }`}/>
          <button onClick={() => setTheme("neon")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-400 border transition-all cursor-pointer ${
            theme === "neon"
              ? "border-emerald-300 scale-110"
              : "border-white/20"
          }`}/>
        </div>

        <div className='relative z-20 flex flex-col items-center justify-between h-full px-5 py-6 sm:px-7 sm:py-8'>
          {/* Orb */}
          <div className='relative mt-4 sm:mt-6'>
            <div className={`absolute inset-0 scale-[2] rounded-full blur-[80px] bg-linear-to-r ${current.orb} opacity-60`}/>
            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-linear-to-br ${current.orb} shadow-[0_0_120px_rgba(255,255,255,0.15)] animate-pulse before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:blur-xl`}/>
          </div>
          
          {/* Text */}
          <div className='text-center mt-6'>
            <h2 className={`text-[20px] sm:text-[26px] md:text-[32px] font-semibold ${current.text}`}>
              Hello! I'm Sana AI
            </h2>
            <p className={`mt-3 sm:mt-4 text-[13px] sm:text-[15px] md:text-[16px] leading-6 sm:leading-7 max-w-70 mx-auto ${current.sub}`}>
              Your smart voice assistant.
              <br />
              Ask anything about your website.
            </p>
          </div>

          {/* Listening Animation */}
          <div className='flex flex-col items-center gap-3 mt-8'>
            <span className={`text-sm font-medium ${current.listening}`}>
              Listening...
            </span>
            <div className='flex items-center gap-1.5 h-6'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full ${current.wave} animate-pulse`}
                  style={{
                    height: i % 2 === 0 ? '16px' : i === 3 ? '24px' : '10px',
                    animationDelay: `${i * 150}ms`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mic Button */}
          <div className='mt-8 mb-2 sm:mb-4'>
            <button className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-linear-to-r ${current.button} ${current.micGlow} hover:scale-105 transition-all duration-300`}>
              <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPreview;