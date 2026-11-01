/* ===== ALWAYS START AT THE TOP (never restore an old scroll position) ===== */
(function(){if('scrollRestoration' in history)history.scrollRestoration='manual';
 const top0=()=>window.scrollTo({top:0,left:0,behavior:'instant'}),de=document.documentElement,gate=document.getElementById('gate');
 top0();addEventListener('load',()=>{top0();setTimeout(top0,60)});addEventListener('pageshow',top0);
 if(gate&&!gate.classList.contains('gone')){de.style.overflow='hidden';
  new MutationObserver((m,o)=>{if(gate.classList.contains('gone')){de.style.overflow='';top0();o.disconnect()}}).observe(gate,{attributes:true,attributeFilter:['class']})}})();
/* ===== MOON PHASE ===== */
(function(){const m=document.querySelector('.moon');if(!m)return;
 const has=!!EXTRA.birthDate,n=new Date(),p0=has?EXTRA.birthDate.split('-').map(Number):[n.getFullYear(),n.getMonth()+1,n.getDate()];
 const when=Date.UTC(p0[0],p0[1]-1,p0[2],18),ref=Date.UTC(2000,0,6,18,14);
 let p=(((when-ref)/864e5)/29.530588853)%1;if(p<0)p+=1;
 const wan=p>.5,th=2*Math.PI*(wan?1-p:p),c=Math.cos(th),rx=Math.max(.01,50*Math.abs(c)).toFixed(2),sw=c>0?0:1,k=(1-Math.cos(2*Math.PI*p))/2;
 m.style.setProperty('--k',Math.max(.25,k).toFixed(2));
 const lit=`M0 -50A50 50 0 0 1 0 50A${rx} 50 0 0 ${c>0?0:1} 0 -50Z`;
 m.insertAdjacentHTML('beforeend',`<svg class='shade' viewBox='-52 -52 104 104'><defs><radialGradient id='mg' gradientUnits='userSpaceOnUse' cx='-15' cy='-15' r='72'><stop offset='0' stop-color='#fffbe8'/><stop offset='.55' stop-color='#f3e3a7'/><stop offset='1' stop-color='#d9c27c'/></radialGradient><clipPath id='mc'><path d='${lit}'/></clipPath></defs><g${wan?" transform='scale(-1 1)'":''}>${k>.01?`<path d='${lit}' fill='url(#mg)'/><g clip-path='url(#mc)'><circle cx='14' cy='-18' r='8' fill='rgba(160,135,70,.22)'/><circle cx='-16' cy='16' r='5.5' fill='rgba(160,135,70,.22)'/><circle cx='-4' cy='-28' r='4' fill='rgba(160,135,70,.18)'/></g>`:''}</g></svg>`);
 const names=['a new moon','a waxing crescent','a first quarter moon','a waxing gibbous moon','a full moon','a waning gibbous moon','a last quarter moon','a waning crescent'],nm=names[Math.floor(p*8+.5)%8];
 const t=document.getElementById('mtxt'),s=document.getElementById('msub');
 if(t)t.textContent=has?`The moon was ${nm} the night you arrived.`:`Tonight the moon is ${nm}.`;
 if(s)s.textContent=`${new Date(p0[0],p0[1]-1,p0[2]).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})} · ${Math.round(k*100)}% lit`})();
/* ===== CAKE AND CANDLES ===== */
(function(){const cake=document.getElementById('cake');if(!cake)return;
 const R=(a,b)=>a+Math.random()*(b-a),sec=document.getElementById('cakeSec'),cs=document.getElementById('candles'),mic=document.getElementById('micBtn'),again=document.getElementById('again');
 const cols=['#f4a6c8','#f3d98b','#b79bff'],hues=['#ffffff','#fff1c1','#f3d98b','#ffd6e8','#cdb8ff','#ffe08a'],SP="<path d='M0 -10Q1.4 -1.4 10 0Q1.4 1.4 0 10Q-1.4 1.4 -10 0Q-1.4 -1.4 0 -10Z'/>";
 let done=false,stream,actx,raf,timers=[];
 function flick(c){if(done||!c.isConnected||c.classList.contains('out'))return;const f=c.querySelector('.flame'),dip=Math.random()<.1;
  f.style.setProperty('--s',(dip?.6:R(.82,1.18)).toFixed(2));f.style.setProperty('--h',(dip?.8:R(.9,1.3)).toFixed(2));
  f.style.setProperty('--rot',R(-5,5).toFixed(1)+'deg');f.style.setProperty('--gl',(dip?.35:R(.55,1.2)).toFixed(2));
  cake.style.setProperty('--cg',R(.7,1).toFixed(2));setTimeout(()=>flick(c),R(60,230))}
 function light(){cs.innerHTML=Array.from({length:EXTRA.candles},(_,i)=>`<div class='cd' style='--c:${cols[i%3]}'><i class='smoke'></i><i class='flame'></i></div>`).join('');
  [...cs.children].forEach(c=>setTimeout(()=>flick(c),R(0,300)))}
 light();
 document.querySelector('.t2').innerHTML=[18,46,74].map(x=>`<svg viewBox='-10 -10 20 20' style='left:${x}%'><use href='#jfg'/></svg>`).join('');
 document.querySelector('.t1').innerHTML=[10,34,58,82].map(x=>`<svg viewBox='-10 -10 20 20' style='left:${x}%'><use href='#jfg'/></svg>`).join('');
 function duck(d){try{if(!on)return;if(typeof track!=='undefined'&&track)track.volume=d?.15:.7;if(typeof master!=='undefined'&&master&&ac)master.gain.setTargetAtTime(d?.15:.7,ac.currentTime,.3)}catch(e){}}
 function stopMic(){cancelAnimationFrame(raf);if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;if(actx)actx.close().catch(()=>{});actx=null;duck(false);mic.textContent='Blow into the mic'}
 async function startMic(){if(stream||done)return;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:false,autoGainControl:false}})}
  catch(e){stream=null;mic.textContent='Mic unavailable, tap the cake instead';setTimeout(()=>mic.textContent='Blow into the mic',3500);return}
  actx=new (window.AudioContext||window.webkitAudioContext)();const an=actx.createAnalyser();an.fftSize=1024;actx.createMediaStreamSource(stream).connect(an);
  const buf=new Uint8Array(an.fftSize),t0=performance.now();let base=0,hot=0;duck(true);mic.textContent='Listening… blow gently on the mic';
  (function loop(){an.getByteTimeDomainData(buf);let s=0;for(const v of buf){const x=(v-128)/128;s+=x*x}const l=Math.sqrt(s/buf.length);
   if(performance.now()-t0<1200)base=Math.max(base,l);else{if(l>base*2+.06)hot++;else hot=Math.max(0,hot-2);if(hot>9){blow();return}}
   raf=requestAnimationFrame(loop)})()}
 function blow(){if(done)return;done=true;stopMic();cake.classList.add('dark');
  [...cs.children].forEach((c,i)=>setTimeout(()=>c.classList.add('out'),i*150));
  timers.push(setTimeout(()=>{sec.classList.add('done','wishing');glitter()},900));
  timers.push(setTimeout(()=>sec.classList.remove('wishing'),10900));
  timers.push(setTimeout(()=>sec.classList.add('blessed'),11800))}
 function glitter(){const box=document.createElement('div');box.className='burst';const r=cake.getBoundingClientRect(),ox=r.left+r.width/2,oy=r.top+30;let s='';
  for(let i=0;i<120;i++){const a=R(0,6.283),d=R(80,Math.min(innerWidth,760)*.6),sz=R(7,18),
   st=`left:${ox}px;top:${oy}px;--x:${(Math.cos(a)*d).toFixed(0)}px;--y:${(Math.sin(a)*d*.8-R(40,160)).toFixed(0)}px;--g:${R(100,300).toFixed(0)}px;--rr:${R(-360,360).toFixed(0)}deg;color:${hues[i%6]};animation-duration:${R(2.4,4).toFixed(1)}s,${R(.3,.7).toFixed(2)}s;animation-delay:${R(0,.4).toFixed(2)}s,0s`;
   s+=i%2?`<svg class='bp gs' viewBox='-10 -10 20 20' style='${st};width:${sz.toFixed(0)}px'>${SP}</svg>`:`<i class='bp dot' style='${st};width:${(sz*.4).toFixed(0)}px;height:${(sz*.4).toFixed(0)}px'></i>`}
  for(let i=0;i<90;i++){const sz=R(6,13),st=`left:${R(0,100).toFixed(0)}vw;--sw:${R(-90,90).toFixed(0)}px;--rr:${R(-360,360).toFixed(0)}deg;color:${hues[i%6]};animation-duration:${R(5,9).toFixed(1)}s,${R(.3,.7).toFixed(2)}s;animation-delay:${R(.6,4.5).toFixed(1)}s,0s`;
   s+=i%3?`<svg class='fp gs' viewBox='-10 -10 20 20' style='${st};width:${sz.toFixed(0)}px'>${SP}</svg>`:`<i class='fp dot' style='${st};width:${(sz*.4).toFixed(0)}px;height:${(sz*.4).toFixed(0)}px'></i>`}
  box.innerHTML=s;document.body.appendChild(box);setTimeout(()=>box.remove(),14000)}
 cake.onclick=blow;cake.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();blow()}};
 mic.onclick=()=>stream?stopMic():startMic();
 again.onclick=()=>{timers.forEach(clearTimeout);timers=[];done=false;sec.classList.remove('done','wishing','blessed');cake.classList.remove('dark');light()}})();

/* ===== PHOTO INSIDE THE WISH PILL NOTES ===== */
(function(){const pf=document.getElementById('pf'),old=document.getElementById('pimg');if(!pf)return;
 const P=(typeof EXTRA!=='undefined'&&EXTRA.pillPics)||[];
 if(old)old.remove();
 // every photo is loaded and decoded up front, so opening a pill just reveals the right one
 const imgs=P.map(s=>{const i=new Image();i.alt='';i.decoding='async';i.src=s;pf.prepend(i);if(i.decode)i.decode().catch(()=>{});return i});
 let cur=-1;
 function show(n){cur=n;imgs.forEach((x,k)=>x.classList.toggle('on',k===n));const x=imgs[n];pf.classList.toggle('empty',!(x&&x.complete&&x.naturalWidth))}
 imgs.forEach((x,k)=>x.addEventListener('load',()=>{if(k===cur)pf.classList.remove('empty')}));
 document.querySelectorAll('.pill').forEach((b,i)=>b.addEventListener('click',()=>{show(P.length?i%P.length:-1);pf.style.setProperty('--tilt',(i%2?2:-2)+'deg')}))})();

/* ===== keep the floating pills on screen after rotating or resizing ===== */
addEventListener('resize',()=>{if(typeof pills==='undefined')return;pills.forEach(p=>{p.x=Math.max(0,Math.min(p.x,innerWidth-p.b.offsetWidth));p.y=Math.max(0,Math.min(p.y,innerHeight-p.b.offsetHeight))})});

/* ===== LETTER: always open from the top, and write faster ===== */
(function(){const env=document.getElementById('env'),reader=document.getElementById('reader'),card=reader&&reader.querySelector('.letter');if(!env||!card)return;
 const per=(typeof EXTRA!=='undefined'&&EXTRA.wordMs)||70,first=(typeof EXTRA!=='undefined'&&EXTRA.wordStart)||800;
 function open2(){if(busy)return;busy=true;env.classList.add('open');card.scrollTop=0;
  setTimeout(()=>{card.scrollTop=0;reader.classList.add('on');paused=true;
   [...reader.querySelectorAll('.w')].forEach((x,i)=>wt.push(setTimeout(()=>x.classList.add('on'),first+i*per)));
   popPic();pt=setInterval(popPic,2200)},1800)}
 env.onclick=open2;env.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open2()}};
 new MutationObserver(()=>{if(reader.classList.contains('on'))card.scrollTop=0;else setTimeout(()=>{card.scrollTop=0},900)}).observe(reader,{attributes:true,attributeFilter:['class']})})();

/* ===== HER NAME AS A LIVING CONSTELLATION OF STARDUST (uses CONFIG.name) ===== */
(function(){const h=document.getElementById('nm');if(!h)return;
 const name=((typeof CONFIG!=='undefined'&&CONFIG.name)||h.textContent||'').trim();if(!name)return;
 document.title='Happy Birthday, '+name+' ✦';
 const gh=document.querySelector('#gate h1');if(gh)gh.textContent='For you, '+name;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fs0=parseFloat(getComputedStyle(h).fontSize)||64,pal=['#ffffff','#ffe9f3','#f3d98b','#f4a6c8','#d9ccff'];
 let cv,ctx,P=[],W=0,H=0,go=h.classList.contains('in'),ptr=null,raf=0,vis=true,lastW=innerWidth,ua=0,FN='',TX=0,TY=0;
 function bind(){const set=e=>{const r=cv.getBoundingClientRect();ptr={x:e.clientX-r.left,y:e.clientY-r.top}};
  cv.addEventListener('pointermove',set);cv.addEventListener('pointerdown',set);['pointerleave','pointerup','pointercancel'].forEach(n=>cv.addEventListener(n,()=>{ptr=null}))}
 function draw(t){ctx.clearRect(0,0,W,H);const wx=((t*.11)%(W+500))-250,R2=4900;
  if(go&&ua<.16)ua+=.0015;if(ua>0||reduce){ctx.globalAlpha=reduce?.16:ua;ctx.fillStyle='#ffe9f3';ctx.font=FN;ctx.fillText(name,TX,TY)}
  for(const p of P){
   if(go){p.vx=(p.vx+(p.tx-p.x)*.035)*.86;p.vy=(p.vy+(p.ty-p.y)*.035)*.86}
   if(ptr){const dx=p.x-ptr.x,dy=p.y-ptr.y,d2=dx*dx+dy*dy;if(d2<R2&&d2>.01){const f=(1-d2/R2)*3/Math.sqrt(d2);p.vx+=dx*f;p.vy+=dy*f}}
   p.x+=p.vx;p.y+=p.vy;
   const wv=Math.max(0,1-Math.abs(p.tx-wx)/55),tw=.7+.3*Math.sin(t*.002*p.s+p.ph),r=p.r*(1+wv*.7),
    px=p.x+Math.sin(t*.0012*p.s+p.ph)*.8,py=p.y+Math.cos(t*.001*p.s+p.ph)*.8;
   ctx.globalAlpha=Math.min(1,tw+wv*.7);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(px,py,r,0,6.283);ctx.fill();
   if(p.big&&tw>.85){ctx.strokeStyle=p.c;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(px-r*4,py);ctx.lineTo(px+r*4,py);ctx.moveTo(px,py-r*4);ctx.lineTo(px,py+r*4);ctx.stroke()}}
  ctx.globalAlpha=1}
 function loop(t){if(!vis){raf=0;return}raf=requestAnimationFrame(loop);draw(t)}
 function build(){cancelAnimationFrame(raf);raf=0;
  const maxW=Math.min(innerWidth-32,760),dpr=Math.min(devicePixelRatio||1,2),o=document.createElement('canvas'),x=o.getContext('2d',{willReadFrequently:true}),F=s=>`${s}px "Great Vibes",cursive`;
  let size=fs0;x.font=F(size);let w=x.measureText(name).width;if(w>maxW){size*=maxW/w;x.font=F(size);w=x.measureText(name).width}
  W=Math.ceil(w+size*.5);H=Math.ceil(size*1.35);o.width=W;o.height=H;x.font=F(size);x.fillStyle='#fff';x.fillText(name,size*.25,size*.95);x.strokeStyle='#fff';x.lineWidth=Math.max(1.5,size*.035);x.strokeText(name,size*.25,size*.95);FN=F(size);TX=size*.25;TY=size*.95;
  const d=x.getImageData(0,0,W,H).data;let s=Math.max(2.2,size/34),pts;
  do{pts=[];for(let yy=0;yy<H;yy+=s)for(let xx=0;xx<W;xx+=s){const jx=xx+Math.random()*s,jy=yy+Math.random()*s;if(jx>=W||jy>=H)continue;if(d[((jy|0)*W+(jx|0))*4+3]>140)pts.push([jx,jy])}s*=1.18}while(pts.length>1600);
  P=pts.map(([tx,ty])=>({tx,ty,x:go?tx:Math.random()*W,y:go?ty:Math.random()*H*2-H*.5,vx:0,vy:0,r:Math.random()*1+.8,ph:Math.random()*6.28,s:.6+Math.random()*1.2,c:pal[(Math.random()*pal.length)|0],big:Math.random()<.07}));
  if(!cv){h.innerHTML='<span class="sr"></span><canvas id="nameCv" aria-hidden="true"></canvas>';h.firstChild.textContent=name;cv=h.querySelector('canvas');ctx=cv.getContext('2d');bind();
   new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!raf&&!reduce)raf=requestAnimationFrame(loop)}).observe(h);
   new MutationObserver(()=>{if(h.classList.contains('in'))go=true}).observe(h,{attributes:true,attributeFilter:['class']})}
  cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';cv.style.margin=(-size*.12)+'px auto';ctx.setTransform(dpr,0,0,dpr,0,0);
  if(reduce){P.forEach(p=>{p.x=p.tx;p.y=p.ty});draw(0)}else raf=requestAnimationFrame(loop)}
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(innerWidth!==lastW){lastW=innerWidth;build()}},250)});
 const fl=document.fonts?document.fonts.load('64px "Great Vibes"',name):Promise.resolve();
 Promise.race([fl,new Promise(r=>setTimeout(r,1500))]).then(build,build)})();
