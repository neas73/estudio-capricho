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
| `css/trabajos.css` | Portfolio: filtros (chips y lista desplegable en celular), carrusel y tarjetas de proyectos. |
| `css/lightbox.css` | Ventana emergente con la imagen ampliada de cada trabajo. |
| `css/nosotros.css` | Presentación de las creadoras, principios y fotos. |
| `css/contacto.css` | Áreas, botón de WhatsApp y datos de contacto. |
| `css/footer.css` | Pie de página. |
| `js/nav.js` | Marca la sección activa en el menú y mantiene el menú flotante. |
| `js/hero-art.js` | Anima los círculos de la portada: se mueven con el mouse y con el scroll (se desactiva si la persona pidió reducir el movimiento). |
| `js/filtro-portfolio.js` | Filtra las tarjetas del portfolio por categoría (chips en escritorio, lista desplegable en celular; clic otra vez en la categoría activa quita el filtro). |
| `js/carrusel-trabajos.js` | Carrusel del portfolio: flechas, barra de progreso, teclado y deslizar con el dedo. |
| `js/lightbox-trabajos.js` | Abre cada trabajo en una ventana emergente, con navegación anterior/siguiente. |
| `js/contacto-whatsapp.js` | Actualiza el enlace de WhatsApp según el área elegida. |
| `assets/img/` | Logos (marrón para fondos claros, claro para fondo oscuro), fotos provisorias y favicon. |
| `googlede3e6abc9d643b8d.html` | Archivo de verificación de Google Search Console. No borrar: si se elimina, Google pierde la verificación. |
| `robots.txt`, `sitemap.xml` | Indicaciones para buscadores (Google). Contienen la dirección de la web. |
| `site.webmanifest` | Nombre e íconos para cuando alguien guarda la web en su celular. |
| `favicon.ico` | Ícono de la pestaña del navegador (blanco, sin fondo). Los PNG equivalentes están en `assets/img/favicon-*.png`. |

## Cómo editar

- **Colores y tipografías:** `css/base.css`, bloque `:root`.
- **Número de WhatsApp:** atributo `data-phone` del enlace `#wa-link` en `index.html`, y el `href` inicial del mismo enlace.
- **Fotos de proyectos:** reemplazá `assets/img/proyecto-1.jpg` a `proyecto-6.jpg` con el mismo nombre y formato JPG. Formato recomendado: horizontal 4:3 (por ejemplo 1200 × 900 px). Los nombres y descripciones de cada proyecto se editan en `index.html`.
- **Fotos del equipo:** reemplazá `assets/img/equipo-agustina.jpg` y `equipo-estefania.jpg` (mantené el nombre y el formato JPG). Formato recomendado: vertical 3:4 (por ejemplo 900 × 1200 px).
- **Textos provisorios:** están entre corchetes en `index.html` (nombres y descripciones de los proyectos).
- **Nuevo proyecto en el portfolio:** duplicar un `<article class="work-card">` y asignar un `data-category` existente.
- **Ícono de la pestaña:** `favicon.ico` y `assets/img/favicon-32.png`, `favicon-192.png` y `favicon-512.png` (letras "Cp." en blanco, sin fondo). Para cambiarlo, reemplazá esos archivos manteniendo el nombre.

## Metadata (SEO y vista previa al compartir)

Está en el `<head>` de `index.html`: título, descripción, etiquetas Open Graph y Twitter (la tarjeta que se ve al pegar el enlace en WhatsApp, Instagram o Facebook), datos estructurados (JSON-LD) y la imagen `assets/img/og-image.png` (cuadrada, 1200 × 1200 px, para que se vea completa en WhatsApp).

**Cuando cambie la dirección de la web** (por ejemplo, un dominio propio), reemplazá `https://neas73.github.io/estudio-capricho/` por la nueva en:

- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` y el bloque JSON-LD (`url`, `logo`, `image`).
- `robots.txt` y `sitemap.xml`.

Si cambia el teléfono, la ubicación o el Instagram, actualizá también el bloque JSON-LD.

## Publicación

Al ser un sitio estático, se publica tal cual en GitHub Pages, Cloudflare Pages, Netlify o Vercel: se sube la carpeta completa con `index.html` en la raíz.
