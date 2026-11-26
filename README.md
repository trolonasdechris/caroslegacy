# Chapter 23:A Hoard of Memories — edición Basgiath
Cómo iniciarlo: abre `index.html`, o sube la carpeta a GitHub Pages (Settings → Pages → rama main, raíz). Todo usa rutas relativas y no necesita backend.

**Todo el contenido se edita en `js/data.js`** (cartas, recuerdos, mensajes, playlist, video, cápsula, frases de Zelev).
- Recuerdos: `media:[{tipo:"imagen",src:"assets/images/a.jpg"},{tipo:"video",src:"assets/videos/b.mp4",poster:"assets/images/b.jpg"}]`
- Spotify: `musica.spotify` (cualquier enlace de Compartir). Es solo un botón externo; no hay reproductor propio.
- Portada de la playlist: `musica.portada`. Video final: `video.src` / `video.poster`.
- La estrella roja de las crónicas (cámara de Chimuelo) fue retirada; el contenido sigue en `DATA.capsula` y `js/dragon.js` queda inactivo. Para volver a ponerla, añade `<button id="secretStar">` dentro de `#constel`.
Estructura: `css/styles.css` (identidad visual), `js/main.js` (secciones), `js/extras.js` (escenas SVG, documentos, Zelev), `js/zorrito.js`, `js/dragon.js` (Chimuelo), `js/cronicas.js` (dragón volador y sorpresa).

## Mensajes (sección V)
Se muestran como sobres lacrados sin remitente; el autor y el texto solo aparecen al romper el sello. Agrega o quita mensajes en `DATA.mensajes` (`{de, texto}`): la cuadrícula se ajusta sola (5 por fila en computadora, 3 en tableta, 2 en móvil).

## Dragón secreto en las crónicas (sección III)
El dragón solo aparece y vuela mientras la sección «Crónicas del Archivo» está en pantalla (al salir desaparece; al volver reaparece). Al hacer clic se abre el dibujo; se puede cerrar y repetir tantas veces como se quiera.
Todo se configura en `js/data.js → DATA.cronicas`:
- `dragon.src`: PNG del dragón (vista cenital, fondo transparente). Ahora: `assets/dragon/dragon-volando.png`. Para cambiarlo, reemplaza el archivo o la ruta.
- `sorpresa.dibujo`: **dibujo original**. Guárdalo como `assets/dibujo/dibujo-caro.png` (o cambia la ruta, acepta png/jpg/webp). Mientras no exista, se muestra `assets/dibujo/provisional.svg` (marcado como "IMAGEN PROVISIONAL").
- `sorpresa.autora`, `rotulo`, `titulo`, `texto`, `cerrar`: textos de la ventana de sorpresa.
El dibujo no se carga ni se muestra hasta que Caro hace clic en el dragón.
