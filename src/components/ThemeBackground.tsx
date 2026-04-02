import { useEffect, useState } from "react";
import { getStoredTheme } from "@/lib/themes";

/**
 * Full-page animated background decorations that change per theme.
 * Renders behind all content with pointer-events: none.
 */
const ThemeBackground = () => {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getStoredTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700">
      {theme === "gaming" && <GamingBg />}
      {theme === "racing" && <RacingBg />}
      {theme === "romantic" && <RomanticBg />}
      {theme === "sakura" && <SakuraBg />}
      {theme === "ocean" && <OceanBg />}
      {theme === "sunset" && <SunsetBg />}
      {theme === "forest" && <ForestBg />}
      {theme === "galaxy" && <GalaxyBg />}
    </div>
  );
};

/* ─── Gaming ─── */
const GamingBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Scan lines */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--neon-cyan) / 0.3) 2px, hsl(var(--neon-cyan) / 0.3) 4px)",
      backgroundSize: "100% 4px",
    }} />
    {/* Floating pixels */}
    {[...Array(12)].map((_, i) => (
      <div key={i} className="absolute w-1 h-1 bg-primary/40 rounded-sm"
        style={{
          left: `${8 + (i * 7.5) % 90}%`,
          top: `${5 + (i * 13) % 85}%`,
          animation: `float ${4 + (i % 3) * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Racing ─── */
const RacingBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Speed lines */}
    {[...Array(8)].map((_, i) => (
      <div key={i} className="absolute h-[1px] opacity-[0.08]"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)`,
          width: `${30 + (i * 10) % 50}%`,
          top: `${10 + i * 11}%`,
          left: `${(i * 15) % 40}%`,
          animation: `speedLine ${2 + i * 0.3}s linear infinite`,
          animationDelay: `${i * 0.4}s`,
        }}
      />
    ))}
    {/* Checkered corner */}
    <div className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.04]"
      style={{
        backgroundImage: `repeating-conic-gradient(hsl(var(--foreground)) 0% 25%, transparent 0% 50%)`,
        backgroundSize: "20px 20px",
      }}
    />
    {/* Tire marks */}
    <svg className="absolute bottom-20 left-10 opacity-[0.06]" width="200" height="60" viewBox="0 0 200 60">
      <path d="M0 30 Q50 10 100 30 T200 30" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeDasharray="8 4" />
      <path d="M0 40 Q50 20 100 40 T200 40" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="6 6" />
    </svg>
  </div>
);

/* ─── Romantic ─── */
const RomanticBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Bokeh circles */}
    {[...Array(15)].map((_, i) => (
      <div key={i} className="absolute rounded-full"
        style={{
          width: `${20 + (i * 7) % 60}px`,
          height: `${20 + (i * 7) % 60}px`,
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.06 + (i % 3) * 0.03}), transparent 70%)`,
          left: `${(i * 7.3) % 95}%`,
          top: `${(i * 11.7) % 90}%`,
          animation: `float ${5 + (i % 4) * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`,
        }}
      />
    ))}
    {/* Sparkle stars */}
    {[...Array(20)].map((_, i) => (
      <div key={`s${i}`} className="absolute"
        style={{
          left: `${(i * 5.1) % 96}%`,
          top: `${(i * 7.3) % 94}%`,
          animation: `pulseGlow ${3 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8">
          <path d="M4 0 L4.5 3.5 L8 4 L4.5 4.5 L4 8 L3.5 4.5 L0 4 L3.5 3.5Z"
            fill={`hsl(var(--primary) / ${0.15 + (i % 3) * 0.05})`} />
        </svg>
      </div>
    ))}
  </div>
);

/* ─── Sakura ─── */
const SakuraBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Falling petals */}
    {[...Array(18)].map((_, i) => (
      <div key={i} className="absolute"
        style={{
          left: `${(i * 5.7) % 100}%`,
          top: `-5%`,
          animation: `petalFall ${8 + (i % 5) * 2}s linear infinite`,
          animationDelay: `${i * 0.8}s`,
        }}
      >
        <svg width={`${10 + (i % 3) * 4}`} height={`${12 + (i % 3) * 4}`} viewBox="0 0 14 16"
          style={{ transform: `rotate(${i * 25}deg)` }}>
          <ellipse cx="7" cy="5" rx="5" ry="7" fill={`hsl(var(--primary) / ${0.1 + (i % 3) * 0.04})`}
            transform="rotate(-15 7 5)" />
          <ellipse cx="7" cy="5" rx="3" ry="5" fill={`hsl(var(--primary) / ${0.06 + (i % 3) * 0.02})`}
            transform="rotate(15 7 5)" />
        </svg>
      </div>
    ))}
    {/* Branch silhouette */}
    <svg className="absolute top-0 right-0 opacity-[0.06] w-80 h-64" viewBox="0 0 320 256">
      <path d="M320 0 Q280 60 250 80 Q220 100 200 140 Q260 90 280 70" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
      <path d="M250 80 Q230 90 220 120 M250 80 Q260 110 240 130" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
      <circle cx="220" cy="120" r="8" fill="hsl(var(--primary) / 0.15)" />
      <circle cx="240" cy="130" r="6" fill="hsl(var(--primary) / 0.12)" />
      <circle cx="280" cy="70" r="10" fill="hsl(var(--primary) / 0.1)" />
    </svg>
  </div>
);

/* ─── Ocean ─── */
const OceanBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Wave layers */}
    {[0, 1, 2].map((i) => (
      <svg key={i} className="absolute bottom-0 w-full opacity-[0.06]"
        style={{ height: `${60 + i * 30}px`, animation: `wave ${6 + i * 2}s ease-in-out infinite`, animationDelay: `${i * 1}s` }}
        viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d={`M0 ${30 + i * 5} Q360 ${10 - i * 5} 720 ${30 + i * 5} T1440 ${30 + i * 5} L1440 60 L0 60Z`}
          fill={`hsl(var(--primary) / ${0.15 - i * 0.03})`} />
      </svg>
    ))}
    {/* Bubbles */}
    {[...Array(10)].map((_, i) => (
      <div key={i} className="absolute rounded-full border"
        style={{
          width: `${6 + (i % 4) * 4}px`,
          height: `${6 + (i % 4) * 4}px`,
          borderColor: `hsl(var(--primary) / ${0.1 + (i % 3) * 0.03})`,
          left: `${10 + (i * 8.5) % 80}%`,
          bottom: `${5 + (i * 7) % 40}%`,
          animation: `bubbleRise ${5 + (i % 4) * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.6}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Sunset ─── */
const SunsetBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Sun glow */}
    <div className="absolute top-10 right-[15%] w-32 h-32 rounded-full opacity-[0.08]"
      style={{
        background: `radial-gradient(circle, hsl(var(--primary)), hsl(var(--primary) / 0.3), transparent 70%)`,
        animation: "pulseGlow 4s ease-in-out infinite",
      }}
    />
    {/* Sun rays */}
    {[...Array(8)].map((_, i) => (
      <div key={i} className="absolute top-[76px] right-[calc(15%+48px)] origin-center opacity-[0.04]"
        style={{
          width: "120px", height: "1px",
          background: `linear-gradient(90deg, hsl(var(--primary)), transparent)`,
          transform: `rotate(${i * 45}deg)`,
        }}
      />
    ))}
    {/* Warm clouds */}
    {[...Array(4)].map((_, i) => (
      <div key={`c${i}`} className="absolute rounded-full opacity-[0.04]"
        style={{
          width: `${100 + i * 40}px`, height: `${30 + i * 8}px`,
          background: `hsl(var(--accent))`,
          top: `${8 + i * 6}%`,
          left: `${5 + i * 22}%`,
          animation: `float ${10 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 2}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Forest ─── */
const ForestBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Vine/leaf patterns on edges */}
    <svg className="absolute top-0 left-0 opacity-[0.07] w-48 h-[400px]" viewBox="0 0 192 400">
      <path d="M0 0 Q30 80 20 160 Q10 240 25 320 Q35 380 20 400" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
      {[60, 130, 200, 270, 340].map((y, i) => (
        <g key={i}>
          <ellipse cx={20 + (i % 2 ? 15 : -5)} cy={y} rx="12" ry="8" fill={`hsl(var(--primary) / ${0.1 + i * 0.02})`}
            transform={`rotate(${i % 2 ? 30 : -30} ${20 + (i % 2 ? 15 : -5)} ${y})`} />
        </g>
      ))}
    </svg>
    {/* Fireflies */}
    {[...Array(14)].map((_, i) => (
      <div key={i} className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          background: `hsl(var(--neon-green) / ${0.2 + (i % 3) * 0.1})`,
          boxShadow: `0 0 6px hsl(var(--neon-green) / 0.3)`,
          left: `${(i * 7.2) % 92}%`,
          top: `${(i * 9.3) % 88}%`,
          animation: `float ${3 + (i % 4) * 1.5}s ease-in-out infinite, pulseGlow ${2 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Galaxy ─── */
const GalaxyBg = () => (
  <div className="absolute inset-0 animate-fade-in">
    {/* Nebula */}
    <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] opacity-[0.06] rounded-full blur-[80px]"
      style={{ background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))` }}
    />
    {/* Stars */}
    {[...Array(30)].map((_, i) => (
      <div key={i} className="absolute rounded-full"
        style={{
          width: `${1 + (i % 3)}px`,
          height: `${1 + (i % 3)}px`,
          background: `hsl(var(--foreground) / ${0.1 + (i % 4) * 0.05})`,
          left: `${(i * 3.3) % 97}%`,
          top: `${(i * 5.7) % 95}%`,
          animation: `pulseGlow ${2 + (i % 3) * 1.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
    {/* Shooting star */}
    <div className="absolute top-[15%] left-[60%] opacity-[0.1]"
      style={{ animation: "shootingStar 6s linear infinite 3s" }}>
      <div className="w-16 h-[1px]" style={{
        background: `linear-gradient(90deg, hsl(var(--primary)), transparent)`,
        transform: "rotate(-35deg)",
      }} />
    </div>
  </div>
);

export default ThemeBackground;
