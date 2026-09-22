const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const filters=document.querySelectorAll(".filter"),projects=document.querySelectorAll(".project");
filters.forEach(btn=>btn.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;projects.forEach(p=>{p.style.display=f==="all"||p.dataset.cat===f?"":"none"})}));

const modal=document.querySelector(".modal"), modalArt=document.querySelector(".modal-art"), modalTitle=document.querySelector(".modal-info h2"), modalDesc=document.querySelector(".modal-info>p:not(.eyebrow)");
projects.forEach(p=>p.addEventListener("click",()=>{
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");
  modalTitle.textContent=p.dataset.title;modalDesc.textContent=p.dataset.desc;
  const visual=p.querySelector(".project-visual");modalArt.style.background=getComputedStyle(visual).background;
}));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.querySelector(".modal-close").addEventListener("click",closeModal);
document.querySelector(".modal-backdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.querySelector(".modal-contact").addEventListener("click",closeModal);

const sections=[...document.querySelectorAll("main section[id]")],links=[...document.querySelectorAll(".nav a")];
const activeObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObs.observe(s));

/* V8 interaction polish */
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click", e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

document.querySelectorAll(".btn,.header-cta,.filter").forEach(el=>{
  el.addEventListener("pointerdown",()=>el.classList.add("pressing"));
  el.addEventListener("pointerup",()=>el.classList.remove("pressing"));
  el.addEventListener("pointercancel",()=>el.classList.remove("pressing"));
});

/* V9 contact chooser */
const contactChooser=document.querySelector('.contact-chooser');
const openContactChooser=()=>{contactChooser?.classList.add('open');contactChooser?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeContactChooser=()=>{contactChooser?.classList.remove('open');contactChooser?.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelectorAll('.contact-trigger').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openContactChooser()}));
contactChooser?.querySelector('.contact-choice-close')?.addEventListener('click',closeContactChooser);
contactChooser?.querySelector('.modal-backdrop')?.addEventListener('click',closeContactChooser);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContactChooser()});
contactChooser?.querySelectorAll('.contact-option').forEach(a=>a.addEventListener('click',()=>setTimeout(closeContactChooser,120)));
