import { useEffect, useState } from "react";
import { getStoredTheme } from "@/lib/themes";

/**
 * Inline SVG decorations for the search bar that change per theme.
 */
const ThemeSearchDecoration = () => {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getStoredTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10 transition-opacity duration-500">
      {theme === "sakura" && <SakuraSearchDeco />}
      {theme === "forest" && <ForestSearchDeco />}
      {theme === "ocean" && <OceanSearchDeco />}
      {theme === "romantic" && <RomanticSearchDeco />}
      {theme === "galaxy" && <GalaxySearchDeco />}
      {theme === "sunset" && <SunsetSearchDeco />}
      {theme === "racing" && <RacingSearchDeco />}
    </div>
  );
};

const SakuraSearchDeco = () => (
  <>
    {/* Petals inside search bar */}
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="absolute opacity-[0.2]"
        style={{
          width: "14px", height: "16px",
          right: `${100 + i * 50}px`, top: `${8 + (i % 2) * 20}px`,
          transform: `rotate(${i * 40}deg)`,
          animation: `float ${4 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }}
        viewBox="0 0 14 16">
        <ellipse cx="7" cy="6" rx="5" ry="7" fill="hsl(var(--primary))" />
      </svg>
    ))}
    {/* Branch on right edge */}
    <svg className="absolute right-2 top-0 h-full opacity-[0.12]" width="60" viewBox="0 0 60 60" preserveAspectRatio="xMaxYMid meet">
      <path d="M60 10 Q45 25 50 40 Q55 50 48 60" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
      <circle cx="48" cy="22" r="4" fill="hsl(var(--primary) / 0.3)" />
      <circle cx="52" cy="38" r="3" fill="hsl(var(--primary) / 0.25)" />
    </svg>
  </>
);

const ForestSearchDeco = () => (
  <>
    {/* Vine wrapping around top-left */}
    <svg className="absolute left-0 top-0 opacity-[0.15]" width="120" height="100%" viewBox="0 0 120 70" preserveAspectRatio="none">
      <path d="M0 35 Q20 10 40 25 Q60 40 80 20 Q100 5 120 15" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
      {[15, 45, 75].map((x, i) => (
        <ellipse key={i} cx={x} cy={i % 2 ? 18 : 32} rx="6" ry="4" fill="hsl(var(--primary) / 0.2)"
          transform={`rotate(${i * 20 - 10} ${x} ${i % 2 ? 18 : 32})`} />
      ))}
    </svg>
    {/* Small leaves on right */}
    <svg className="absolute right-14 top-1/2 -translate-y-1/2 opacity-[0.15]" width="30" height="30" viewBox="0 0 30 30">
      <ellipse cx="15" cy="10" rx="8" ry="5" fill="hsl(var(--primary) / 0.3)" transform="rotate(-20 15 10)" />
      <ellipse cx="18" cy="20" rx="6" ry="4" fill="hsl(var(--neon-green) / 0.25)" transform="rotate(15 18 20)" />
    </svg>
  </>
);

const OceanSearchDeco = () => (
  <>
    {/* Mini wave on bottom */}
    <svg className="absolute bottom-0 left-0 w-full opacity-[0.12]" height="12" viewBox="0 0 400 12" preserveAspectRatio="none">
      <path d="M0 8 Q50 2 100 8 T200 8 T300 8 T400 8 L400 12 L0 12Z" fill="hsl(var(--primary))" />
    </svg>
    {/* Bubbles */}
    {[...Array(4)].map((_, i) => (
      <div key={i} className="absolute rounded-full border border-primary/20"
        style={{
          width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
          right: `${80 + i * 35}px`, top: `${12 + (i % 2) * 16}px`,
          animation: `bubbleRise ${3 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }}
      />
    ))}
  </>
);

const RomanticSearchDeco = () => (
  <>
    {/* Sparkles */}
    {[...Array(6)].map((_, i) => (
      <svg key={i} className="absolute opacity-[0.2]"
        style={{
          width: "10px", height: "10px",
          left: `${30 + i * 60}px`, top: `${10 + (i % 3) * 14}px`,
          animation: `pulseGlow ${2 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }}
        viewBox="0 0 10 10">
        <path d="M5 0 L5.7 4.3 L10 5 L5.7 5.7 L5 10 L4.3 5.7 L0 5 L4.3 4.3Z" fill="hsl(var(--primary))" />
      </svg>
    ))}
  </>
);

const GalaxySearchDeco = () => (
  <>
    {/* Tiny stars */}
    {[...Array(8)].map((_, i) => (
      <div key={i} className="absolute rounded-full"
        style={{
          width: `${1 + i % 2}px`, height: `${1 + i % 2}px`,
          background: `hsl(var(--primary) / ${0.2 + (i % 3) * 0.1})`,
          boxShadow: `0 0 3px hsl(var(--primary) / 0.3)`,
          left: `${20 + i * 45}px`, top: `${15 + (i % 3) * 12}px`,
          animation: `pulseGlow ${1.5 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </>
);

const SunsetSearchDeco = () => (
  <>
    {/* Warm gradient strip on top */}
    <div className="absolute top-0 left-0 w-full h-[2px] opacity-[0.25]"
      style={{
        background: `linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)), transparent)`,
      }}
    />
    {/* Small cloud */}
    <div className="absolute right-20 top-2 w-16 h-4 rounded-full opacity-[0.1]"
      style={{
        background: "hsl(var(--accent))",
        animation: "float 8s ease-in-out infinite",
      }}
    />
  </>
);

const RacingSearchDeco = () => (
  <>
    {/* Speed accent lines */}
    {[...Array(3)].map((_, i) => (
      <div key={i} className="absolute h-[1px] opacity-[0.15]"
        style={{
          width: `${20 + i * 10}px`,
          background: `linear-gradient(90deg, hsl(var(--primary)), transparent)`,
          left: `${15 + i * 8}px`,
          top: `${18 + i * 12}px`,
        }}
      />
    ))}
    {/* Checkered tiny */}
    <div className="absolute right-16 top-1/2 -translate-y-1/2 w-6 h-6 opacity-[0.08]"
      style={{
        backgroundImage: `repeating-conic-gradient(hsl(var(--foreground)) 0% 25%, transparent 0% 50%)`,
        backgroundSize: "6px 6px",
      }}
    />
  </>
);

export default ThemeSearchDecoration;
