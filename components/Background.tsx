// Fondo fijo: rejilla que se desplaza, luces que flotan y líneas neón en las esquinas.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="bg-grid absolute inset-0" />
      <div className="orb absolute -left-40 top-[-10%] size-[520px] rounded-full bg-[#3b6cff]/15 blur-[120px]" />
      <div className="orb absolute -right-40 top-[30%] size-[480px] rounded-full bg-[#9b4dff]/12 blur-[120px] [animation-delay:-9s]" />

      <svg className="absolute left-0 top-0 h-40 w-72" viewBox="0 0 288 160" fill="none">
        <path className="draw" pathLength={1} d="M0 76 L76 0" stroke="#9b4dff" strokeWidth="2" />
        <path className="draw" pathLength={1} d="M0 76 H90 L104 62 H288" stroke="#3b6cff" strokeOpacity="0.5" />
        <path className="pulse-line" pathLength={1} d="M0 76 H90 L104 62 H288" stroke="#22b8ff" strokeWidth="2" />
      </svg>

      <svg className="absolute right-0 top-0 h-40 w-72" viewBox="0 0 288 160" fill="none">
        <path className="draw" pathLength={1} d="M288 20 L240 70" stroke="#22b8ff" strokeWidth="2" />
        <path className="draw" pathLength={1} d="M0 70 H200 L214 56 H288" stroke="#3b6cff" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}
