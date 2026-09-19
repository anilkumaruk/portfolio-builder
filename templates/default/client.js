document.documentElement.classList.add('js');

/* theme toggle — remembers the choice per browser, never required for the page to read */
(function(){
  var root=document.documentElement, btn=document.getElementById('theme'), icon=document.getElementById('theme-icon');
  var sun='<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>';
  var moon='<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7"/>';
  function paint(){
    var dark = root.getAttribute('data-theme')==='dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    icon.innerHTML = dark ? sun : moon;
  }
  try{ var saved=localStorage.getItem('__THEME_KEY__'); if(saved) root.setAttribute('data-theme',saved); }catch(e){}
  paint();
  btn.addEventListener('click',function(){
    var dark = root.getAttribute('data-theme')==='dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme',next);
    try{ localStorage.setItem('__THEME_KEY__',next); }catch(e){}
    paint();
  });
})();

/* scroll spy */
(function(){
  var links=[].slice.call(document.querySelectorAll('.nav a'));
  var map={}; links.forEach(function(a){ var el=document.querySelector(a.getAttribute('href')); if(el) map[a.getAttribute('href').slice(1)]=a; });
  var sections=Object.keys(map).map(function(id){ return document.getElementById(id); }).filter(Boolean);
  if(!('IntersectionObserver' in window)) return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){ a.removeAttribute('aria-current'); });
        map[e.target.id].setAttribute('aria-current','true');
      }
    });
  },{rootMargin:'-45% 0px -50% 0px',threshold:0});
  sections.forEach(function(s){ io.observe(s); });
})();

/* reveal */
(function(){
  var items=[].slice.call(document.querySelectorAll('.rv'));
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(function(el){ el.classList.add('in'); }); return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e,i){
      if(e.isIntersecting){ e.target.style.transitionDelay=(i*55)+'ms'; e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.08});
  items.forEach(function(el){ io.observe(el); });
  // anything already on screen resolves immediately
  requestAnimationFrame(function(){ items.forEach(function(el){ if(el.getBoundingClientRect().top < innerHeight){ el.classList.add('in'); } }); });
})();

/* CV: open the generated resume, or download the uploaded PDF, otherwise print this page */
document.getElementById('cv').addEventListener('click',function(){
  var src=document.getElementById('resume-src');
  if(src){
    var url=URL.createObjectURL(new Blob([src.textContent],{type:'text/html'}));
    window.open(url,'_blank');
    return;
  }
  var pdf='__CV_PATH__';
  if(!pdf){ window.print(); return; }
  var a=document.createElement('a'); a.href=pdf; a.download='Resume.pdf'; a.target='_blank'; a.rel='noopener';
  document.body.appendChild(a); a.click(); a.remove();
});
