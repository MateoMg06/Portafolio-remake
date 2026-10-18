import type { CSSProperties } from "react";
import {
  ArrowRight,
  Code2,
  Database,
  Film,
  Gem,
  GraduationCap,
  Mail,
  MapPin,
  Monitor,
  Server,
  Ship,
  Wrench,
  Zap,
} from "lucide-react";
import Background from "@/components/Background";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

const GITHUB_USER = "MateoMg06";
const GITHUB = `https://github.com/${GITHUB_USER}`;

// Stack tomado del README de perfil de GitHub
const skills = [
  { title: "Backend", Icon: Server, items: ["Node.js", "Express", "NestJS", "TypeScript", "JavaScript", "JWT"] },
  { title: "Bases de datos", Icon: Database, items: ["PostgreSQL", "SQL", "Sequelize", "TypeORM", "Supabase"] },
  { title: "Frontend", Icon: Monitor, items: ["React", "Vite", "Tailwind CSS", "HTML", "CSS"] },
  { title: "Herramientas", Icon: Wrench, items: ["Docker", "Git", "GitHub", "Postman", "Linux", "Swagger"] },
];

// Decoraciones de las tarjetas (se reparten en orden)
const arts = [
  <div key="orb" className="orb absolute -right-6 -top-10 size-44 rounded-full bg-[radial-gradient(circle,#9b4dff_0%,#3b6cff55_40%,transparent_70%)] opacity-70 blur-md" />,
  <svg key="arc" viewBox="0 0 220 140" className="absolute inset-0 size-full" fill="none">
    <g className="ring-spin" style={{ transformOrigin: "170px 120px" }}>
      <circle cx="170" cy="120" r="80" stroke="#22b8ff" strokeWidth="2" strokeDasharray="120 383"
        strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px #22b8ff)" }} />
    </g>
    <circle cx="170" cy="120" r="80" stroke="#9b4dff" strokeOpacity="0.35" />
  </svg>,
  <div key="grid" className="float absolute right-6 top-6 grid grid-cols-3 gap-1 drop-shadow-[0_0_14px_#1d8cff]">
    {Array.from({ length: 6 }).map((_, i) => (
      <span key={i} className="blink size-4 rounded-[3px] bg-[#1d8cff]" style={{ animationDelay: `${i * 0.3}s` }} />
    ))}
  </div>,
];

// Los mismos proyectos que muestra el README de perfil de GitHub
const projects = [
  {
    title: "Riwi TV",
    description:
      "API REST para una plataforma de gestión de cines: usuarios y autenticación, países, departamentos y ciudades, cines, películas y funciones.",
    flow: "Routes → Middlewares → Controllers → Services → Repositories → Sequelize → PostgreSQL",
    extras: "Sequelize · JWT · Swagger / OpenAPI",
    tags: ["Node.js", "TypeScript", "Express", "PostgreSQL", "Docker"],
    href: `${GITHUB}/RIWI-TV-PUBLIC`,
    icon: <Film className="size-6" />,
  },
  {
    title: "Smile and Wave Charters",
    description:
      "Marketplace full-stack de yates: autenticación, publicaciones, almacenamiento de imágenes, panel de administración, campañas, cupones, verificación de email y recuperación de contraseña.",
    flow: "Routes → Controllers → Services → Repositories → PostgreSQL",
    extras: "JWT · Cookies · Supabase Storage · Resend",
    tags: ["React", "Vite", "Express", "PostgreSQL", "Supabase"],
    demo: "https://swcharters.vercel.app",
    icon: <Ship className="size-6" />,
  },
  {
    title: "Glam Studio Catalog",
    description:
      "Catálogo de productos con categorías, marcas, productos y gestión de precios. Incluye migraciones y seeders de base de datos.",
    tags: ["Node.js", "PostgreSQL"],
    href: "https://github.com/SglamStudio/SglamStudioRepo",
    demo: "https://sglam-studio.vercel.app",
    icon: <Gem className="size-6" />,
  },
  {
    title: "VC Energía",
    description: "Landing page corporativa con formulario de contacto protegido.",
    extras: "EmailJS · Google reCAPTCHA",
    tags: ["Vite", "TypeScript", "Tailwind CSS"],
    demo: "https://www.venecomllc.com/",
    icon: <Zap className="size-6" />,
  },
];

const contacts = [
  // TODO: reemplazar el correo por el real
  { href: "mailto:mateomercado@email.com", label: "mateomercado@email.com", Icon: Mail },
  {
    href: "https://www.linkedin.com/in/mateo-mercado-german-5082bb358/",
    label: "linkedin.com/in/mateo-mercado-german",
    Icon: LinkedinIcon,
  },
  { href: GITHUB, label: `github.com/${GITHUB_USER}`, Icon: GithubIcon },
];

// Número de repos públicos, actualizado desde la API de GitHub una vez al día
async function getRepoCount(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data: { public_repos?: number } = await res.json();
    return data.public_repos ?? null;
  } catch {
    return null;
  }
}

const cut = "[clip-path:polygon(0_0,calc(100%-24px)_0,100%_24px,100%_100%,24px_100%,0_calc(100%-24px))]";

export default async function Home() {
  const repoCount = await getRepoCount();

  return (
    <>
      <Background />
      <Header />

      <main>
        <Hero />

        {/* Sobre mí + Habilidades */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.9fr_1fr]">
          <Reveal as="section" className={`panel panel-scan rounded-2xl p-7 sm:p-9 ${cut}`}>
            <div id="sobre-mi" className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div>
                <p className="eyebrow">Sobre mí</p>
                <h2 className="mt-4 text-3xl font-bold leading-tight">
                  Construyendo
                  <br /> mi futuro con <span className="text-grad">código</span>
                </h2>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-white/80">
                  Soy estudiante de desarrollo de software en Riwi y me enfoco en el backend: APIs REST con
                  Node.js, Express y NestJS, arquitectura por capas y bases de datos relacionales con
                  PostgreSQL. Ahora mismo profundizo en arquitectura de software, testing y DevOps.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm">
                  <li className="flex items-center gap-2"><MapPin className="size-4 text-violet" /> Colombia</li>
                  <li className="flex items-center gap-2"><GraduationCap className="size-4 text-violet" /> Estudiante en Riwi</li>
                  <li className="flex items-center gap-2"><Zap className="size-4 text-violet" /> Siempre aprendiendo</li>
                </ul>
              </div>

              <Reveal i={2}>
                <div className={`panel float rounded-xl p-7 ${cut}`}>
                  <Code2 className="mx-auto size-10 text-violet drop-shadow-[0_0_10px_#9b4dff]" />
                  <blockquote className="mt-5 text-sm italic leading-relaxed text-[#8fc8ff]">
                    “La tecnología no solo se trata de escribir código, sino de construir soluciones que mejoren
                    la vida de las personas.”
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </Reveal>

          <Reveal as="section" i={1} className="panel rounded-2xl p-7">
            <div id="habilidades">
              <p className="eyebrow">Habilidades</p>
              <ul className="mt-6 space-y-7">
                {skills.map(({ title, Icon, items }, g) => (
                  <Reveal as="li" key={title} i={g + 2} className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-[#140f3a] text-violet">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-white/80">
                        {items.map((s) => (
                          <li key={s} className="flex items-center gap-1.5">
                            <span className="size-1 rounded-full bg-violet" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Proyectos */}
        <section id="proyectos" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Proyectos</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Algunos de mis <span className="text-grad">trabajos</span>
              </h2>
            </div>
            <a href={`${GITHUB}?tab=repositories`} target="_blank" rel="noreferrer"
              className="nudge flex items-center gap-2 text-sm text-[#8fb4ff]">
              {repoCount ? `Ver mis ${repoCount} repositorios en GitHub` : "Ver todos los proyectos"}
              <ArrowRight className="arrow size-4 text-violet transition-transform duration-200" />
            </a>
          </Reveal>

          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.title} i={i % 2}>
                <ProjectCard {...p} art={arts[i % arts.length]} />
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Contacto */}
        <Reveal as="section" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div id="contacto" className={`panel panel-scan grid gap-8 rounded-2xl p-7 sm:p-9 md:grid-cols-[1fr_1.1fr_auto] md:items-center ${cut}`}>
            <div>
              <p className="eyebrow">Contacto</p>
              <h2 className="text-grad mt-2 text-3xl font-bold">Hablemos</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                ¿Tienes un proyecto en mente o solo quieres conversar? Será un gusto conectar contigo.
              </p>
            </div>

            <ul className="space-y-4 border-line md:border-x md:px-10">
              {contacts.map(({ href, label, Icon }, i) => (
                <Reveal as="li" key={label} i={i + 1}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="nudge flex items-center gap-4 text-sm text-white/85 transition-colors duration-200 hover:text-white">
                    <Icon className="size-5 shrink-0 text-[#8fc8ff]" />
                    <span className="arrow break-all">{label}</span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <a href="#inicio" className="nudge panel group block rounded-xl px-8 py-6 text-sm text-[#5fd0ff] [clip-path:polygon(12%_0,100%_0,100%_100%,12%_100%,0_50%)] md:pl-12">
              ¡Gracias por visitar
              <br /> mi portafolio!
              <ArrowRight className="arrow ml-auto mt-3 block size-4 text-violet" />
            </a>
          </div>
        </Reveal>
      </main>

      <footer className="relative mx-auto mt-16 flex max-w-6xl items-center justify-center px-4 pb-10 text-xs text-[#6f7dc4] sm:px-6">
        <p>© {new Date().getFullYear()} Mateo Mercado. Todos los derechos reservados.</p>
        <span className="absolute right-6 hidden gap-1 sm:flex" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="blink h-3.5 w-1.5 -skew-x-[25deg] bg-gradient-to-b from-cyan to-violet"
              style={{ animationDelay: `${i * 0.2}s` } as CSSProperties} />
          ))}
        </span>
      </footer>
    </>
  );
}
