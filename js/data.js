/* ===== CONTENIDO EDITABLE =====  Todo es texto de EJEMPLO: reemplázalo por el real. */
window.DATA={
 frase:"Toda gran historia está llena de aventuras, encuentros y personas que dejan huella en el camino. Hoy preparamos este pequeño regalo para ti, como una forma de celebrar tu historia y recordarte lo especial que eres para quienes tenemos la suerte de compartir la vida contigo. Que tus 23 años sean el comienzo de un capítulo extraordinario.",
 // CARTAS: una por amiga. Cambia nombre, color y texto.
 cartas:[
  {de:"Fab",color:"#d9a521",texto:"[EJEMPLO] Querida Caro:\n\nEscribe aquí tu carta."},
  {de:"Lady",color:"#3aa0e8",texto:"[EJEMPLO] Querida Caro:\n\nEscribe aquí tu carta."},
  {de:"Meli",color:"#e07aa8",texto:"[EJEMPLO] Querida Caro:\n\nEscribe aquí tu carta."}],
 // RECUERDOS: orden cronológico. media: lista de FOTOS y/o VIDEOS, ej: [{tipo:"imagen",src:"assets/images/a.jpg"},{tipo:"video",src:"assets/videos/b.mp4",poster:"assets/images/b.jpg"}]. Agrega más objetos para más estrellas.
 recuerdos:[
  {fecha:"Febrero 2023",titulo:"[Ejemplo] Nos conocimos",texto:"Describe el recuerdo real.",media:[]},
  {fecha:"2023",titulo:"[Ejemplo] Recuerdo 2",texto:"Texto editable.",media:[]},
  {fecha:"2023",titulo:"[Ejemplo] Recuerdo 3",texto:"Texto editable.",media:[]},
  {fecha:"2024",titulo:"[Ejemplo] Recuerdo 4",texto:"Texto editable.",media:[]},
  {fecha:"2024",titulo:"[Ejemplo] Recuerdo 5",texto:"Texto editable.",media:[]},
  {fecha:"2025",titulo:"[Ejemplo] Recuerdo 6",texto:"Texto editable.",media:[]},
  {fecha:"2025",titulo:"[Ejemplo] Recuerdo 7",texto:"Texto editable.",media:[]},
  {fecha:"2026",titulo:"[Ejemplo] Recuerdo 8",texto:"Texto editable.",media:[]},
  {fecha:"Diciembre 2026",titulo:"[Ejemplo] Recuerdo 9",texto:"Texto editable.",media:[]}],
 musica:{texto:"La música fue una de las cosas que nos unió, Caro. Todavía recordamos con cariño a CNCO y a Christopher Vélez, y también compartimos el gusto por la música en general. Tantas canciones se quedaron pegadas a nuestros recuerdos que reunimos aquí algunas muy importantes para nosotras y otras que, simplemente, nos hacen acordar a ti.",
  // ENLACE DE SPOTIFY (solo botón externo, sin reproductor propio). Pega aquí tu playlist (cualquier enlace de "Compartir" de Spotify sirve, también el URI spotify:playlist:...)
  spotify:"",portada:"",artistas:["Christopher Vélez","Stray Kids","ATEEZ","CNCO"]} /* portada: "assets/images/playlist.jpg" */,
 // MENSAJES (~10): agrega o edita.
 mensajes:[{de:"Melongas",texto:"Mi pelonaaaaaa, ¡feliz cumple carito!, espero cumplas muchísimos años más, sabes que se te quiere muchísimo. Eres una persona increíble y solo mereces que te pasen cosas lindas, pasatela increíble, tqm 🤍"},
  {de:"Beberly",texto:"Carito happy birthdayyyyyy !!! espero que hoy te la pases rodeada de todas las personitas que te quieren, en este día tan especial te deseo todo lo mejor del mundo, que la pases increíble por qué eres una gran persona y cada paso que des te acerque a todos tus sueños, sigue siendo la pro que eres en los videogames 🫶🏻🤭 se te aprecia un monton 🎂🎂🎉 un abrazito 🫂"},
  {de:"Buhona",texto:"Carito! En este día tan especial, espero que la pases súper lindo, que la vida siga devolviéndote todo lo bueno que das, que sigas siendo esa chica tan feliz y ocurrente que eres y sigas alegrando nuestros días! Ya son 3 años de amistad y me enorgullece ver como cada una creció sin perder su esencia. Que Dios te regale mucho amor, paz y nunca cambie ese corazón tan lindo. Por muchas más aventuras y risas! Te mando un abrazo bien pelón, disfruta mucho tu día 🫶🏻🫶🏻🫶🏻"},
  {de:"Micarnala",textoo:"Mi peloncita drogona, sé que no somos las amigas súper hiper mega unidas, pero sé que sos de esas amigas que si se necesita de ella siempre está presente. Gracias por tantos años conociéndonos y siempre mantener la misma dulzura al hablar, sos un ser hermoso y espero que siempre seas feliz. Te deseo mil millones de buenos éxitos, salud, prosperidad y sobre todo, muchísimo amor. Que todos tus deseos se hagan 100% siempre realidad. Te adora con su vida, Micarnala💚"},
  {de:"Yuri",texto:"Pelona! Feliz cumpleaños! Gracias por ser la gran persona que eres y por tantas risas consejos 🤍 gracias que desde te conocí siempre estuviste para escuchar y aconsejarme cuando más necesite apoyo… pero más que nada y ante todo gracias por tu amistad 🫂 espero y pasaste tu cumple de lujo y con las personas que más te quieren 🤍 tkm pelona 🤍"},
],
 mensajeJunto:"[EJEMPLO] Nuestro mensaje conjunto para Caro: amistad desde 2023, locuras, bromas internas, deseos para sus 23...",
 video:{poster:"",src:""}, // ej: src:"assets/videos/recap.mp4", poster:"assets/images/portada.jpg"
 felicitacion:"Caro, si algo tenemos claro es que la vida es mucho más bonita desde que coincidimos contigo. Ojalá este nuevo capítulo te regale tantas alegrías como las que tú nos has dado. Nos quedan muchísimas partidas, risas, locuras y recuerdos por crear. ¡Felices 23! Te amamos muchísimo.",
 // CRÓNICAS: dragón que sobrevuela la línea de tiempo y esconde una sorpresa (js/cronicas.js)
 cronicas:{
  aviso:"¿Eso fue una sombra con alas sobre las crónicas? 👀",
  dragon:{
   src:"assets/dragon/dragon-volando.png", // ← PNG del dragón (vista cenital, fondo transparente). Cámbialo aquí si usas otro archivo.
   alt:"Un dragón sobrevuela las crónicas"},
  sorpresa:{
   dibujo:"assets/dibujo/dibujo-caro.png", // ← DIBUJO ORIGINAL de tu amiga: guarda el archivo con este nombre o cambia la ruta (png, jpg, webp…).
   provisional:"assets/dibujo/provisional.svg", // Se muestra SOLO si el archivo anterior no existe todavía.
   alt:"Dibujo hecho para Caro por una de sus amigas",
   autora:"", // opcional: pon el nombre de quien lo dibujó, ej. "Dibujo de Fab". Vacío = no se muestra.
   rotulo:"Hallazgo en las crónicas",
   titulo:"Un dragón guardaba esto para ti",
   texto:"Entre tantos tesoros que podría proteger un dragón de Basgiath, este tiene uno muy especial reservado para ti: un dibujo que Yane hizo con mucho cariño como parte de este pequeño regalo. Queríamos que tuvieras algo único, hecho especialmente para ti, que pudieras guardar y volver a ver siempre que quieras. Porque hay recuerdos que se escriben, otros que se cuentan y algunos que merecen convertirse en arte.",
   cerrar:"Volver a las crónicas"}},
 // CÁPSULA DEL TIEMPO (la guarda el dragón Chimuelo)
 capsula:{
  dialogo:"Alto, jinete. Has dado con una cámara sellada del Archivo de Basgiath. Aquí se guarda algo que tres compañeras prepararon especialmente para ti.",
  carta:"[EJEMPLO] Carta secreta de las tres.",
  deseos:["[EJEMPLO] Deseo de Amiga 1","[EJEMPLO] Deseo de Amiga 2","[EJEMPLO] Deseo de Amiga 3"],
  futuro:"[EJEMPLO] Mensaje sobre las aventuras que nos quedan.",
  media:"", // video o audio sorpresa opcional: "assets/videos/sorpresa.mp4"
  cierre:"Esto no es el final de nuestra historia. Todavía nos quedan muchísimas aventuras por vivir juntas."},
 // ZORRITO: frases editables. Los apodos van aquí como bromas.
 zorro:{
  clics:["¡Hola, Caro! 🦊","¡Hop! 🦊","¡Tiesona! 🦊","¡Hola, pelona! 🦊","¡Hola, Calienta Pizzas! 🦊","¡Hola, Carito! 🦊","¡Hola, Carito! 🦊","¡Hola, Carito! 🦊"],
  frases:["Soy Zelev, te acompañaré por los pasillos de Basgiath. 🦊","¡Caro, estas crónicas se escribieron para ti!","¡Psst! Hay tres cartas selladas esperándote.","¿Ya leíste todas las crónicas del Archivo?","No te vayas sin pasar por el Salón de los bardos 🎧","Tengo una sorpresa escondida para ti.","¡Feliz cumpleaños, Caro!","Tu historia en Basgiath apenas comienza.","Hola, Calienta Pizzas 🍕","Pelona, ¿ya viste al dragón sospechoso?","DT DT DT 😛","Carito me hable de usteee 🗣️"],
  pistas:["Creo que hay algo que todavía no has descubierto...","He visto una sombra con alas sobre las crónicas…","No puedo contarte el secreto, pero alguien con alas sabe dónde está."],
  seccion:{cartas:"¡Rompe los sellos de los sobres!",recuerdos:"Lee las crónicas ✨",musica:"Los bardos te esperan 🎧",musica:"A Caro le gusta la Gasolinaa 🗣️",mensajes:"Hay sobres sin remitente esperándote. 💌",final:"Último capítulo… ¡lo mejor viene ahora!"}}
};
