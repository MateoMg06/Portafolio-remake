# Portafolio remake

Portafolio personal de **Mateo Mercado**, desarrollador backend. Muestra mi perfil, stack y proyectos con una estética neón y animaciones.

**En vivo:** <https://portafolio-remake.vercel.app>

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- Animaciones con CSS e `IntersectionObserver`, sin librerías extra
- Respeta `prefers-reduced-motion`

## Desarrollo

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

## Build

```bash
npm run build
npm start
```

## CV

El CV se edita en `cv/cv.html` y se exporta a `public/cv.pdf`, que es el archivo del botón "Descargar CV".
Para regenerarlo en Windows (PowerShell):

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --no-pdf-header-footer `
  --print-to-pdf="$PWD\public\cv.pdf" "$PWD\cv\cv.html"
```

O ábrelo en el navegador e imprime como PDF (tamaño A4, sin márgenes, con gráficos de fondo).

## Contacto

- Correo: [mateomercado234@gmail.com](mailto:mateomercado234@gmail.com)
- GitHub: [@MateoMg06](https://github.com/MateoMg06)
- LinkedIn: [Mateo Mercado](https://www.linkedin.com/in/mateo-mercado-german-5082bb358/)
