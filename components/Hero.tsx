"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const socials = [
  { href: "https://github.com/MateoMg06", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/in/mateo-mercado-german-5082bb358/", label: "LinkedIn", Icon: LinkedinIcon },
];

const words = ["Código", "Ideas", "Resultados"];

const d = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax suave del retrato siguiendo el mouse (solo puntero fino, sin reduced-motion)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      // Interpolación tipo resorte: se acerca un 8% al objetivo en cada frame
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (portraitRef.current)
        portraitRef.current.style.transform = `translate3d(${cx * 14}px, ${cy * 10}px, 0)`;
      if (cardRef.current)
        cardRef.current.style.transform = `translate3d(${cx * -22}px, ${cy * -16}px, 0)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="inicio" className="relative mx-auto max-w-6xl px-4 pt-28 sm:px-6 lg:pt-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10">
          <p className="eyebrow enter" style={d(1)}>Desarrollador Backend</p>

          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="enter block" style={d(2)}>Hola, soy</span>
            <span className="text-grad enter block pb-1" style={d(3)}>Mateo Mercado</span>
          </h1>

          <p className="enter mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/80" style={d(4)}>
            Construyo APIs limpias, seguras y escalables con Node.js, TypeScript y PostgreSQL.
            Siempre aprendiendo, siempre construyendo.
          </p>

          <div className="enter mt-8 flex flex-wrap gap-4" style={d(5)}>
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos <ArrowRight className="arrow size-4" />
            </a>
            <a href="#contacto" className="btn btn-ghost !rounded-xl">
              Contáctame
            </a>
          </div>

          <ul className="mt-9 flex gap-6">
            {socials.map(({ href, label, Icon }, i) => (
              <li key={label} className="enter" style={d(6 + i)}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="lift block text-white">
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Retrato con anillos neón: el anillo va detrás de la foto recortada, así los hombros lo cruzan */}
        <div className="enter relative mx-auto aspect-square w-full max-w-[460px]" style={d(3)}>
          <div ref={portraitRef} className="absolute inset-0 will-change-transform">
            <div className="absolute left-1/2 top-[46%] size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#3b6cff40_0%,#9b4dff22_45%,transparent_70%)] blur-xl" />
            <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
              <defs>
                <linearGradient id="ring-g" x1="0" x2="1" y1="0" y2="0">
                  <stop stopColor="#9b4dff" />
                  <stop offset="0.5" stopColor="#3b6cff" />
                  <stop offset="1" stopColor="#22b8ff" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="182" r="148" fill="none" stroke="url(#ring-g)" strokeWidth="3"
                style={{ filter: "drop-shadow(0 0 10px #3b6cff) drop-shadow(0 0 22px #9b4dff88)" }} />
              <g className="ring-spin" style={{ transformOrigin: "200px 182px" }}>
                <circle cx="200" cy="182" r="166" fill="none" stroke="#22b8ff" strokeWidth="2"
                  strokeDasharray="80 963" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px #22b8ff)" }} />
              </g>
            </svg>
            <Image
              src="/gato.webp"
              alt="Gato con traje, corbata roja y maletín"
              fill
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-contain"
            />
            <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
              <g className="ring-spin-rev" style={{ transformOrigin: "200px 182px" }}>
                <circle cx="200" cy="182" r="186" fill="none" stroke="#3b6cff" strokeOpacity="0.5" strokeWidth="1"
                  strokeDasharray="4 10 40 160" />
              </g>
            </svg>
          </div>

          <div ref={cardRef} className="absolute -right-2 top-[30%] hidden will-change-transform sm:block lg:-right-16">
            <div className="float panel rounded-lg px-6 py-4 text-lg leading-snug [clip-path:polygon(0_0,90%_0,100%_12%,100%_100%,10%_100%,0_88%)]">
              {words.map((w, i) => (
                <span key={w} className="cycle-word block" style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
