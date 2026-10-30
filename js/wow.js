/* NetWorX v3 · WOW (30.10): заявка→Telegram (демо, нічого не надсилає), pinned-сторітелінг процесу. */
(()=>{
const d=document,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NX=window.NX||{},G=NX.G,ST=NX.ST;
const pad=n=>String(n).padStart(2,'0');
const now=()=>{const t=new Date();return pad(t.getHours())+':'+pad(t.getMinutes());};
const DAYS=['неділя','понеділок','вівторок','середа','четвер','пʼятниця','субота'],MON=['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];

/* ---------- заявка → Telegram (демо) ---------- */
(()=>{const root=$('[data-lead]');if(!root)return;
 const chips=$$('.lead__chips button',root),go=$('[data-lead-go]',root),lbl=$('[data-lead-lbl]',root);
 const ph=$('[data-lphone]'),stack=$('[data-lp-stack]'),clk=$('[data-lp-clock]'),big=$('[data-lp-big]'),dt=$('[data-lp-date]');
 const tick=()=>{const t=new Date();clk.textContent=big.textContent=now();dt.textContent=DAYS[t.getDay()]+', '+t.getDate()+' '+MON[t.getMonth()];};tick();setInterval(tick,15000);
 let niche='Стоматологія',n=0,busy=false;
 chips.forEach(b=>b.addEventListener('click',()=>{chips.forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-checked',x===b);});niche=b.dataset.n;}));
 const UTM={'Стоматологія':['instagram','cpc','dental_demo'],'Автосервіс':['google','cpc','auto_demo'],'Салон краси':['facebook','cpc','beauty_demo']};
 const NAMES=['Тест Тестенко','Демо Клієнт','Тестова Олена'];
 const card=()=>{const u=UTM[niche],e=d.createElement('div');e.className='ntf';
  e.innerHTML=`<div class="ntf__h"><span class="ntf__ic"><i class="lg-mark"></i></span><span>NetWorX · Заявки</span><time>щойно</time></div><div class="ntf__t">🔥 Нова заявка з сайту</div><dl><dt>Імʼя</dt><dd>${NAMES[n%NAMES.length]}<em>тест</em></dd><dt>Ніша</dt><dd>${niche}</dd><dt>UTM</dt><dd>source=${u[0]} · medium=${u[1]} · campaign=${u[2]}</dd><dt>Час</dt><dd>${now()}</dd></dl>`;return e;};
 const push=()=>{const emp=$('.lph__empty',stack);if(emp)emp.remove();
  $$('.ntf',stack).forEach(o=>{o.classList.add('ntf--old');const t=$('time',o);if(t&&t.textContent==='щойно')t.textContent=now();});
  const c=card();stack.prepend(c);n++;
  $$('.ntf',stack).slice(3).forEach(o=>o.remove());
  if(G&&!RM){G.fromTo(c,{y:-90,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.8,ease:'back.out(1.7)'});
   G.fromTo(ph,{rotate:0},{keyframes:[{rotate:-2.2,duration:.06},{rotate:2.2,duration:.08},{rotate:-1.4,duration:.08},{rotate:1,duration:.08},{rotate:0,duration:.1}]});}
  try{navigator.vibrate&&navigator.vibrate(40);}catch(e){}};
 go.addEventListener('click',()=>{if(busy)return;busy=true;go.classList.add('busy');lbl.textContent='Надсилаємо…';
  const done=()=>{push();lbl.textContent='Надіслати ще одну';go.classList.remove('busy');busy=false;};
  if(!G||RM){done();return;}
  const a=go.getBoundingClientRect(),p=ph.getBoundingClientRect();
  const f=d.createElement('div');f.className='lead__fly';f.textContent='заявка · '+niche;d.body.appendChild(f);
  const fw=f.offsetWidth,fh=f.offsetHeight,x0=a.left+a.width/2-fw/2,y0=a.top+a.height/2-fh/2,x1=p.left+p.width/2-fw/2,y1=p.top+p.height*.32;
  const tl=G.timeline({onComplete:()=>{f.remove();done();}});
  tl.set(f,{x:x0,y:y0,scale:.6,opacity:0}).to(f,{opacity:1,scale:1,duration:.18})
    .to(f,{x:x1,duration:.75,ease:'power1.inOut'},'>-0.02').to(f,{y:Math.min(y0,y1)-90,duration:.36,ease:'power2.out'},'<').to(f,{y:y1,duration:.39,ease:'power2.in'},'>')
    .to(f,{scale:.4,opacity:0,duration:.18},'>-0.1');
 });
 if(G&&!RM&&ST)G.from(ph,{y:120,rotate:-8,opacity:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:'.lead',start:'top 75%'}});
})();

/* ---------- pinned-сторітелінг процесу «Без розкачки» ---------- */
(()=>{const sec=$('[data-story]');if(!sec)return;const lis=$$('.tl li',sec),tl=$('.tl',sec),tr=$('.story__track',sec),n=lis.length;
 const set=p=>{const i=Math.min(n-1,Math.floor(p*n*0.999));tl.style.setProperty('--p',Math.min(1,p*1.05));lis.forEach((l,k)=>{l.classList.toggle('on',k<=i);l.classList.toggle('cur',k===i);});if(tr)tr.style.transform=`translateY(${-i*100/n}%)`;};
 if(!G||!ST||RM){set(1);lis.forEach(l=>l.classList.remove('cur'));return;}
 d.documentElement.classList.add('story-on');set(0);
 if(tr)tr.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';
 ST.create({trigger:sec,start:'top top',end:()=>'+='+Math.round(innerHeight*(innerWidth<=900?1.6:2)),pin:true,scrub:true,anticipatePin:1,onUpdate:s=>set(s.progress)});
 ST.sort&&ST.sort();ST.refresh();addEventListener('load',()=>{ST.sort&&ST.sort();ST.refresh();});
})();
})();
