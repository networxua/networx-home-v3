/* NetWorX — міні-бот на кнопках (без AI). ДЕМО: лише фронтенд, нічого не надсилає.
   Усі факти — з цього ж сайту: послуги, ціни в блоці «Ціни відкрито», етапи «Без розкачки», кейси, 105+ проєктів, 30 людей, партнер Google і Meta. */
(()=>{
const d=document,$=(s,c=d)=>c.querySelector(s);
const cb=$('[data-cb]');if(!cb)return;
const body=$('[data-cb-body]'),btn=$('[data-cb-btn]'),teaser=$('[data-cb-teaser]'),form=$('[data-cb-form]');
if(form)form.remove();
let started=false;
const scroll=()=>body.scrollTo({top:body.scrollHeight,behavior:'smooth'});
const add=(t,me)=>{const e=d.createElement('div');e.className='pm'+(me?' pm--me':'');e.innerHTML=t;body.appendChild(e);scroll();return e;};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function say(...msgs){for(const m of msgs){const t=d.createElement('div');t.className='pm typing';t.innerHTML='<i></i><i></i><i></i>';body.appendChild(t);scroll();await sleep(Math.min(1200,380+m.length*8));t.remove();add(m);}}
function opts(list){const w=d.createElement('div');w.className='cb__opts';list.forEach(([l,fn,href])=>{let b;
  if(href){b=d.createElement('a');b.href=href;if(/^http/.test(href)){b.target='_blank';b.rel='noopener';}b.onclick=()=>{add(l,true);};}
  else{b=d.createElement('button');b.type='button';b.onclick=()=>{w.remove();add(l,true);fn(l);};}
  b.textContent=l;w.appendChild(b);});body.appendChild(w);scroll();}
const go=(sel)=>{close();const t=$(sel);if(!t)return;const nx=window.NX&&window.NX.lenis;nx?nx.scrollTo(t,{offset:-70,duration:1.4}):t.scrollIntoView({behavior:'smooth'});};
const back=['← Меню',()=>menu()];
const TG=['Написати в Telegram',null,'https://t.me/M_Networx'];

async function start(ctx,val){started=true;
 if(ctx==='preview'){await say(`Бачу сайт <b>${String(val).replace(/[<>&"]/g,'')}</b> 👀`,'Превʼю нового першого екрана покажемо за 24 години. Залиште контакт у формі розбору або напишіть нам у Telegram.');return opts([['Відкрити форму',()=>go('#start')],TG,back]);}
 await say('Привіт! Я міні-бот NetWorX 👋','Оберіть, що цікавить:');menu();}
function menu(){opts([['Послуги',svc],['Скільки коштує?',price],['Строки',terms],['Кейси',cases],['Записатись на розбір',book]]);}
async function svc(){await say('Що робимо:','• Google Ads<br>• Таргет Meta і TikTok<br>• SMM і контент<br>• Сайти<br>• AI-боти','105+ проєктів, 30 людей у команді, офіційний партнер Google і Meta.');opts([['Скільки коштує?',price],['Записатись на розбір',book],back]);}
async function price(){await say('Ціни відкриті: стартові суми є на сайті в блоці «Ціни відкрито». Рекламний бюджет — окремо.','Точну суму під ваш бізнес назвемо після безкоштовного розбору.');opts([['Показати ціни',()=>go('#services')],['Записатись на розбір',book],back]);}
async function terms(){await say('Як стартуємо:','День 0 — безкоштовний розбір<br>День 1–2 — план і прогноз<br>48 годин — запуск<br>Щотижня — звіт і нові ідеї','Для сайтів: превʼю першого екрана — за 24 години.');opts([['Записатись на розбір',book],back]);}
async function cases(){await say('Кейси з цифрами з рекламних кабінетів: Dronehub, MagazinCo, виробництво скла та інші.','Показати?');opts([['Так, до кейсів',()=>go('#cases')],['Було → стало (сайти)',()=>go('#preview')],back]);}
async function book(){await say('Розбір безкоштовний: подивимось рекламу, сайт і продажі.','Як зручніше?');opts([['Заповнити форму (3 кроки)',()=>go('#start')],TG,['Подзвонити',null,'tel:+380737536589'],back]);}

const open=(ctx,val)=>{cb.classList.add('cb-open');d.documentElement.classList.add('cb-open');teaser.classList.remove('on');if(!started)start(ctx,val);else if(ctx==='preview'){start(ctx,val);}};
const close=()=>{cb.classList.remove('cb-open');d.documentElement.classList.remove('cb-open');};
btn.onclick=()=>cb.classList.contains('cb-open')?close():open();
$('.cb__close').onclick=close;teaser.onclick=e=>{if(e.target.closest('.cb__x')){teaser.classList.remove('on');return;}open();};
setTimeout(()=>{if(!started){teaser.classList.add('on');setTimeout(()=>teaser.classList.remove('on'),9000);}},7000);
if(innerWidth<=900){let y0=null;addEventListener('scroll',()=>{if(!teaser.classList.contains('on'))return;if(y0===null)y0=scrollY;if(Math.abs(scrollY-y0)>120)teaser.classList.remove('on');},{passive:true});}
window.NXBot={open};
})();
