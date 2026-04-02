import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { themes, applyTheme, getStoredTheme } from "@/lib/themes";

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(getStoredTheme());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (id: string) => {
    applyTheme(id);
    setCurrent(id);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="h-9 w-9 text-muted-foreground hover:text-foreground"
        title="Đổi chủ đề"
      >
        <Palette className="w-4 h-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-popover p-2 shadow-xl animate-fade-in z-50">
          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Chủ đề
          </p>
          <div className="grid gap-1 mt-1">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  current === theme.id
                    ? "bg-primary/15 text-primary"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                <span className="text-base">{theme.icon}</span>
                <span>{theme.name.replace(theme.icon + " ", "")}</span>
                {current === theme.id && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
