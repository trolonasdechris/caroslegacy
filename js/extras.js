/* Escenas, sobres/documentos, media, parallax y comportamiento de Zelev */
const Q=s=>document.querySelector(s),rmo=matchMedia('(prefers-reduced-motion:reduce)').matches;
window.paper=(t,c='#5e1020')=>`<div class="oe" style="--c:${c}"><div class="flap"></div><span class="seal brk"><b></b><b></b><svg viewBox="0 0 24 24"><use href="#st"/></svg></span><div class="paper">${t}</div></div>`;
window.mediaHTML=(l=[])=>l.length?l.map(m=>m.tipo==='video'?`<video class="mm" controls preload="none" playsinline ${m.poster?`poster="${m.poster}"`:''} src="${m.src}"></video>`:`<img class="mm" loading="lazy" src="${m.src}" alt="${m.alt||''}">`).join(''):'<p class="empty">[Aquí irá una foto o un video de esta crónica]</p>';
/* Escenas: montañas, luna, dragones (silueta) y resplandor de fuego */
function scene(k){const f=k==='f',s=[[120,120,10],[300,210,6],[520,90,8],[700,170,5],[1080,110,9],[980,430,6],[220,430,5],[430,300,4]];
  return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>
<linearGradient id="sk${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070504"/><stop offset=".55" stop-color="#1b0b0d"/><stop offset="1" stop-color="${f?'#6a1d10':'#4a150f'}"/></linearGradient>
<radialGradient id="gl${k}" cx=".5" cy="1" r=".7"><stop offset="0" stop-color="#ff7a2e" stop-opacity=".8"/><stop offset=".5" stop-color="#9c1c2a" stop-opacity=".25"/><stop offset="1" stop-opacity="0"/></radialGradient>
<radialGradient id="mn${k}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#e9b45c"/><stop offset="1" stop-color="#8a2a18"/></radialGradient></defs>
<rect width="1200" height="800" fill="url(#sk${k})"/>
<g class="ly" style="--k:-6"><circle cx="${f?300:880}" cy="${f?340:330}" r="64" fill="url(#mn${k})"/><circle cx="${f?300:880}" cy="${f?340:330}" r="104" fill="none" stroke="#c09440" stroke-opacity=".5" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/><circle cx="${f?300:880}" cy="${f?340:330}" r="150" fill="none" stroke="#c09440" stroke-opacity=".3"/><circle cx="${f?300:880}" cy="${f?340:330}" r="196" fill="none" stroke="#c09440" stroke-opacity=".25" stroke-width="3" stroke-dasharray="2 12"/></g>
<g class="ly" style="--k:-3">${s.map(a=>`<use href="#st" x="${a[0]-a[2]}" y="${a[1]-a[2]}" width="${a[2]*2}" height="${a[2]*2}" style="fill:#c09440;opacity:.8"/>`).join('')}</g>
<rect y="380" width="1200" height="420" fill="url(#gl${k})"/>
<use href="#rg" y="${f?400:440}" width="1200" height="330" style="color:#1d1210"/>
<use href="#rg" transform="translate(1200 0) scale(-1 1)" y="${f?500:520}" width="1200" height="300" style="color:#110b09"/>
<use href="#rg" y="${f?600:620}" width="1200" height="200" style="color:#070504"/></svg>`}
/* Dragones que vuelan solos (silueta original #drg/#hw): capas propias, sin depender del cursor ni del recorte de la escena */
function flyers(L){return L.map(([l0,l1,w,dur,delay,tilt,op,t])=>`<div class="fly" style="--l0:${l0}%;--l1:${l1}%;--w:${w};--d:${dur}s;--dl:${delay}s;--t:${t}%;--o:${op}"><svg viewBox="0 0 360 300" style="rotate:${tilt}deg" aria-hidden="true"><g class="wl"><use href="#hw"/></g><g class="wr"><use href="#hw" transform="translate(360 0) scale(-1 1)"/></g></svg></div>`).join('')}
Q('#heroScene').innerHTML=scene('h')+flyers([[58,72,'15vw',62,-9,8,1,12],[8,22,'8vw',48,-30,-10,.9,50],[88,78,'5vw',74,-50,6,.75,30]]);
Q('#finalScene').innerHTML=scene('f')+flyers([[14,26,'11vw',58,-16,-8,1,35],[82,70,'6vw',70,-42,10,.85,22]]);
/* Zelev (único, fijo en todas las secciones): ojos cerrados, caminar y dormir */
const fox=Q('#fox');
fox.querySelector('svg').insertAdjacentHTML('beforeend','<g class="zz"><rect x="42" y="44" width="12" height="11" fill="#ff8a3d"/><rect x="66" y="44" width="12" height="11" fill="#ff8a3d"/><path d="M44 51Q48 55 52 51M68 51Q72 55 76 51" stroke="#1b1340" fill="none" stroke-width="2"/></g>');
let idle=0;const wake=()=>{idle=0;if(fox.classList.contains('sleep')){fox.classList.remove('sleep');say('¡Ah! Me despertaste 🦊')}};
['click','scroll','keydown','touchstart'].forEach(e=>addEventListener(e,wake,{passive:true}));
if(!rmo)setInterval(()=>{idle++;if(idle===14&&!fox.classList.contains('sleep')){fox.classList.add('sleep');say('Zzz…',2500)}
 if(idle>0&&idle%25===0&&!fox.classList.contains('sleep')){fox.classList.add('walk');setTimeout(()=>fox.classList.remove('walk'),7000)}},2000);
let pop=0;new IntersectionObserver(([e])=>{if(e.isIntersecting&&!pop){pop=1;setTimeout(()=>say(DATA.zorro.pistas[1],4500),5000)}},{threshold:.6}).observe(Q('#recuerdos'));
if(innerWidth<720)Q('#heroScene svg').setAttribute('viewBox','560 0 640 800');
