"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { Logo } from "./BrandIcons";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contacto", label: "Contacto" },
];

export default function Header() {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Sección visible → enlace activo
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // La barrita neón se desliza hasta el enlace activo (solo transform)
  useEffect(() => {
    const nav = navRef.current;
    const bar = barRef.current;
    const link = nav?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!nav || !bar || !link) return;
    const x = link.offsetLeft + link.offsetWidth / 2 - bar.offsetWidth / 2;
    bar.style.transform = `translateX(${x}px)`;
    bar.style.opacity = "1";
  }, [active]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-line bg-ink/75 backdrop-blur-lg" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="enter flex items-center gap-3 font-bold" style={{ "--i": 0 } as React.CSSProperties}>
          <Logo className="h-7 w-10" />
          <span className="text-[1.05rem]">Mateo Mercado</span>
        </a>

        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`enter px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                active === l.id ? "text-[#c58cff]" : "text-white/85 hover:text-white"
              }`}
              style={{ "--i": i + 1 } as React.CSSProperties}
              aria-current={active === l.id ? "page" : undefined}
            >
              {l.label}
            </a>
          ))}
          <span
            ref={barRef}
            aria-hidden
            className="absolute -bottom-1 left-0 h-[3px] w-10 rounded-full opacity-0 shadow-[0_0_12px_#3b6cff] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{ background: "var(--grad)" }}
          />
        </nav>

        <div className="flex items-center gap-2">
          <a href="/cv.pdf" download className="btn btn-ghost enter hidden !py-2.5 !rounded-xl sm:inline-flex" style={{ "--i": 6 } as React.CSSProperties}>
            <Download className="size-4" />
            Descargar CV
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`grid border-line bg-ink/95 backdrop-blur-lg transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          open ? "grid-rows-[1fr] border-b opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="overflow-hidden" aria-label="Móvil">
          <div className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`py-3 text-base ${active === l.id ? "text-[#c58cff]" : "text-white/85"}`}
              >
                {l.label}
              </a>
            ))}
            <a href="/cv.pdf" download className="btn btn-ghost my-3 justify-center">
              <Download className="size-4" /> Descargar CV
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
