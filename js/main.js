const $d=document,$=s=>$d.querySelector(s),D=DATA,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const pad=n=>String(n).padStart(3,'0');
/* Brasas ambientales (discretas) */
const cv=$('#sky'),cx=cv.getContext('2d');let E=[];
const mk=r=>({x:Math.random()*cv.width,y:r?Math.random()*cv.height:cv.height+10,s:Math.random()*1.8+.6,v:Math.random()*.5+.2,p:Math.random()*6,w:Math.random()*.6+.2});
function rs(){cv.width=innerWidth;cv.height=innerHeight;E=Array.from({length:30},()=>mk(true))}
function dr(t){cx.clearRect(0,0,cv.width,cv.height);E.forEach((e,i)=>{e.y-=e.v;e.x+=Math.sin(t/1800+e.p)*e.w;if(e.y<-10)E[i]=mk();cx.globalAlpha=.25+.45*Math.abs(Math.sin(t/700+e.p));cx.fillStyle=e.s>1.8?'#ffb35a':'#d9542a';cx.beginPath();cx.arc(e.x,e.y,e.s,0,7);cx.fill()});if(!rm)requestAnimationFrame(dr)}
addEventListener('resize',rs);rs();requestAnimationFrame(dr);
/* Modal */
let onClose=null,go=null;
window.openModal=(html,cb)=>{go=null;$('#modalBody').innerHTML=html;$('#modal').hidden=false;onClose=cb;$('.card').scrollTop=0};
function closeModal(){$('#modal').hidden=true;$('#modalBody').innerHTML='';go=null;if(onClose)onClose();onClose=null}
const show=(html,fn)=>{if($('#modal').hidden)openModal(html);else{$('#modalBody').innerHTML=html;$('.card').scrollTop=0}go=fn};
const navBar=(i,n)=>n>1?`<div class="mnav"><button class="btn ghost" data-go="${(i+n-1)%n}">Anterior</button><span>${i+1} / ${n}</span><button class="btn ghost" data-go="${(i+1)%n}">Siguiente</button></div>`:'';
$('#close').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
$('#modalBody').addEventListener('click',e=>{if(e.target.closest('[data-close]'))return closeModal();const b=e.target.closest('[data-go]');if(b&&go)go(+b.dataset.go)});
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(!$('#modal').hidden&&go){if(e.key==='ArrowRight')$('#modalBody [data-go]:last-of-type')?.click();if(e.key==='ArrowLeft')$('#modalBody [data-go]')?.click()}});
/* I · Portada */
$('#frase').textContent='«'+D.frase+'»';
$('#start').onclick=()=>{$('#universo').classList.add('show');$('#cartas').scrollIntoView({behavior:rm?'auto':'smooth'});say('¡Caro, estas crónicas se escribieron para ti!')};
setTimeout(()=>say('¡Hola! Soy Zelev, el zorrito de Caro en Basgiath 🦊'),1200);
/* II · Cartas */
D.cartas.forEach((c,i)=>{const b=document.createElement('button');b.className='env';b.style.setProperty('--c',c.color);b.setAttribute('aria-label','Abrir la carta de '+c.de);
 b.innerHTML=`<i class="ef"></i><span class="seal"><b></b><b></b><svg viewBox="0 0 24 24"><use href="#st"/></svg></span><span class="tag"><small>N.º ${pad(i+1)} · Confidencial</small>De: ${c.de}</span>`;
 b.onclick=()=>openLetter(i);$('#sobres').appendChild(b)});
function openLetter(i){const c=D.cartas[i];show(`<p class="kick">Correspondencia N.º ${pad(i+1)} · Confidencial</p><h3>De: ${c.de}</h3>${paper(c.texto,c.color)}${navBar(i,D.cartas.length)}<button class="btn" data-close>Guardar la carta</button>`,openLetter);say('Qué bonito 💜 Guárdala bien en el Archivo.')}
/* III · Crónicas del Archivo (línea de tiempo): registro de acontecimientos de Basgiath */
const thumb=r=>{const m=(r.media||[])[0];if(!m)return'<span class="ph ph0"><svg viewBox="0 0 24 24"><use href="#st"/></svg></span>';
 if(m.tipo==='video')return`<span class="ph vph">${m.poster?`<img loading="lazy" src="${m.poster}" alt="">`:''}</span>`;return`<span class="ph"><img loading="lazy" src="${m.src}" alt="${m.alt||''}"></span>`};
const ROM=['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
(function(){const box=$('#constel');let yr='',libro=0;
 box.insertAdjacentHTML('afterbegin','<p class="reg-ini rv"><span>Se abre el registro</span></p>');
 const end=$d.createElement('p');end.className='reg-fin rv';end.innerHTML='<span>El registro continúa…</span>';
 D.recuerdos.forEach((r,i)=>{const y=(r.fecha.match(/\d{4}/)||[''])[0];if(y!==yr){yr=y;libro++;box.insertAdjacentHTML('beforeend',`<div class="year rv"><small>Libro ${ROM[libro]||libro}</small><span>${y}</span></div>`)}
  box.insertAdjacentHTML('beforeend',`<article class="mem rv ${i%2?'r':'l'} v${i%3}" style="--rot:${[-1.6,1.2,-.8,1.8][i%4]}deg;--w:${[300,340,280,320][i%4]}px;--ar:${['4/3','16/10','4/3','3/2'][i%4]}"><button class="node" data-i="${i}" aria-label="Crónica N.º ${pad(i+1)}: ${r.titulo}"><span class="wax"><svg viewBox="0 0 24 24"><use href="#st"/></svg></span></button><button class="pol" data-i="${i}"><span class="fol"><i>Crónica N.º ${pad(i+1)}</i><em>Archivo de Basgiath</em></span>${thumb(r)}<span class="cap"><time>${r.fecha}</time><b>${r.titulo}</b></span></button></article>`)});
 box.appendChild(end);
 box.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const r=b.getBoundingClientRect();sparks(r.left+r.width/2,r.top);openMemory(+b.dataset.i)})})();
function openMemory(i){const r=D.recuerdos[i];show(`<p class="kick">Crónica N.º ${pad(i+1)} · Archivo de Basgiath</p><time class="date">${r.fecha}</time><h3>${r.titulo}</h3><p>${r.texto}</p>${mediaHTML(r.media)}${navBar(i,D.recuerdos.length)}`,openMemory);say('¡Una crónica más para el Archivo! ✨')}
/* IV · Salón de los bardos: solo enlace externo a Spotify (sin reproductor propio) */
$('#musicaTxt').textContent=D.musica.texto;
$('#artistas').innerHTML=(D.musica.artistas||[]).map(a=>`<li>${a}</li>`).join('');
$('#cover').innerHTML=(D.musica.portada?`<img loading="lazy" src="${D.musica.portada}" alt="Portada de la playlist">`:'<div class="ph1"><svg viewBox="0 0 24 24"><use href="#st"/></svg></div>')+'<figcaption>Nuestro cancionero</figcaption>';
const sp=(D.musica.spotify||D.musica.spotifyEmbed||'').trim(),mt=sp.match(/(playlist|album|track|artist|show|episode)[\/:]([A-Za-z0-9]+)/);
const url=mt?`https://open.spotify.com/${mt[1]}/${mt[2]}`:/^https?:\/\//.test(sp)?sp:'';
const SPI='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5"/><path d="M6 9.2c4-1.2 8-1 12 1M6.8 12.7c3.4-.9 6.6-.7 9.8 1M7.6 16c2.8-.6 5.4-.4 8 .8"/></svg>';
$('#spotify').innerHTML=url?`<a class="spbtn" href="${url}" target="_blank" rel="noopener">${SPI}Escuchar la banda sonora</a>`:`<span class="spbtn off" aria-disabled="true">${SPI}Escuchar la banda sonora</span><p class="nota">[Pega el enlace de tu playlist en js/data.js → musica.spotify]</p>`;
/* V · Registro de mensajes: sobres lacrados y sin remitente; el autor y el texto solo se revelan al abrirlos */
(function(){const grid=$('#msgGrid'),rd=$('#msgReader'),box=$('#msgs'),M=D.mensajes,read=new Set(),glyph=['st','drg','st'],tone=['pg','cb','bg'];
 const count=()=>`Sellos rotos: ${read.size} de ${M.length}`;
 grid.innerHTML=`<div class="sv-list">${M.map((m,i)=>`<button class="sv ${tone[i%3]}" data-m="${i}" style="--rt:${[-2.2,1.6,-1,2.4,-1.8][i%5]}deg" aria-label="Mensaje sellado N.º ${pad(i+1)}. Remitente oculto"><i class="sf"></i><span class="seal"><b></b><b></b><svg viewBox="${glyph[i%3]==='drg'?'0 0 360 300':'0 0 24 24'}"><use href="#${glyph[i%3]}"/></svg></span><i class="sl"></i><span class="stg"><small>N.º ${pad(i+1)}</small><b>Sellado</b></span></button>`).join('')}</div><p class="cnt" id="msgCnt">${count()}</p>`;
 const tile=i=>grid.querySelector(`[data-m="${i}"]`);
 function showReader(i){const m=M[i];rd.innerHTML=`<article class="reader parch"><p class="kick">Registro de mensajes · N.º ${pad(i+1)}</p><h3 tabindex="-1">De: ${m.de}</h3>${paper(m.texto,'#5e1020')}<button class="btn" data-back>Volver a todos los mensajes</button></article>`;
  grid.hidden=true;rd.hidden=false;rd.dataset.i=i;
  const t=tile(i);t.classList.add('read');t.querySelector('.stg').innerHTML=`<small>Leído · N.º ${pad(i+1)}</small><b>${m.de}</b>`;t.setAttribute('aria-label',`Mensaje N.º ${pad(i+1)} de ${m.de}, ya leído`);read.add(i);$('#msgCnt').textContent=count();
  rd.querySelector('h3').focus({preventScroll:true});
  const top=box.getBoundingClientRect().top+scrollY-110;if(scrollY>top||top-scrollY>innerHeight*.6)scrollTo({top,behavior:rm?'auto':'smooth'});
  say('¡Otro mensaje para ti! 💌')}
 function back(){const i=+rd.dataset.i;rd.hidden=true;rd.innerHTML='';grid.hidden=false;const t=tile(i);if(t){t.focus({preventScroll:true});const y=t.getBoundingClientRect();if(y.top<90||y.bottom>innerHeight)t.scrollIntoView({block:'center',behavior:rm?'auto':'smooth'})}}
 grid.addEventListener('click',e=>{const b=e.target.closest('.sv');if(!b||b.classList.contains('opening'))return;const i=+b.dataset.m;
  if(b.classList.contains('read')||rm)return showReader(i);
  const r=b.getBoundingClientRect();sparks(r.left+r.width/2,r.top+r.height/2,['✦','✧']);b.classList.add('opening');setTimeout(()=>{b.classList.remove('opening');showReader(i)},950)});
 rd.addEventListener('click',e=>{if(e.target.closest('[data-back]'))return back();const b=e.target.closest('[data-m]');if(b)showReader(+b.dataset.m)});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&!rd.hidden&&$('#modal').hidden)back()});
})();
/* VI · Final */
const mj=$('#mensajeJunto'),full=D.mensajeJunto;let shown=false;
new IntersectionObserver(([e])=>{if(e.isIntersecting&&!shown){shown=true;if(rm){mj.textContent=full;return}let i=0;const iv=setInterval(()=>{mj.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv)},25)}}).observe(mj);
$('#felicitacion').textContent='«'+D.felicitacion+'»';
const vb=$('#videoBox');vb.innerHTML=`<div class="vid" role="button" tabindex="0" aria-label="Reproducir el video">${D.video.poster?`<img loading="lazy" src="${D.video.poster}" alt="Recap">`:'<div class="blank"></div>'}<div class="play"><i></i></div></div>`;
const vd=vb.firstChild,pv=()=>{if(!D.video.src)return say('Aquí irá el video de las tres: el último registro 🎬');vd.innerHTML=`<video controls autoplay playsinline src="${D.video.src}"></video>`;vd.onclick=null};vd.onclick=pv;vd.onkeydown=e=>{if(e.key==='Enter')pv()};
$('#celebrar').onclick=()=>celebrar();
/* Navegación: índice + riel de capítulos */
const nav=$('#nav'),links=[...$d.querySelectorAll('#links a')];
const rail=$d.createElement('div');rail.id='rail';rail.innerHTML=links.map(a=>`<a href="${a.hash}" data-n="${a.querySelector('b').textContent}" title="${a.querySelector('span').textContent}">${a.querySelector('b').textContent}</a>`).join('');$d.body.appendChild(rail);
const setOpen=o=>{nav.classList.toggle('open',o);$('#burger').setAttribute('aria-expanded',o)};
$('#burger').onclick=()=>setOpen(!nav.classList.contains('open'));
[$('#links'),rail,$('.brand')].forEach(el=>el.addEventListener('click',e=>{if(e.target.closest('a')){$('#universo').classList.add('show');setOpen(false)}}));
addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
const all=[...$d.querySelectorAll('#links a,#rail a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){all.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));const k=D.zorro.seccion[e.target.id];if(k)say(k)}}),{rootMargin:'-45% 0px -45% 0px'});
links.forEach(a=>io.observe($(a.hash)));
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
$d.querySelectorAll('.rv').forEach(el=>rv.observe(el));
addEventListener('scroll',()=>{const h=$d.documentElement;$('#progress').style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%';$('#top').classList.toggle('show',scrollY>600)},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});
setTimeout(()=>{setInterval(()=>say(D.zorro.pistas[Math.floor(Math.random()*D.zorro.pistas.length)],4500),45000)},30000);
