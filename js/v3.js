/* NetWorX home v3 — сигнатура: фірмова хвиля (як обкладинка брендбука) → графік росту */
(()=>{
const d=document,H=d.documentElement,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TOUCH=matchMedia('(hover:none)').matches,MOB=()=>innerWidth<=900;
const NX=window.NX||{},G=NX.G,ST=NX.ST;
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');
if(!G||RM)H.classList.add('no-motion');

/* ---------- WebGL brand waves ---------- */
const FS=`precision mediump float;
uniform vec2 R;uniform float T;uniform vec2 M;uniform float S;uniform float K;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/R;vec2 p=(gl_FragCoord.xy-.5*R)/min(R.x,R.y*1.6);
 float t=T*.045;
 vec2 m=(M-.5*R)/min(R.x,R.y*1.6);vec2 dm=p-m;float mi=exp(-dot(dm,dm)*7.)*K;
 p+=dm*mi*.35;
 vec2 q=vec2(fbm(p*.9+vec2(0.,t)),fbm(p*.9+vec2(5.2,1.3)-t));
 vec2 r=vec2(fbm(p*1.05+1.9*q+vec2(1.7,9.2)+t*.6),fbm(p*1.05+1.9*q+vec2(8.3,2.8)-t*.45));
 float f=fbm(p*.85+2.4*r+vec2(0.,-S*.9));
 float band=sin((f*2.1+r.x*1.5+uv.x*.22-S*.6)*6.2831);
 float rib=smoothstep(-.2,1.,band)*smoothstep(.22,.68,f);
 float core=pow(smoothstep(.5,1.,band),1.6)*smoothstep(.38,.72,f);
 vec3 ink=vec3(.02,.05,.05),navy=vec3(.043,.094,.286),royal=vec3(.16,.2,.62),sky=vec3(.78,.86,.97);
 vec3 c=ink;
 c=mix(c,navy,smoothstep(.0,.55,rib));
 c=mix(c,royal,smoothstep(.35,.95,rib));
 c=mix(c,sky,core*.92);
 c+=sky*mi*.12;
 float side=smoothstep(.05,.95,uv.x*.85+(1.-uv.y)*.45);c=mix(ink,c,.38+.62*side);
 c*=1.-S*.55;
 gl_FragColor=vec4(c,1.);}`;
function waves(cv,o={}){if(!cv)return null;const gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'});if(!gl){cv.style.background='radial-gradient(60% 80% at 80% 100%,#1B237E,transparent 70%),#091413';return null;}
 const sh=(t,s)=>{const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);return x;};
 const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
 if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){return null;}gl.useProgram(pr);
 const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);const a=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 const U={};['R','T','M','S','K'].forEach(k=>U[k]=gl.getUniformLocation(pr,k));
 const st={s:0,k:o.k??1,mx:.72,my:.35,tx:.72,ty:.35,run:false,t0:performance.now(),off:o.off||0};
 const scale=()=>MOB()?.45:.6;
 const rs=()=>{const sc=scale();cv.width=Math.max(2,cv.clientWidth*sc|0);cv.height=Math.max(2,cv.clientHeight*sc|0);gl.viewport(0,0,cv.width,cv.height);draw(st.last||0);};
 function draw(time){st.mx+=(st.tx-st.mx)*.06;st.my+=(st.ty-st.my)*.06;
  gl.uniform2f(U.R,cv.width,cv.height);gl.uniform1f(U.T,(RM?8:time/1000)+st.off);gl.uniform2f(U.M,st.mx*cv.width,(1-st.my)*cv.height);gl.uniform1f(U.S,st.s);gl.uniform1f(U.K,st.k);gl.drawArrays(gl.TRIANGLES,0,3);}
 function loop(now){if(!st.run)return;st.last=now;draw(now);requestAnimationFrame(loop);}
 new IntersectionObserver(e=>{const v=e[0].isIntersecting;if(v&&!st.run&&!RM){st.run=true;requestAnimationFrame(loop);}else if(!v)st.run=false;}).observe(cv);
 addEventListener('resize',rs);rs();
 if(!TOUCH&&o.mouse)(o.mouse).addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();st.tx=(e.clientX-r.left)/r.width;st.ty=(e.clientY-r.top)/r.height;});
 st.draw=()=>draw(st.last||0);return st;}

/* 30.10: фон hero — «рідкий дим» (js/smoke.js, WebGL-Fluid-Simulation, MIT); хвиля waves() лишилась у коді, але на hero не запускається */
const hero=$('.hero');const HW=null;

/* ---------- hero: char split + reveal ---------- */
const heroIntro=()=>{const SPL=window.SplitText;if(SPL&&G)G.registerPlugin(SPL);
$$('[data-chars]').forEach(el=>{if(SPL){SPL.create(el,{type:'words,chars',wordsClass:'cw',charsClass:'c',reduceWhiteSpace:false});return;}const words=el.textContent.split(' ');el.textContent='';words.forEach((w,i)=>{const cw=d.createElement('span');cw.className='cw';[...w].forEach(ch=>{const c=d.createElement('span');c.className='c';c.textContent=ch;cw.appendChild(c);});el.appendChild(cw);if(i<words.length-1)el.appendChild(d.createTextNode(' '));});});
$$('[data-chars]').forEach(el=>el.closest('.hero__t').classList.add('split'));
if(G&&!RM){
 const tl=G.timeline({delay:.15,defaults:{ease:'expo.out'}});
 tl.fromTo('.hero__t .c',{yPercent:105,rotate:10,transformOrigin:'0% 100%'},{y:0,yPercent:0,rotate:0,duration:1.25,stagger:.028})
   .to('.hand__t',{clipPath:'inset(-20% 0% -20% 0)',duration:1.1,ease:'power2.inOut'},'-=.55')
   .to('.hand__u path',{strokeDashoffset:0,duration:.9,ease:'power2.inOut'},'-=.35')
   .to('[data-hero-side]',{opacity:1,y:0,duration:1,stagger:.1,startAt:{y:24}},'-=1.1')
   .from('.hdr',{opacity:0,duration:.8,clearProps:'opacity'},0.2);
 if(HW)G.fromTo(HW,{k:0},{k:1,duration:2.4,ease:'power2.out'});
 /* scroll: хвиля «стікає» вниз, заголовок відпливає */
 G.to('.hero__in',{yPercent:-14,opacity:.0,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom 15%',scrub:true}});
 if(HW)ST.create({trigger:hero,start:'top top',end:'bottom top',onUpdate:s=>{HW.s=s.progress;if(RM)HW.draw();}});
 /* легкий паралакс рядків від курсора */
 if(!TOUCH){const l=$$('.hero__t .ln');hero.addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;l.forEach((n,i)=>G.to(n,{x:x*(i?-14:10),y:y*6,duration:1.2,ease:'power3.out'}));});}
}
if(ST){ST.sort&&ST.sort();ST.refresh();}};
(d.fonts&&d.fonts.ready?Promise.race([d.fonts.ready,new Promise(r=>setTimeout(r,1200))]):Promise.resolve()).then(heroIntro);

/* ---------- URL → бот (чесно: без «обробки», одразу відкриваємо бот з контекстом preview, як у v2) ---------- */
(()=>{const f=$('[data-url]');if(!f)return;const inp=$('input',f),btn=$('button',f);
 inp.addEventListener('input',()=>{if(/^https?:\/\//i.test(inp.value))inp.value=inp.value.replace(/^https?:\/\//i,'');});
 f.addEventListener('submit',e=>{e.preventDefault();const v=inp.value.trim();
  if(!v){f.classList.remove('err');void f.offsetWidth;f.classList.add('err');inp.focus();return;}
  f.classList.add('done');btn.childNodes[0].nodeValue='Прийнято ✓ ';window.NXBot&&NXBot.open('preview',v);});
})();

/* ---------- Було → стало: повзунок порівняння ---------- */
$$('[data-cmp]').forEach(c=>{const box=$('.cmp__box',c),inp=$('.cmp__in',c);const set=p=>{box.style.setProperty('--p',p+'%');};set(50);
 inp.addEventListener('input',()=>set(inp.value));
 if(!TOUCH){let drag=false;const mv=e=>{const r=box.getBoundingClientRect();const p=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));inp.value=p;set(p);};
  box.addEventListener('pointerdown',e=>{drag=true;mv(e);});addEventListener('pointerup',()=>drag=false);box.addEventListener('pointermove',e=>{if(drag)mv(e);});}
 if(G&&!RM){const o={p:50};ST.create({trigger:c,start:'top 70%',once:true,onEnter:()=>G.timeline().to(o,{p:22,duration:.9,ease:'power2.inOut',onUpdate:()=>{set(o.p);inp.value=o.p;}}).to(o,{p:50,duration:1.1,ease:'power2.inOut',onUpdate:()=>{set(o.p);inp.value=o.p;}})});}
});

/* ---------- Кейс Dronehub по кварталах (реальні дані зі слайду кейсу) ---------- */
(()=>{const sec=$('.dh');if(!sec)return;
 const Q=[['3 кв. 2024',798324.55,15036.59],['4 кв. 2024',2325270.39,47559.60],['1 кв. 2025',2975340.88,63734.97],['2 кв. 2025',1418687.67,67381.50],['3 кв. 2025',2559742.03,73317.51]];
 const TOTAL=10077365.52,MAX=2975340.88,short=v=>v>=1e6?(v/1e6).toFixed(2).replace('.',',')+' млн':Math.round(v/1e3)+' тис.';
 const host=$('[data-dh-bars]'),num=$('[data-dh-n]'),st=$$('.dst');
 const bars=Q.map(([q,v,s])=>{const b=d.createElement('div');b.className='dhb';b.innerHTML=`<div class="dhb__v"><b>${short(v)}</b><i style="--h:${v/MAX*100}%"></i></div><div class="dhb__s"><i style="--h:${(s/MAX*100).toFixed(2)}%"></i></div><span class="mono">${q}</span><small>витрати ${Math.round(s/1e3)} тис. ₴</small>`;host.appendChild(b);return b;});
 let last=-2;const set=p=>{p=Math.max(0,Math.min(1,p));const k=p*Q.length;let cum=0;
  bars.forEach((b,i)=>{const f=Math.max(0,Math.min(1,k-i));b.style.setProperty('--f',f);b.classList.toggle('on',f>0.98);cum+=Q[i][1]*f;});
  num.textContent=fmt(p>=.999?TOTAL:cum);const qi=Math.min(Q.length-1,Math.floor(k-0.02));
  if(qi!==last){last=qi;st.forEach(e=>e.classList.toggle('on',qi>=+e.dataset.q));}};
 if(!G||RM){set(1);return;}
 set(0);const mm=G.matchMedia();
 mm.add('(min-width:901px)',()=>{const s=ST.create({trigger:sec,start:'top top',end:'+=1800',pin:'.dh__pin',scrub:.6,anticipatePin:1,refreshPriority:10,onUpdate:x=>set(x.progress*1.1)});return()=>s.kill();});
 mm.add('(max-width:900px)',()=>{const s=ST.create({trigger:'.dh__chart',start:'top 80%',end:'bottom 40%',scrub:.6,onUpdate:x=>set(x.progress*1.1)});return()=>s.kill();});
})();

/* ---------- Ви бачите все: реальні дані проєкту (назву приховано) ---------- */
(()=>{const rep=$('[data-rep]'),day=$('[data-day]');if(!rep)return;
 const M=[['бер',18814,64,64,179627],['кві',29058,128,128,321394],['тра',51072,355,341,868475],['чер',73122,363,349,822685],['лип',87445,344,305,727781],['сер',87086,340,360,898407],['вер',111984,394,395,1233444],['жов*',149689,495,473,1478074]];
 const mx=Math.max(...M.map(m=>m[4]));
 rep.innerHTML='<div class="rep__g">'+M.map(m=>`<div class="rep__c"><i class="rbv" style="--h:${m[4]/mx*100}%"></i><i class="rbs" style="--h:${m[1]/mx*100}%"></i><span>${m[0]}</span></div>`).join('')+'</div>'+
  `<table class="rep__t"><thead><tr><th></th><th>витрати</th><th>продажі</th><th>виручка</th><th>ROAS</th></tr></thead><tbody>${[M[0],M[6],M[7]].map(m=>`<tr><td>${{'бер':'березень','вер':'вересень','жов*':'жовтень*'}[m[0]]}</td><td>${fmt(m[1])} ₴</td><td>${m[3]}</td><td>${fmt(m[4])} ₴</td><td>${(m[4]/m[1]).toFixed(1).replace('.',',')}</td></tr>`).join('')}</tbody></table><p class="rep__n mono">* жовтень — 1–25.10 · продажі й виручка — з таблиці проєкту</p>`;
 const D=[[1,4079,27959],[2,4800,42789],[3,5625,34857],[4,5151,48098],[5,4923,53182],[6,4590,57920],[7,3319,32007],[8,5698,76438],[9,6043,44179],[10,5702,30945],[11,6250,34559],[12,5848,75162],[13,5407,84367],[14,6587,72666],[15,6070,68224],[16,5498,29928],[17,7327,79504],[18,6416,75559],[19,6976,114138],[20,6263,87433],[21,7178,64278],[22,7087,65852],[23,7211,59079],[24,7977,58823],[25,7664,60128]];
 const W=300,Hh=120,dm=125000,x=i=>i/(D.length-1)*W,y=v=>Hh-v/dm*Hh;
 const path=k=>D.map((p,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(p[k]).toFixed(1)).join(' ');
 const mxi=D.reduce((a,p,i)=>p[2]>D[a][2]?i:a,0);
 day.innerHTML=`<svg viewBox="0 0 ${W} ${Hh+14}" preserveAspectRatio="none"><path class="day__a" d="${path(2)} L${W} ${Hh} L0 ${Hh}Z"/><path class="day__r" d="${path(2)}"/><path class="day__s" d="${path(1)}"/></svg><div class="day__pk" style="left:${x(mxi)/W*100}%;top:${y(D[mxi][2])/(Hh+14)*100}%"><b>${fmt(D[mxi][2])} ₴</b><span>${D[mxi][0]}.10 · витрати ${fmt(D[mxi][1])} ₴</span></div><div class="day__x mono"><span>1.10</span><span>13.10</span><span>25.10</span></div>`;
 if(G&&!RM){G.from('.rep__c i',{scaleY:0,transformOrigin:'50% 100%',stagger:.04,duration:1,ease:'expo.out',scrollTrigger:{trigger:rep,start:'top 80%'}});
  $$('.day__r,.day__s').forEach(p=>{const L=p.getTotalLength();G.fromTo(p,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:2,ease:'power2.inOut',scrollTrigger:{trigger:day,start:'top 80%'}});});
  G.from('.pan',{y:60,opacity:0,stagger:.1,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:'.hw__g',start:'top 85%'}});}
})();

/* ---------- Cases: великі цифри рахуються, світло за курсором ---------- */
(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,raw=el.dataset.cn;const m=raw.match(/^([^\d]*)([\d]+)(?:,(\d+))?$/);if(!m||!G||RM){el.textContent=raw;return;}
  const pre=m[1],dec=(m[3]||'').length,val=parseFloat(m[2]+(m[3]?'.'+m[3]:''));const o={v:0};
  G.to(o,{v:val,duration:1.8,ease:'power3.out',onUpdate:()=>{el.textContent=pre+o.v.toFixed(dec).replace('.',',');}});}),{threshold:.6});
 $$('[data-cn]').forEach(el=>{if(G&&!RM){const m=el.dataset.cn.match(/^([^\d]*)/);el.textContent=m[1]+'0';}io.observe(el);});
 if(!TOUCH)$$('.cc').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px');}));
})();

/* trust counters */
(()=>{const els=$$('[data-tn]');if(!G||RM)return;els.forEach(e=>{const t=+e.dataset.tn,o={v:0};e.textContent='0';G.to(o,{v:t,duration:2,ease:'power3.out',onUpdate:()=>e.textContent=Math.round(o.v),scrollTrigger:{trigger:'.trust',start:'top 92%'}});});})();
if(ST){ST.sort&&ST.sort();ST.refresh();addEventListener('load',()=>{ST.sort&&ST.sort();ST.refresh();});}
})();
