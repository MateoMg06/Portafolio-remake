"use client";

import type { PointerEvent, ReactNode } from "react";
import { ArrowRight, ExternalLink, Lock } from "lucide-react";

type Props = {
  title: string;
  description: string;
  tags: string[];
  /** Repositorio público (si es privado se omite) */
  href?: string;
  demo?: string;
  /** Flujo de capas, p. ej. "Routes → Services → PostgreSQL" */
  flow?: string;
  extras?: string;
  icon: ReactNode;
  art: ReactNode;
};

export default function ProjectCard({ title, description, tags, href, demo, flow, extras, icon, art }: Props) {
  // Enlace principal: el repo si es público; si no, la demo
  const main = href ?? demo;
  // El foco de luz sigue al cursor (la variable vive en la propia tarjeta)
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <article
      onPointerMove={onMove}
      className="card panel group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-36 w-56" aria-hidden>
        {art}
      </div>

      <div className="relative grid size-14 place-items-center rounded-xl border border-line bg-[#0b1638] text-cyan">
        {icon}
      </div>

      <h3 className="relative mt-6 text-lg font-bold">
        {main ? (
          // El enlace se estira sobre toda la tarjeta
          <a href={main} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">{description}</p>

      {flow && (
        <p className="relative mt-4 w-fit max-w-full rounded-md border border-line bg-[#060b1d] px-3 py-2 font-mono text-[0.68rem] leading-relaxed text-[#8fc8ff]">
          {flow}
        </p>
      )}
      {extras && <p className="relative mt-3 text-xs text-white/55">{extras}</p>}
      {!href && (
        <p className="relative mt-3 flex items-center gap-1.5 text-xs text-white/45">
          <Lock className="size-3.5" /> Código en repositorio privado
        </p>
      )}

      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className="relative z-[2] mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-cyan hover:underline"
        >
          <ExternalLink className="size-3.5" /> Ver demo en vivo
        </a>
      )}

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
        {main && (
          <span className="go grid size-8 shrink-0 place-items-center rounded-full border border-white/40" aria-hidden>
            <ArrowRight className="size-4" />
          </span>
        )}
      </div>
    </article>
  );
}
