/* Лаб NetWorX — 10 ефектів. Lazy-init через IntersectionObserver, один WebGL-контекст (лише рідкий дим), prefers-reduced-motion. */
(()=>{
const d=document,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TOUCH=matchMedia('(hover:none)').matches,MOB=()=>innerWidth<=760;
const G=window.gsap,ST=window.ScrollTrigger,SPL=window.SplitText;
if(G){G.registerPlugin(ST);if(SPL)G.registerPlugin(SPL);ST.config({ignoreMobileResize:true});}
const A=!!G&&!RM;
const lazy=(el,fn,margin='300px')=>{if(!el)return;const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();fn(el);}},{rootMargin:margin});io.observe(el);};
const vis=(el,cb)=>{const io=new IntersectionObserver(es=>cb(es[0].isIntersecting));io.observe(el);};
const pad=n=>String(n).padStart(2,'0');

/* hero */
const fontsReady=d.fonts&&d.fonts.ready?Promise.race([d.fonts.ready,new Promise(r=>setTimeout(r,1200))]):Promise.resolve();
fontsReady.then(()=>{const h=$('[data-split-chars]');if(!h||!A||!SPL)return;const s=SPL.create(h,{type:'words,chars',mask:'words'});
 G.from(s.chars,{yPercent:110,rotate:8,duration:1.1,stagger:.02,ease:'expo.out'});G.from('.lhero__s,.toc li',{y:20,opacity:0,duration:.8,stagger:.04,delay:.5,ease:'power3.out'});});

/* 01 рідкий дим — вантажимо smoke.js лише біля екрана */
lazy($('[data-lazy="smoke"]'),()=>{if(RM){return;}const s=d.createElement('script');s.src='../js/smoke.js?v=3';d.body.appendChild(s);});

/* 02 мережа */
lazy($('[data-lazy="net"]'),st=>{const cv=$('canvas',st),cx=cv.getContext('2d');let W,H,P=[],run=false,on=false;const dpr=Math.min(devicePixelRatio||1,1.5);const m={x:-1e4,y:-1e4};
 const N=()=>MOB()?42:90;
 const size=()=>{W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);P=Array.from({length:N()},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));};
 const frame=()=>{cx.clearRect(0,0,W,H);const R=MOB()?95:120;
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,dd=Math.hypot(dx,dy);if(dd<200){p.vx+=dx/dd*.06;p.vy+=dy/dd*.06;}p.vx*=.97;p.vy*=.97;p.vx+=(Math.random()-.5)*.03;p.vy+=(Math.random()-.5)*.03;p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;}
  for(let i=0;i<P.length;i++){const a=P[i];for(let j=i+1;j<P.length;j++){const b=P[j],dd=Math.hypot(a.x-b.x,a.y-b.y);if(dd<R){cx.strokeStyle=`rgba(187,212,242,${(1-dd/R)*.55})`;cx.lineWidth=1;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke();}}
   const dm=Math.hypot(a.x-m.x,a.y-m.y);if(dm<R*1.5){cx.strokeStyle=`rgba(255,255,255,${(1-dm/(R*1.5))*.8})`;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(m.x,m.y);cx.stroke();}}
  for(const p of P){cx.fillStyle='#BBD4F2';cx.beginPath();cx.arc(p.x,p.y,2,0,6.283);cx.fill();}
  if(on&&!RM)requestAnimationFrame(frame);else run=false;};
 const start=()=>{if(!run&&on){run=true;requestAnimationFrame(frame);}};
 const mv=(x,y)=>{const r=cv.getBoundingClientRect();m.x=x-r.left;m.y=y-r.top;};
 st.addEventListener('pointermove',e=>mv(e.clientX,e.clientY));st.addEventListener('pointerleave',()=>{m.x=m.y=-1e4;});
 st.addEventListener('touchmove',e=>{const t=e.touches[0];t&&mv(t.clientX,t.clientY);},{passive:true});
 size();addEventListener('resize',()=>{size();if(RM)frame();});
 if(RM){on=false;frame();return;}vis(st,v=>{on=v;start();});});

/* 03 текст по літерах */
lazy($('[data-lazy="type"]'),st=>{const el=$('[data-type]',st),txt=el.textContent;let mode='rise',sp=null;
 const AB='АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ0123456789';
 const play=()=>{if(!A||!SPL)return;if(sp)sp.revert();el.textContent=txt;
  if(mode==='scramble'){sp=SPL.create(el,{type:'words,chars',charsClass:'ch',wordsClass:'wd'});sp.chars.forEach((c,i)=>{const fin=c.textContent;let k=0;const n=8+i%6;const iv=setInterval(()=>{c.textContent=k++>=n?fin:AB[Math.random()*AB.length|0];if(k>n)clearInterval(iv);},40+i*2);});return;}
  sp=SPL.create(el,{type:'words,chars',charsClass:'ch',wordsClass:'wd'});
  if(mode==='rise')G.from(sp.chars,{yPercent:115,duration:1,stagger:.025,ease:'expo.out'});
  else G.from(sp.chars,{y:-60,rotate:()=>G.utils.random(-30,30),opacity:0,duration:1.2,stagger:{each:.03,from:'center'},ease:'elastic.out(1,.5)'});};
 $$('[data-mode]',st).forEach(b=>b.addEventListener('click',()=>{$$('[data-mode]',st).forEach(x=>x.classList.toggle('on',x===b));mode=b.dataset.mode;play();}));
 fontsReady.then(()=>lazy(el,play,'-20% 0px'));});

/* 04 горизонтальний скрол */
(()=>{const hs=$('[data-lazy="hs"]');if(!hs)return;const tr=$('.hs__track',hs);
 if(!A){hs.style.overflowX='auto';return;}
 const dist=()=>Math.max(0,tr.scrollWidth-hs.clientWidth);
 G.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#fx4',start:()=>MOB()?'top 70px':'top 80px',end:()=>'+='+dist(),pin:true,scrub:.6,invalidateOnRefresh:true,anticipatePin:1}});
})();

/* 05 збірка авто */
(()=>{const st=$('[data-lazy="car"]');if(!st)return;const lb=$$('.car__lbl span,.car__lbl b',st);
 if(!A){lb.forEach(l=>l.classList.add('on'));return;}
 const tl=G.timeline({scrollTrigger:{trigger:st,start:'top 80%',end:'center 45%',scrub:.8,onUpdate:s=>{const k=s.progress;lb.forEach((l,i)=>l.classList.toggle('on',k>=(i+.6)/lb.length));}}});
 tl.from('.p--body',{y:-120,opacity:0,rotate:-6,transformOrigin:'50% 50%',duration:1},0)
   .from('.p--win',{y:-200,x:40,opacity:0,duration:1},.35)
   .from('.p--line',{x:-300,opacity:0,duration:.8},.6)
   .from('.p--light',{scale:0,opacity:0,transformOrigin:'50% 50%',duration:.6},.9)
   .from('.p--w1',{x:-260,rotate:-360,svgOrigin:'105 148',opacity:0,duration:1},1)
   .from('.p--w2',{x:260,rotate:360,svgOrigin:'300 148',opacity:0,duration:1},1);
})();

/* 06 було/стало */
lazy($('[data-lazy="ba"]'),f=>{const box=$('.ba__box',f),inp=$('input',f);const set=p=>box.style.setProperty('--p',p+'%');set(50);inp.addEventListener('input',()=>set(inp.value));
 if(A){const o={p:50};G.timeline({delay:.3}).to(o,{p:18,duration:.9,ease:'power2.inOut',onUpdate:()=>{set(o.p);inp.value=o.p;}}).to(o,{p:82,duration:1.2,ease:'power2.inOut',onUpdate:()=>{set(o.p);inp.value=o.p;}}).to(o,{p:50,duration:.9,ease:'power2.inOut',onUpdate:()=>{set(o.p);inp.value=o.p;}});}},'-25% 0px');

/* 07 вибір кольору */
lazy($('[data-lazy="color"]'),st=>{const sv={nails:$('.col--nails',st),house:$('.col--house',st)};let cur='nails';
 const col=c=>{Object.values(sv).forEach(s=>s.style.setProperty('--pc',c));if(A)G.fromTo($('.paint',sv[cur]),{scale:.96,transformOrigin:'50% 50%'},{scale:1,duration:.5,ease:'back.out(3)'});};
 $$('.sw button',st).forEach(b=>b.addEventListener('click',()=>{$$('.sw button',st).forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-checked',x===b);});col(b.dataset.c);}));
 $$('[data-obj]',st).forEach(b=>b.addEventListener('click',()=>{$$('[data-obj]',st).forEach(x=>x.classList.toggle('on',x===b));cur=b.dataset.obj;Object.entries(sv).forEach(([k,s])=>s.hidden=k!==cur);if(A)G.from(sv[cur],{y:20,opacity:0,duration:.5,ease:'power3.out'});}));
 col('#1B237E');});

/* 08 калькулятор */
lazy($('[data-lazy="calc"]'),st=>{const a=$('[data-i="a"]',st),b=$('[data-i="b"]',st),oa=$('[data-o="a"]',st),ob=$('[data-o="b"]',st),res=$('[data-res]',st),bar=$('[data-bar]',st);const o={v:0};
 const upd=(first)=>{oa.textContent=a.value;ob.textContent=b.value;const v=Math.round(a.value*b.value/100);
  if(A){G.to(o,{v,duration:first?1.6:.6,ease:'power3.out',onUpdate:()=>res.textContent=Math.round(o.v)});G.to(bar,{width:b.value+'%',duration:first?1.6:.6,ease:'power3.out'});}
  else{res.textContent=v;bar.style.width=b.value+'%';}};
 a.addEventListener('input',()=>upd());b.addEventListener('input',()=>upd());upd(true);},'-20% 0px');

/* 09 3D-нахил + гіроскоп */
lazy($('[data-lazy="tilt"]'),wr=>{const cs=$$('.tc',wr);if(!G)return;
 const qs=cs.map(c=>({c,rx:G.quickTo(c,'rotationX',{duration:.5,ease:'power3'}),ry:G.quickTo(c,'rotationY',{duration:.5,ease:'power3'})}));
 qs.forEach(({c,rx,ry})=>{c.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;rx(-(y-.5)*16);ry((x-.5)*18);c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%');});
  c.addEventListener('pointerleave',()=>{rx(0);ry(0);});});
 if(RM)return;let inView=false;vis(wr,v=>inView=v);
 const ask=()=>{try{if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)DeviceOrientationEvent.requestPermission().catch(()=>{});}catch(e){}};
 wr.addEventListener('pointerdown',ask,{once:true});
 addEventListener('deviceorientation',e=>{if(!inView||e.gamma==null||!TOUCH)return;wr.classList.add('gyro');const gx=Math.max(-25,Math.min(25,e.gamma)),gy=Math.max(-25,Math.min(25,e.beta-45));
  qs.forEach(({c,rx,ry})=>{rx(-gy*.5);ry(gx*.6);c.style.setProperty('--gx',50+gx*2+'%');c.style.setProperty('--gy',50+gy*2+'%');});});});

/* 10 онлайн-запис → сповіщення (демо) */
lazy($('[data-lazy="book"]'),st=>{const dg=$('[data-g="d"]',st),NM=['нд','пн','вт','ср','чт','пт','сб'];let t=new Date(),k=0;
 while(k<4){t.setDate(t.getDate()+1);if(t.getDay()===0)continue;const b=d.createElement('button');b.textContent=`${NM[t.getDay()]} ${pad(t.getDate())}.${pad(t.getMonth()+1)}`;if(!k)b.classList.add('on');dg.appendChild(b);k++;}
 $$('.chips',st).forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',g).forEach(x=>x.classList.toggle('on',x===b));}));
 const go=$('[data-bk]',st),n=$('[data-bk-ntf]',st),em=$('.bk__empty',st);
 go.addEventListener('click',()=>{const g=s=>$(`[data-g="${s}"] .on`,st).textContent;$('[data-f="s"]',n).textContent=g('s');$('[data-f="w"]',n).textContent=g('d')+', '+g('t');
  if(em)em.remove();n.hidden=false;go.textContent='Записано ✓';go.classList.add('ok');
  if(A)G.fromTo(n,{y:-40,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.8,ease:'back.out(1.8)'});
  setTimeout(()=>{go.textContent='Записатись';go.classList.remove('ok');},2600);});});

if(ST){addEventListener('load',()=>ST.refresh());}
})();
