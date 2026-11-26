/* Crónicas del Archivo · dragón secreto.
   Un dragón patrulla la sección mientras está a la vista. Al hacer clic se revela el dibujo original (oculto hasta ese momento).
   Rutas editables en js/data.js → DATA.cronicas.dragon.src (PNG del dragón) y DATA.cronicas.sorpresa.dibujo (dibujo). */
(function(){
const C=DATA.cronicas,sec=document.getElementById('recuerdos'),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!C||!sec)return;
/* ---------- Dragón volando ---------- */
const dr=document.createElement('button');dr.id='dragonVuelo';dr.type='button';dr.hidden=true;
dr.setAttribute('aria-label',C.dragon.alt||'Un dragón sobrevuela las crónicas');
const layer=cls=>`<img class="dw ${cls}" src="${C.dragon.src}" alt="" draggable="false">`;
dr.innerHTML=`<span class="dbody">${layer('dc')}${layer('dl')}${layer('dg')}</span>`;
sec.appendChild(dr);
/* Si el PNG todavía no está, se usa la silueta de dragón incluida en la página (#drg) */
dr.querySelector('.dc').addEventListener('error',()=>{dr.querySelector('.dbody').innerHTML='<svg class="dfb" viewBox="0 0 360 300" aria-hidden="true"><use href="#drg" style="color:#0a0605"/></svg>'},{once:true});

/* Estado: el dragón solo existe mientras la sección "Archivos" está a la vista.
   hover = puntero encima (se detiene para poder pulsarlo) · locked = dibujo abierto (vuelo en pausa) */
let flying=false,hover=false,locked=false,active=false,timer=0,found=false,raf=0,avisado=false,tick=0;
const MIN_VIS=140; /* alto mínimo de la sección visible en pantalla para considerarla "presente" */
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const dragonSize=()=>innerWidth<720?116:190;
/* Geometría de la sección respecto a la pantalla: vTop = parte ya desplazada arriba, vis = alto visible */
function geo(){const r=sec.getBoundingClientRect();return{top:r.top,left:r.left,H:sec.clientHeight,W:sec.clientWidth,vTop:Math.max(0,-r.top),vis:Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top))}}
/* Franja vertical (en coordenadas de la sección) por la que puede volar: lo visible en pantalla, sin tapar la barra superior */
function band(g,sz){const lo=Math.max(g.vTop,92-g.top),hi=Math.min(g.H-sz,innerHeight-g.top-sz-24);return[lo,Math.max(lo,hi)]}
function placeStatic(g){g=g||geo();const sz=innerWidth<720?110:170,[lo,hi]=band(g,sz);dr.hidden=false;dr.classList.add('still');dr.style.transform='';dr.style.setProperty('--sz',sz+'px');dr.style.top=(lo+(hi-lo)*.35)+'px'}
function flight(){
 if(flying||!active||locked)return;
 const g0=geo(),sz=dragonSize();
 dr.style.setProperty('--sz',sz+'px');dr.style.top='';
 const ltr=Math.random()<.5,x0=ltr?-sz:g0.W+sz,x1=ltr?g0.W+sz:-sz;
 /* fy = franja vertical (0‒1) dentro de lo que se ve de la sección; el vuelo la sigue si se hace scroll */
 const fy0=rnd(.12,.55),fy1=clamp(fy0+rnd(.12,.3)*(Math.random()<.5?1:-1),.08,.85),amp=rnd(.05,.1),ph=rnd(0,6.28);
 const dur=Math.hypot(x1-x0,(fy1-fy0)*g0.vis)/(innerWidth<720?62:84)*1000;
 flying=true;dr.hidden=false;dr.classList.remove('still');dr.classList.add('volando');
 let last=performance.now(),el=0,lastX=x0;
 const[lo,hi]=band(g0,sz); /* franja fijada al despegar: el vuelo ya NO sigue al scroll, se queda en su sitio de la sección */
 const at=(u,g)=>{const f=clamp(fy0+(fy1-fy0)*u+Math.sin(u*Math.PI*2+ph)*amp,0,1);return{x:x0+(x1-x0)*u,y:lo+(hi-lo)*f}};
 const step=now=>{
  if(!flying)return;
  const g=geo();
  if(!locked&&g.vis<MIN_VIS){active=false;return stop()} /* la sección salió de pantalla: el dragón desaparece */
  const dt=Math.min(now-last,80);last=now;
  const onScreen=g.left+lastX>0&&g.left+lastX<innerWidth; /* el puntero solo lo detiene cuando ya está a la vista */
  if(!(hover&&onScreen)&&!locked&&!document.hidden)el+=dt;
  const u=Math.min(el/dur,1),p=at(u,g),q=at(Math.min(u+.01,1),g),a=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI+90;
  /* si el scroll lo deja fuera de la pantalla, se reinicia desde cero: vuelve a entrar por un borde en la zona que ves ahora */
  const vy=g.top+p.y+sz/2;if(!locked&&(vy<30||vy>innerHeight-30)&&u>0){cancelAnimationFrame(raf);flying=false;dr.hidden=true;dr.classList.remove('volando');return schedule(250,600)}
  lastX=p.x;dr.style.transform=`translate(${p.x-sz/2}px,${p.y-sz/2}px) rotate(${a}deg)`;
  if(u<1)raf=requestAnimationFrame(step);else land()};
 raf=requestAnimationFrame(step);
 if(!found&&!avisado&&C.aviso){avisado=true;setTimeout(()=>{if(flying&&window.say)say(C.aviso,4500)},1800)}
}
/* Fin de un cruce: el siguiente llega enseguida, así que el dragón siempre está "de patrulla" mientras estés en la sección */
function land(){cancelAnimationFrame(raf);flying=false;dr.hidden=true;dr.classList.remove('volando');schedule(1200,2800)}
/* Salir de la sección (o cerrar la página en segundo plano): se corta el vuelo y se oculta */
function stop(){cancelAnimationFrame(raf);clearTimeout(timer);timer=0;flying=false;hover=false;dr.hidden=true;dr.classList.remove('volando','still');dr.style.transform=''}
function schedule(a,b){clearTimeout(timer);timer=0;if(reduce||!active)return;
 timer=setTimeout(()=>{timer=0;if(!active)return;if(document.hidden||locked)return schedule(1500,2500);flight()},rnd(a,b))}
function start(){if(reduce){placeStatic();return}if(!flying&&!timer)schedule(500,1000)}
/* Presencia en la sección: se evalúa al hacer scroll / redimensionar */
function check(){tick=0;if(locked)return;const g=geo(),on=g.vis>=MIN_VIS;
 if(on!==active){active=on;on?start():stop()}
 else if(on&&reduce)placeStatic(g)}
const queue=()=>{if(!tick)tick=requestAnimationFrame(check)};
addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)queue()});
dr.addEventListener('pointerenter',()=>{hover=true});dr.addEventListener('pointerleave',()=>{hover=false});
check();

/* ---------- Sorpresa: el dibujo solo se carga y se muestra tras el clic ---------- */
const S=C.sorpresa;let ov=null,lastFocus=null;
function build(){
 ov=document.createElement('div');ov.id='sorpresa';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','srTitle');
 ov.innerHTML=`<div class="sr-glow" aria-hidden="true"></div><div class="sr-card"><button class="x sr-x" aria-label="Cerrar la sorpresa" data-sr-close></button>
 <p class="kick">${S.rotulo||''}</p>
 <figure class="sr-frame"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><div class="sr-img"></div><i class="sr-shine" aria-hidden="true"></i>${S.autora?`<figcaption>${S.autora}</figcaption>`:''}</figure>
 <h3 id="srTitle">${S.titulo||''}</h3><p class="sr-text">${S.texto||''}</p><button class="btn" data-sr-close>${S.cerrar||'Volver'}</button></div>`;
 document.body.appendChild(ov);
 ov.addEventListener('click',e=>{if(e.target===ov||e.target.classList.contains('sr-glow')||e.target.closest('[data-sr-close]'))close()});
}
function open(){
 if(locked)return;
 locked=true;hover=false;found=true;
 lastFocus=document.activeElement;if(!ov)build();
 const box=ov.querySelector('.sr-img');box.innerHTML='';box.classList.remove('on','prov');
 const img=new Image();img.alt=S.alt||'';img.decoding='async';
 let fb=false;img.onerror=()=>{if(fb||!S.provisional)return;fb=true;box.classList.add('prov');img.src=S.provisional};
 img.onload=()=>{box.appendChild(img);requestAnimationFrame(()=>{box.classList.add('on')})};
 img.src=S.dibujo;
 ov.hidden=false;ov.classList.remove('out');void ov.offsetWidth;ov.classList.add('in');document.body.style.overflow='hidden';
 ov.querySelector('.sr-x').focus({preventScroll:true});
 if(window.sparks){sparks(innerWidth/2,innerHeight/2,['✦','❖','✧']);setTimeout(()=>sparks(innerWidth/2,innerHeight/3,['✦','✧','❖']),500)}
 if(window.say)say('¡Lo encontraste! 🐉',4500);
}
function close(){if(!ov||ov.hidden)return;ov.classList.remove('in');ov.hidden=true;ov.querySelector('.sr-img').innerHTML='';document.body.style.overflow='';
 locked=false;hover=false;
 if(lastFocus&&lastFocus.isConnected&&!lastFocus.hidden)lastFocus.focus({preventScroll:true});
 check(); /* el dragón sigue visible y reanuda su vuelo exactamente donde estaba */
 if(active&&!flying&&!timer)reduce?placeStatic():schedule(600,1200)}
dr.addEventListener('click',open);
addEventListener('keydown',e=>{if(e.key==='Escape'&&ov&&!ov.hidden)close();
 if(e.key==='Tab'&&ov&&!ov.hidden){const f=[...ov.querySelectorAll('button')];if(!f.length)return;const a=f.indexOf(document.activeElement);if(e.shiftKey&&a<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&a===f.length-1){e.preventDefault();f[0].focus()}}});
})();
