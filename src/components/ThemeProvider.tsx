import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Appearance = "system" | "light" | "dark";
const ThemeContext = createContext<{ appearance: Appearance; isDark: boolean; setAppearance: (value: Appearance) => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>(() => {
    try { const saved = localStorage.getItem("grain.appearance"); return saved === "light" || saved === "dark" ? saved : "system"; }
    catch { return "system"; }
  });
  const [systemDark, setSystemDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);
  const isDark = appearance === "dark" || (appearance === "system" && systemDark);
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    try { localStorage.setItem("grain.appearance", appearance); } catch {}
  }, [appearance, isDark]);
  return <ThemeContext.Provider value={{ appearance, isDark, setAppearance }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("GRAIN theme controls require ThemeProvider");
  return theme;
}

export function ThemeControl() {
  const { appearance, setAppearance } = useTheme();
  const Icon = appearance === "system" ? Monitor : appearance === "dark" ? Moon : Sun;
  return <div className="grain-theme-control">
    <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
    <select value={appearance} aria-label="Color appearance" title="Appearance" onChange={event => setAppearance(event.target.value as Appearance)}>
      <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
    </select>
  </div>;
}
