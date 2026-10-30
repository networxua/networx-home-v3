/* NetWorX — чат-віджет. ДЕМО: сценарій на фронтенді, нічого не надсилає.
   Для продакшну: підключити LLM-бекенд + запис у Kommo/Telegram (після ок Макса). */
(()=>{
const d=document,$=(s,c=d)=>c.querySelector(s);
const cb=$('[data-cb]'),body=$('[data-cb-body]'),btn=$('[data-cb-btn]'),teaser=$('[data-cb-teaser]'),form=$('[data-cb-form]'),inp=$('input',form);
const S={};let started=false,waitFor=null;
const scroll=()=>body.scrollTo({top:body.scrollHeight,behavior:'smooth'});
const add=(t,me)=>{const e=d.createElement('div');e.className='pm'+(me?' pm--me':'');e.innerHTML=t;body.appendChild(e);scroll();};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function say(...msgs){for(const m of msgs){const t=d.createElement('div');t.className='pm typing';t.innerHTML='<i></i><i></i><i></i>';body.appendChild(t);scroll();await sleep(Math.min(1700,500+m.length*14));t.remove();add(m);}}
function opts(list){const w=d.createElement('div');w.className='cb__opts';list.forEach(([l,fn])=>{const b=d.createElement('button');b.type='button';b.textContent=l;b.onclick=()=>{w.remove();add(l,true);fn(l);};w.appendChild(b);});body.appendChild(w);scroll();}
const ask=(q,key,next,ph)=>{say(q).then(()=>{waitFor={key,next};inp.placeholder=ph||'Напишіть відповідь…';inp.focus({preventScroll:true});});};
const slots=()=>{const r=[],n=new Date();let dd=new Date(n);const nm=['нд','пн','вт','ср','чт','пт','сб'];while(r.length<3){dd.setDate(dd.getDate()+1);if(dd.getDay()===0)continue;const t=['11:00','14:30','16:00'][r.length];r.push(`${nm[dd.getDay()]} ${dd.getDate()}.${String(dd.getMonth()+1).padStart(2,'0')}, ${t}`);}return r;};

async function start(ctx,val){started=true;
 if(ctx==='preview'){S.site=val;await say(`Бачу сайт <b>${val.replace(/[<>]/g,'')}</b> 👀`,'Зробимо превʼю нового першого екрана за 24 години. Куди надіслати?');return contact();}
 await say('Привіт! Я асистент NetWorX 👋','Ми працюємо з бізнесом клієнта як зі своїм, тож почнемо з вашого. Що зараз найважливіше?');
 menu();}
function menu(){opts([['Хочу безкоштовний розбір',()=>niche()],['Скільки коштують послуги?',()=>prices()],['Потрібен сайт',()=>site()],['Чим ви відрізняєтесь?',()=>diff()]]);}
async function prices(){await say('Відкрито, без «напишіть в директ» 🙂','Google Ads і таргет у Meta — від 450 $/міс, SMM — від 500 $/міс, сайти — від 1000 $, боти — від 600 $. Рекламний бюджет окремо, рекомендуємо від 400 $/міс.','Точну суму назвемо після розбору, коли побачимо ваші цифри. Запишемо вас?');opts([['Так, хочу розбір',()=>niche()],['Ще питання',()=>menu()]]);}
async function site(){await say('Робимо сайти, після яких купують: офер, ціни, докази, бот і заявки одразу в CRM. Від 1000 $.','Можемо показати новий перший екран вашого сайту за 24 години ще до оплати. Є поточний сайт?');opts([['Так, є сайт',()=>ask('Скиньте адресу 👇','site',()=>contact(),'vash-sait.com.ua')],['Сайту ще немає',()=>niche()]]);}
async function diff(){await say('Коротко, без «команда топ»:','• Не просто налаштовуємо рекламу: щомісяця приходимо з ідеями й гіпотезами\n• Кожен проєкт веде PM зі статусом 🟢🟡🔴, ризики бачимо раніше за вас\n• На складних етапах підключається власник агенції Макс Якушин\n• Стратегія і рішення на людях, а AI дає швидкість і щоденний контроль цифр'.replace(/\n/g,'<br>'),'Хочете, покажемо це на вашому бізнесі? Розбір безкоштовний.');opts([['Так, давайте',()=>niche()],['Подивлюсь кейси',()=>{d.querySelector('#cases').scrollIntoView({behavior:'smooth'});say('Гортайте 👆 Я тут, якщо що.');setTimeout(menu,800);}]]);}
async function niche(){await say('Чудово! Яка у вас ніша?');opts(['Інтернет-магазин','Бʼюті / медицина','Послуги','B2B / виробництво','Ресторан / доставка','Інше'].map(n=>[n,v=>{S.niche=v;budget();}]));}
async function budget(){await say('Скільки на місяць готові вкладати в рекламу?');opts(['до 500 $','500–1 500 $','1 500–5 000 $','5 000 $+','Ще не рахували'].map(n=>[n,v=>{S.budget=v;pain();}]));}
async function pain(){await say(S.budget==='до 500 $'?'Зрозумів. З таким бюджетом чесно скажемо на розборі, чи є сенс запускатись, і з чого почати.':'Добре, з таким бюджетом є з чим працювати.','Що болить найбільше?');opts([['Дорогі заявки',v=>{S.pain=v;contact();}],['Заявки є, продажів мало',v=>{S.pain=v;contact();}],['Агенція не дає ідей',v=>{S.pain=v;contact();}],['Запуск з нуля',v=>{S.pain=v;contact();}]]);}
function contact(){ask('Як до вас звертатись?','name',()=>ask(`Приємно, ${S.name}! Телефон або @telegram, щоб надіслати підтвердження?`,'phone',()=>book(),'+380… або @username'),'Імʼя');}
async function book(){await say('Оберіть зручний час для розбору (30–40 хв онлайн):');opts(slots().map(s=>[s,v=>{S.slot=v;done();}]).concat([['Інший час',()=>{S.slot='узгодимо';done();}]]));}
async function done(){await say(`Готово ✅ ${S.slot==='узгодимо'?'Менеджер узгодить з вами час.':'Записав вас на <b>'+S.slot+'</b>.'}`,'На розборі будуть спеціаліст і PM. Подивимось рекламу, сайт і продажі й принесемо перші ідеї під ваш продукт.','Якщо зручніше в Telegram: <a href="https://t.me/M_Networx" target="_blank" rel="noopener" style="color:#1B237E;font-weight:600">@M_Networx</a>');
 const e=d.createElement('div');e.className='pm pm--sys';e.textContent='✓ Заявка передана менеджеру';body.appendChild(e);scroll();}

form.addEventListener('submit',e=>{e.preventDefault();const v=inp.value.trim();if(!v)return;inp.value='';add(v.replace(/[<>]/g,''),true);
 if(waitFor){const w=waitFor;waitFor=null;S[w.key]=v;inp.placeholder='Напишіть повідомлення…';w.next();}
 else say('Дякую! Щоб відповісти точно, оберіть варіант нижче 👇').then(menu);});

const open=(ctx,val)=>{cb.classList.add('cb-open');d.documentElement.classList.add('cb-open');teaser.classList.remove('on');if(!started)start(ctx,val);else if(ctx==='preview'){S.site=val;add(val.replace(/[<>]/g,''),true);contact();}};
const close=()=>{cb.classList.remove('cb-open');d.documentElement.classList.remove('cb-open');};
btn.onclick=()=>cb.classList.contains('cb-open')?close():open();
$('.cb__close').onclick=close;teaser.onclick=e=>{if(e.target.closest('.cb__x')){teaser.classList.remove('on');return;}open();};
setTimeout(()=>{if(!started){teaser.classList.add('on');setTimeout(()=>teaser.classList.remove('on'),9000);}},7000);
if(innerWidth<=900){let y0=null;addEventListener('scroll',()=>{if(!teaser.classList.contains('on'))return;if(y0===null)y0=scrollY;if(Math.abs(scrollY-y0)>120)teaser.classList.remove('on');},{passive:true});}
window.NXBot={open};
})();
