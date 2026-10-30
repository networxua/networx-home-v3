/* NetWorX home v3 — motion & UI */
(()=>{
const d=document,H=d.documentElement,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TOUCH=matchMedia('(hover:none)').matches,MOB=()=>innerWidth<=900;
const STATIC=/[?&]static/.test(location.search);const G=STATIC?null:window.gsap,ST=STATIC?null:window.ScrollTrigger;
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');

/* ---- UI that works without GSAP ---- */
const hdr=$('.hdr');let ly=0;
addEventListener('scroll',()=>{const y=scrollY;hdr.classList.toggle('sc',y>30);hdr.classList.toggle('hide',y>ly&&y>500&&!H.classList.contains('mnav-on'));ly=y;
 const p=$('.prog i');if(p)p.style.transform=`scaleX(${y/(H.scrollHeight-innerHeight)})`;},{passive:true});
$('.burger').onclick=()=>H.classList.toggle('mnav-on');
$$('.mnav a').forEach(a=>a.addEventListener('click',()=>H.classList.remove('mnav-on')));

/* rotating hero word */
const rw=$$('.rot__w');let ri=0;if(G&&rw.length)G.set(rw,{opacity:(i)=>i?0:1});
if(rw.length)setInterval(()=>{const a=rw[ri];ri=(ri+1)%rw.length;const b=rw[ri];
 if(G){a.classList.remove('is-on');b.classList.add('is-on');G.fromTo(a,{yPercent:0,opacity:1},{yPercent:-100,opacity:0,duration:.6,ease:'power3.in'});G.fromTo(b,{yPercent:100,opacity:0},{yPercent:0,opacity:1,duration:.8,delay:.35,ease:'expo.out'});}
 else{a.classList.remove('is-on');b.classList.add('is-on');}},2600);

/* quiz */
const q=$('[data-quiz]');if(q){const steps=$$('.qs',q),bar=$('[data-q-bar]',q),lab=$('[data-q-step]',q),back=$('[data-q-back]',q),next=$('[data-q-next]',q);let k=0;
 const go=n=>{steps[k].classList.remove('is-on');k=n;steps[k].classList.add('is-on');bar.style.width=Math.min(100,(k+1)/3*100)+'%';lab.textContent=k<3?`Крок ${k+1} з 3`:'Готово';back.hidden=k===0||k===3;next.hidden=k>=2;};
 go(0);$$('input[type=radio]',q).forEach(r=>r.addEventListener('change',()=>setTimeout(()=>go(k+1),280)));
 next.onclick=()=>{if($('input:checked',steps[k]))go(k+1);else{G&&G.fromTo(steps[k],{x:-8},{x:0,duration:.4,ease:'elastic.out(1,.3)'});}};back.onclick=()=>go(k-1);
 q.addEventListener('submit',e=>{e.preventDefault();let ok=true;$$('.inp input[required]',q).forEach(i=>{const bad=!i.value.trim();i.parentNode.classList.toggle('err',bad);if(bad)ok=false;});if(ok)go(3);});}

/* reviews drag */
const tr=$('[data-drag]');if(tr&&!TOUCH){let down=false,sx=0,sl=0;tr.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('drag');});
 addEventListener('pointerup',()=>{down=false;tr.classList.remove('drag');});tr.addEventListener('pointermove',e=>{if(down)tr.scrollLeft=sl-(e.clientX-sx);});}

/* phone chat demo */
(()=>{const box=$('[data-phone-chat]');if(!box)return;const S=[['in','Добрий вечір! Скільки коштує налаштування реклами для салону?'],['bot','Вітаю! Підкажу 🙂 Яка у вас ніша і місто?'],['in','Бʼюті-салон, Київ'],['bot','Дякую! Який бюджет на рекламу на місяць плануєте?'],['in','Близько 800 $'],['bot','Чудово, з таким бюджетом є з чим працювати. Записати вас на безкоштовний розбір? Завтра є 11:00 або 15:30'],['in','15:30 підходить'],['sys','✓ Запис створено · заявка в CRM']];
 let i=0,started=false;const step=()=>{if(i>=S.length){setTimeout(()=>{box.innerHTML='';i=0;step();},5000);return;}const[t,m]=S[i++];const e=d.createElement('div');e.className='pm'+(t==='in'?' pm--me':t==='sys'?' pm--sys':'');e.textContent=m;box.appendChild(e);while(box.children.length>7)box.firstChild.remove();setTimeout(step,t==='in'?1300:2000);};
 new IntersectionObserver(es=>{if(es[0].isIntersecting&&!started){started=true;step();}}).observe(box);})();
$$('[data-open-bot]').forEach(b=>b.onclick=()=>window.NXBot&&NXBot.open());

/* ---- no GSAP fallback ---- */
const intro=$('.intro');
if(!G||!ST){window.NX={};intro&&intro.remove();$$('[data-count]').forEach(e=>e.textContent=e.dataset.count);return;}
G.registerPlugin(ST);ST.config({ignoreMobileResize:true});

let lenis=null;
if(!RM&&!TOUCH&&window.Lenis){lenis=new Lenis({lerp:.1});lenis.on('scroll',ST.update);G.ticker.add(t=>lenis.raf(t*1000));G.ticker.lagSmoothing(0);
 $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-70,duration:1.4});}}));}

/* split words */
function split(el){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(' '));return;}const w=d.createElement('span');w.className='w';const i=d.createElement('span');i.textContent=p;w.appendChild(i);f.appendChild(w);});c.replaceWith(f);}else if(c.nodeType===1&&!c.classList.contains('w'))walk(c);});};walk(el);return $$('.w>span',el);}

window.NX={G,ST,lenis,split};
/* split headings reveal */
$$('[data-split]').forEach(h=>{const w=split(h);G.from(w,{yPercent:110,duration:1.1,stagger:.035,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 85%'}});});
$$('.kick').forEach(k=>G.from(k,{opacity:0,x:-20,duration:.8,scrollTrigger:{trigger:k,start:'top 90%'}}));

/* marquee speed by scroll velocity */
/* marquee: постійна повільна швидкість, без привʼязки до скролу */

/* pains: strike scrub */
$$('.pain').forEach(p=>{const s=$('s',p);G.fromTo(s,{'--st':'0%'},{'--st':'100%',ease:'none',scrollTrigger:{trigger:p,start:'top 75%',end:'top 40%',scrub:true}});
 G.from($('.pain__s',p),{opacity:0,y:20,duration:.8,scrollTrigger:{trigger:p,start:'top 50%'}});});

/* case tilt */
if(!TOUCH)$$('.cc').forEach(c=>{c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;G.to(c,{rotateY:x*6,rotateX:-y*6,transformPerspective:900,duration:.5});});c.addEventListener('pointerleave',()=>G.to(c,{rotateY:0,rotateX:0,duration:.7}));});

/* custom cursor */
const cur=$('.cursor');if(cur&&!TOUCH){const xs=G.quickTo(cur,'x',{duration:.35,ease:'power3'}),ys=G.quickTo(cur,'y',{duration:.35,ease:'power3'});addEventListener('pointermove',e=>{xs(e.clientX);ys(e.clientY);});
 $$('[data-cur]').forEach(el=>{el.addEventListener('pointerenter',()=>cur.classList.add('on'));el.addEventListener('pointerleave',()=>cur.classList.remove('on'));});}

/* services: floating image — ховаємо при виході з рядка/секції, скролі, виході курсора з вікна; на touch вимкнено */
const fl=$('.svc__float');if(fl&&!TOUCH&&matchMedia('(hover:hover) and (pointer:fine)').matches){const im=$('img',fl),fx=G.quickTo(fl,'x',{duration:.5,ease:'power3'}),fy=G.quickTo(fl,'y',{duration:.5,ease:'power3'});let on=false;
 const hide=(now)=>{on=false;G.killTweensOf(fl,'opacity,scale,rotate');if(now===true)G.set(fl,{opacity:0,scale:.6,rotate:0});else G.to(fl,{opacity:0,scale:.6,rotate:0,duration:.25});fl.classList.remove('on');};
 $$('.srv').forEach(s=>{s.addEventListener('pointerenter',e=>{on=true;im.src=s.dataset.img;fl.classList.add('on');G.set(fl,{x:e.clientX+30,y:e.clientY-100});G.to(fl,{opacity:1,scale:1,rotate:-4,duration:.4});});s.addEventListener('pointerleave',hide);s.addEventListener('pointermove',e=>{if(!on)return;fx(e.clientX+30);fy(e.clientY-100);});});
 const sec=$('.svc');sec.addEventListener('pointerleave',()=>hide(true));
 addEventListener('scroll',()=>{if(on||+G.getProperty(fl,'opacity')>0)hide(true);},{passive:true});
 addEventListener('wheel',()=>{if(on)hide(true);},{passive:true});
 d.addEventListener('pointerleave',()=>hide(true));addEventListener('blur',()=>hide(true));
 new IntersectionObserver(es=>{if(!es[0].isIntersecting)hide(true);}).observe(sec);}
else if(fl)fl.remove();
G.from('.srv',{opacity:0,y:40,stagger:.08,duration:.9,ease:'expo.out',scrollTrigger:{trigger:'.svc__list',start:'top 80%'}});

G.from('.safe__i',{y:40,opacity:0,stagger:.08,duration:.9,ease:'expo.out',scrollTrigger:{trigger:'.safe',start:'top 85%'}});
G.from('.cc',{y:80,opacity:0,stagger:.1,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.cs__g',start:'top 85%'}});
/* sites: stagger + parallax */
$$('.site').forEach((s,i)=>{G.from(s,{y:120,rotate:i%2?3:-3,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 92%'}});
 G.fromTo($('img',s),{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:s,scrub:true}});});

/* phone */
G.from('.phone',{y:120,rotate:12,opacity:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:'.bot',start:'top 75%'}});

/* reviews */
G.from('.rq',{y:60,opacity:0,stagger:.1,duration:1,ease:'expo.out',scrollTrigger:{trigger:'.rvg',start:'top 85%'}});

document.querySelectorAll('.ring--tape').forEach(r=>new IntersectionObserver(e=>r.classList.toggle('in',e[0].isIntersecting)).observe(r));
/* team + dna */
$$('.tg__f img').forEach(i=>G.fromTo(i,{yPercent:-10},{yPercent:0,ease:'none',scrollTrigger:{trigger:i.parentNode,scrub:true}}));
G.from('.tg__f,.tg__q',{clipPath:'inset(100% 0 0 0)',duration:1.3,stagger:.1,ease:'expo.inOut',scrollTrigger:{trigger:'.tg',start:'top 80%'}});
G.from('.dna__i',{y:40,opacity:0,stagger:.08,duration:.9,ease:'expo.out',scrollTrigger:{trigger:'.dna',start:'top 85%'}});

/* timeline */
const tl=$('.tl');if(tl&&!tl.closest('[data-story]')){const lis=$$('li',tl);ST.create({trigger:tl,start:'top 75%',end:'bottom 55%',scrub:.5,onUpdate:s=>{tl.style.setProperty('--p',s.progress);lis.forEach((l,i)=>l.classList.toggle('on',s.progress>=i/(lis.length-1)-.02));}});
 G.from(lis,{y:30,opacity:0,stagger:.1,duration:.8,scrollTrigger:{trigger:tl,start:'top 80%'}});}

/* cta big word */
G.fromTo('.cta__big',{xPercent:12},{xPercent:-12,ease:'none',scrollTrigger:{trigger:'.cta',scrub:true}});

/* magnetic buttons */
if(!TOUCH)$$('[data-mag],.btn--big').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();G.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.4});});b.addEventListener('pointerleave',()=>G.to(b,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}));});

addEventListener('load',()=>ST.refresh());
})();
