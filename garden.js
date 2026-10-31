/* Night-blooming jasmine tree, grass, scattered flowers and wind (builds itself into .garden) */
(function(){const R=(a,b)=>a+Math.random()*(b-a),F=(n,d=0)=>n.toFixed(d);let h='';
[[148,246,188,214],[146,238,96,206],[136,214,192,168],[130,204,68,170],[122,184,152,118],[120,176,50,118],[116,150,92,74],[116,140,152,68],[116,128,118,32],[118,160,192,112]].forEach(([bx,by,cx,cy])=>{
 const mx=(bx+cx)/2,my=(by+cy)/2-9;
 let g=`<path d='M${bx} ${by}Q${mx} ${my} ${cx} ${cy}' stroke='#4a392f' stroke-width='3' fill='none' stroke-linecap='round'/>`;
 const pt=t=>{const u=1-t;return[u*u*bx+2*u*t*mx+t*t*cx,u*u*by+2*u*t*my+t*t*cy]};
 for(let k=0;k<9;k++){const[x,y]=pt(R(.3,1));g+=`<path d='M0 0C3 -3 3 -8 0 -12C-3 -8 -3 -3 0 0Z' fill='${k%3?'#25604f':'#357f68'}' transform='translate(${F(x+R(-7,7),1)} ${F(y+R(-7,7),1)}) rotate(${F(R(0,360))}) scale(${F(R(.8,1.3),2)})'/>`}
 for(let k=0;k<8;k++){const[x,y]=pt(R(.45,1.04));g+=`<use href='#jfg' transform='translate(${F(x+R(-9,9),1)} ${F(y+R(-9,9),1)}) rotate(${F(R(0,72))}) scale(${F(R(.5,.85),2)})'/>`}
 h+=`<g class='cn' style='transform-origin:${bx}px ${by}px;--a:${F(R(2,5),1)}deg;animation-duration:${F(R(3,5),1)}s;animation-delay:-${F(R(0,5),1)}s'>${g}</g>`});
document.getElementById('tw').innerHTML=h;
let s='';
for(let i=0;i<110;i++)s+=`<i class='bl' style='left:${F(R(0,100),1)}%;height:${F(R(14,44))}px;animation-delay:-${F(R(0,3.6),1)}s;animation-duration:${F(R(2.8,4.4),1)}s'></i>`;
document.getElementById('grass').innerHTML=s;s='';
for(let i=0;i<34;i++)s+=`<svg class='fl rock' viewBox='-10 -10 20 20' style='left:${F(R(1,97),1)}%;bottom:${F(R(-4,20))}px;width:${F(R(12,22))}px;--r0:${F(R(0,72))}deg;animation-delay:-${F(R(0,4),1)}s'><use href='#jfg'/></svg>`;
for(let i=0;i<21;i++){const lf=i>=15;
 s+=`<svg class='fl blow${lf?' lf':''}' viewBox='-10 -10 20 20' style='left:${F(R(72,96),1)}%;bottom:${F(R(40,230))}px;width:${F(R(10,18))}px;--dx:-${F(R(45,100))}vw;--dy:${F(R(-130,70))}px;--rr:${F(R(-720,720))}deg;animation-duration:${F(R(9,16),1)}s;animation-delay:-${F(R(0,16),1)}s'>${lf?`<path d='M0 8C4 4 4 -4 0 -8C-4 -4 -4 4 0 8Z' fill='#357f68'/>`:`<use href='#jfg'/>`}</svg>`}
document.getElementById('ground').innerHTML=s;s='';
for(let i=0;i<6;i++)s+=`<b class='st' style='left:${F(R(55,100))}%;bottom:${F(R(30,260))}px;width:${F(R(90,200))}px;animation-duration:${F(R(4,8),1)}s;animation-delay:-${F(R(0,8),1)}s'></b>`;
document.getElementById('gust').innerHTML=s})();

/* the garden lives inside the letter section: the tree starts at the middle of the envelope, fades in when seen */
(function(){const sec=document.getElementById('letter'),env=document.getElementById('env'),gd=document.querySelector('.garden'),t=document.querySelector('.tree');if(!sec||!env||!gd||!t)return;
 function fit(){const s=sec.getBoundingClientRect(),e=env.getBoundingClientRect();let h=s.bottom-(e.top+e.height/2);
  const cap=(innerWidth<700?innerWidth*.52:innerWidth)*280/220;h=Math.max(150,Math.min(h,cap,420));
  t.style.height=h.toFixed(0)+'px';t.style.width=(h*220/280).toFixed(0)+'px'}
 fit();addEventListener('resize',fit);addEventListener('load',fit);setTimeout(fit,800);
 new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)fit();gd.classList.toggle('in',x.isIntersecting)}),{threshold:.35}).observe(sec)})();
