/* Chimuelo, guardián de la cápsula del tiempo. Se sienta sobre la tarjeta (no vuela). Contenido en DATA.capsula */
(function(){
const C=DATA.capsula,star=document.getElementById('secretStar');if(!star)return; /* estrella roja retirada de las crónicas: este módulo queda inactivo */
const chim='<img class="chim" src="assets/dragon/chimuelo.png" alt="Chimuelo, el dragón guardián del Archivo">';
star.addEventListener('click',()=>{
 openModal(`${chim}<h3>Chimuelo, guardián del Archivo</h3><p>${C.dialogo}</p><button class="btn" id="secret">Descubrir el secreto</button>`,()=>sparks(innerWidth/2,innerHeight/2,['✦','❖','✧']));
 sparks(innerWidth/2,innerHeight/3,['✦','❖','✧']);
 document.getElementById('secret').onclick=abrir});
function abrir(){const b=document.getElementById('modalBody');
 b.innerHTML=`${chim}<h3>La cámara sellada del Archivo</h3>${paper(C.carta,"#5e1020")}<h4>Tres deseos sellados</h4>${C.deseos.map(x=>`<p class="wish">${x}</p>`).join('')}<p>${C.futuro}</p>${C.media?(/\.(mp3|wav|ogg)$/i.test(C.media)?`<audio controls preload="none" src="${C.media}"></audio>`:`<video controls preload="none" src="${C.media}" style="width:100%"></video>`):''}<p class="big">${C.cierre}</p>`;
 sparks(innerWidth/2,innerHeight/2,['✦','❖','✧'])}
})();
