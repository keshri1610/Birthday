/* ===== EDIT YOUR CONTENT HERE ===== */
const CONFIG={
 name:"My Dearest",
 // your own song: put the file in a "music" folder, e.g. "music/song.mp3". Leave "" to use the built-in melody.
 music:"/music/song.mp3",
 // add your photo links or files (leave src empty for a lily placeholder)
 memories:[
  {src:"images/IMG_2.jpg",title:"Your smile",text:"The world feels softer when you laugh. I hope this year gives you a thousand reasons to do it."},
  {src:"images/IMG_13.jpeg",title:"Your light",text:"You shine like the moon on a quiet night, calm, steady, and impossible to look away from."},
  {src:"images/IMG_16.jpeg",title:"Your year ahead",text:"May every dream you whisper to the moon find its way home to you."}
 ],
 pills:[
  "A wish for you","Open me","Just for you","Read me softly","A tiny secret","Make a wish","For your heart"
 ],
 notes:[
  "May your birthday bloom as gracefully as a lily in moonlight.",
  "You are loved more than all the stars in tonight’s sky.",
  "Wishing you peace, laughter, and everything your heart is quietly hoping for.",
  "Thank you for being exactly who you are. The world is brighter with you in it.",
  "May this year be gentle with you and generous with its miracles.",
  "Close your eyes, make a wish, and know I am wishing it too.",
  "Happy birthday. You deserve every beautiful thing."
 ],
 letter:{
  to:"Dear shephali,",
  body:[
   "Today is your day, and I wanted to give you something that feels like you: quiet, beautiful, and full of light.",
   "I am grateful for every moment we share, and for the way you make ordinary days feel like something worth remembering.",
   "May this new year hold more joy than you can carry, more love than you can count, and more stars than you can wish upon.",
   "Happy birthday, always and forever."
  ],
  sign:"With all my love"
 },
 // photos that pop up behind the letter (leave "" for lily placeholders, add as many as you like)
 letterPics:["images/IMG_1.jpg","images/IMG_3.jpg","images/IMG_9.jpeg","images/IMG_10.jpeg","images/IMG_11.jpeg","images/IMG_12.jpeg"]
};
/* ===== STARS ===== */
const cv=document.getElementById("stars"),cx=cv.getContext("2d");let S=[],shoot=null;
function fit(){cv.width=innerWidth;cv.height=innerHeight;S=Array.from({length:Math.min(170,innerWidth/6)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.3,p:Math.random()*6.3,s:Math.random()*.02+.005}))}
addEventListener("resize",fit);fit();
(function draw(){cx.clearRect(0,0,cv.width,cv.height);
 for(const s of S){s.p+=s.s;cx.globalAlpha=.35+.65*Math.abs(Math.sin(s.p));cx.fillStyle="#fff";cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.3);cx.fill()}
 if(!shoot&&Math.random()<.003)shoot={x:Math.random()*cv.width,y:Math.random()*cv.height*.4,l:0};
 if(shoot){shoot.x+=9;shoot.y+=4;shoot.l++;cx.globalAlpha=1-shoot.l/40;cx.strokeStyle="#f3d98b";cx.lineWidth=1.6;cx.beginPath();cx.moveTo(shoot.x,shoot.y);cx.lineTo(shoot.x-60,shoot.y-26);cx.stroke();if(shoot.l>40)shoot=null}
 requestAnimationFrame(draw)})();
/* ===== BUILD CONTENT ===== */
document.getElementById("nm").textContent=CONFIG.name;
const rows=document.getElementById("rows");
CONFIG.memories.forEach(m=>{const r=document.createElement("div");r.className="row rise";
 r.innerHTML=`<div class="photo">${m.src?`<img src="${m.src}" alt="${m.title}">`:`<svg><use href="#lily"/></svg>`}</div><div class="wish"><span class="script">${m.title}</span><p>${m.text}</p></div>`;rows.appendChild(r)});
function words(el,txt){el.innerHTML=txt.split(" ").map(w=>`<span class="w">${w}</span>`).join(" ")}
words(document.getElementById("lt-h"),CONFIG.letter.to);
const lb=document.getElementById("lt-b");CONFIG.letter.body.forEach(t=>{const p=document.createElement("p");words(p,t);lb.appendChild(p)});
words(document.getElementById("lt-s"),CONFIG.letter.sign);
/* ===== SEQUENTIAL REVEAL ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 const t=e.target;io.unobserve(t);
 t.classList.add("in")}),{threshold:.35});
function startReveal(){document.querySelectorAll(".rise").forEach(el=>{const d=+(el.dataset.d||0);setTimeout(()=>io.observe(el),d*900)})}
document.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>b.closest("section").nextElementSibling.scrollIntoView({behavior:"smooth"}));
/* ===== PILLS ===== */
const veil=document.getElementById("veil"),nt=document.getElementById("nt");let paused=false;
const pills=CONFIG.pills.map((t,i)=>{const b=document.createElement("button");b.className="pill";b.textContent=t;
 const o={b,x:Math.random()*(innerWidth-140),y:Math.random()*(innerHeight-60),vx:(Math.random()*.5+.2)*(i%2?1:-1),vy:(Math.random()*.4+.15)*(i%3?1:-1),i};
 b.onclick=()=>{nt.textContent=CONFIG.notes[i%CONFIG.notes.length];veil.classList.add("on");paused=true};
 document.body.appendChild(b);return o});
function closeNote(){veil.classList.remove("on");paused=false}
document.getElementById("nx").onclick=closeNote;veil.onclick=e=>{if(e.target===veil)closeNote()};
addEventListener("keydown",e=>{if(e.key==="Escape")closeNote()});
(function move(){if(!paused)for(const p of pills){const w=p.b.offsetWidth,h=p.b.offsetHeight;p.x+=p.vx;p.y+=p.vy;
 if(p.x<0||p.x>innerWidth-w)p.vx*=-1;if(p.y<0||p.y>innerHeight-h)p.vy*=-1;p.b.style.transform=`translate(${p.x}px,${p.y}px)`}
 requestAnimationFrame(move)})();
/* ===== MUSIC (generated in the browser, no files needed) ===== */
let ac,master,timer,track,on=false,step=0;const mute=document.getElementById("mute");
const bars=[[261.63,329.63,392,523.25],[220,261.63,329.63,440],[174.61,220,261.63,349.23],[196,246.94,293.66,392]],pat=[0,1,2,3,2,1,2,1];
function tone(f,t,d,g,type){const o=ac.createOscillator(),e=ac.createGain();o.type=type||"sine";o.frequency.value=f;
 e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+.02);e.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(e);e.connect(master);o.start(t);o.stop(t+d+.05)}
function tick(){const t=ac.currentTime+.05,bar=bars[Math.floor(step/8)%4],k=step%8;
 const f=bar[pat[k]]*(k===7&&Math.random()<.5?2:1);tone(f,t,2.2,.16);tone(f*2,t,.9,.05);
 if(k===0){tone(bar[0]/2,t,3.6,.12,"triangle");tone(bar[1]/2,t,3.6,.07,"triangle")}step++}
function initAudio(){if(ac)return;ac=new (window.AudioContext||window.webkitAudioContext)();
 const out=ac.createGain();out.connect(ac.destination);master=ac.createGain();master.gain.value=0;
 const dl=ac.createDelay(1),fb=ac.createGain(),lp=ac.createBiquadFilter();dl.delayTime.value=.42;fb.gain.value=.42;lp.frequency.value=2200;
 master.connect(out);master.connect(dl);dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(out)}
function setMusic(v){on=v;mute.classList.toggle("muted",!v);mute.setAttribute("aria-label",v?"Turn music off":"Turn music on");
 if(CONFIG.music){if(!track){track=new Audio(CONFIG.music);track.loop=true;track.volume=.7}v?track.play().catch(()=>{}):track.pause();return}
 if(!ac)return;if(v){ac.resume();master.gain.cancelScheduledValues(ac.currentTime);master.gain.linearRampToValueAtTime(.7,ac.currentTime+2.5);
  if(!timer)timer=setInterval(tick,460)}
 else{master.gain.cancelScheduledValues(ac.currentTime);master.gain.linearRampToValueAtTime(0,ac.currentTime+.6);setTimeout(()=>{if(!on&&timer){clearInterval(timer);timer=null}},700)}}
function startMusic(){if(!CONFIG.music)initAudio();setMusic(true)}
mute.onclick=e=>{e.stopPropagation();on?setMusic(false):startMusic()};
/* ===== JASMINE TREE & FLOWERS ===== */

/* ===== ENVELOPE & LETTER ===== */
const env=document.getElementById("env"),reader=document.getElementById("reader"),pics=document.getElementById("pics");
let wt=[],pt=null,busy=false,pi=0;
function popPic(){const src=CONFIG.letterPics[pi%CONFIG.letterPics.length];const d=document.createElement("div");d.className="pop";
 d.style.left=(pi%2?Math.random()*14+1:Math.random()*14+72)+"%";d.style.top=(Math.random()*60+6)+"%";d.style.setProperty("--r",(Math.random()*20-10)+"deg");pi++;
 d.innerHTML=src?`<img src="${src}" alt="">`:`<svg><use href="#lily"/></svg>`;pics.appendChild(d);setTimeout(()=>d.remove(),6500)}
function openLetter(){if(busy)return;busy=true;env.classList.add("open");
 setTimeout(()=>{reader.classList.add("on");paused=true;
  [...reader.querySelectorAll(".w")].forEach((x,i)=>wt.push(setTimeout(()=>x.classList.add("on"),1500+i*160)));
  popPic();pt=setInterval(popPic,2200)},1800)}
function foldLetter(){if(!busy)return;reader.classList.remove("on");paused=false;wt.forEach(clearTimeout);wt=[];clearInterval(pt);
 setTimeout(()=>{pics.innerHTML="";reader.querySelectorAll(".w").forEach(x=>x.classList.remove("on"));env.classList.remove("open");busy=false},900)}
env.onclick=openLetter;env.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLetter()}};
document.getElementById("fold").onclick=foldLetter;
addEventListener("keydown",e=>{if(e.key==="Escape")foldLetter()});
/* ===== ENTRY ===== */
const gate=document.getElementById("gate");let opened=false;
function open(){if(opened)return;opened=true;startMusic();gate.classList.add("gone");startReveal()}
gate.onclick=open;gate.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")open()};
// try to autoplay immediately; browsers that allow it start the music at once
try{initAudio();ac.state==="running"&&open()}catch(e){}