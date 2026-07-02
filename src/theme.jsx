import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("beatit-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("beatit-theme", dark ? "dark" : "light");
  }, [dark]);

  return [dark, setDark];
}

export function ThemeToggle({ dark, setDark }) {
  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 text-sm font-black uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur transition hover:border-punch/50 dark:border-white/10 dark:bg-white/10 dark:text-white"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0.7, opacity: 0 }}
          >
            <Sun size={16} strokeWidth={2.8} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 60, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -60, scale: 0.7, opacity: 0 }}
          >
            <Moon size={16} strokeWidth={2.8} />
          </motion.span>
        )}
      </AnimatePresence>
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
