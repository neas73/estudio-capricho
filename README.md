# Estudio Capricho — Landing

Sitio estático en HTML, CSS y JavaScript sin dependencias ni compilación.

## Cómo verlo en local

Desde esta carpeta, abrí una terminal y ejecutá una de estas opciones:

```bash
# Con Python
python -m http.server 8000

# Con Node
npx serve .
```

Luego abrí `http://localhost:8000` en el navegador.
Las fuentes (Raleway y Playfair Display) se cargan desde Google Fonts, por lo que se necesita conexión a internet.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Marcado semántico de toda la página, sin estilos ni scripts inline. |
| `css/base.css` | Variables (colores, tipografías, espaciado, radios), reset y utilidades compartidas (botones, etiquetas, marcador azul). |
| `css/header.css` | Menú flotante: logo, navegación e indicador de sección activa. |
| `css/hero.css` | Portada: título, botones, ilustración y franja de servicios. |
| `css/pilares.css` | Sección de los pilares. |
| `css/trabajos.css` | Portfolio: filtros, tarjetas e ilustraciones provisorias. |
| `css/nosotros.css` | Presentación de las creadoras, principios y fotos. |
| `css/contacto.css` | Áreas, botón de WhatsApp y datos de contacto. |
| `css/footer.css` | Pie de página. |
| `js/nav.js` | Marca la sección activa en el menú y mantiene el menú flotante. |
| `js/hero-art.js` | Anima los círculos de la portada: se mueven con el mouse y con el scroll (se desactiva si la persona pidió reducir el movimiento). |
| `js/filtro-portfolio.js` | Filtra las tarjetas del portfolio por categoría (clic otra vez en la categoría activa quita el filtro). |
| `js/contacto-whatsapp.js` | Actualiza el enlace de WhatsApp según el área elegida. |
| `assets/img/` | Logo en versión marrón (fondos claros) y versión clara (fondo oscuro). |

## Cómo editar

- **Colores y tipografías:** `css/base.css`, bloque `:root`.
- **Número de WhatsApp:** atributo `data-phone` del enlace `#wa-link` en `index.html`, y el `href` inicial del mismo enlace.
- **Textos provisorios:** están entre corchetes en `index.html` (nombres y descripciones de los proyectos).
- **Nuevo proyecto en el portfolio:** duplicar un `<article class="work-card">` y asignar un `data-category` existente.
- **Foto de cada integrante:** reemplazar el bloque `.team-portrait` por una imagen con `object-fit: cover`.

## Publicación

Al ser un sitio estático, se publica tal cual en GitHub Pages, Cloudflare Pages, Netlify o Vercel: se sube la carpeta completa con `index.html` en la raíz.
