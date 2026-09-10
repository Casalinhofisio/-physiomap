// ActivAnatomy — hotfix de navegação do módulo Oxford.
(function(){
  function install(){
    const hero=document.querySelector('.hero');
    const nav=hero?.querySelector('.aa-nav');
    const grid=document.querySelector('.grid');
    const page=document.getElementById('aaOxfordPage');
    if(!hero||!nav||!grid||!page)return false;

    let btn=nav.querySelector('[data-page="oxford"]');
    if(!btn){
      btn=document.createElement('button');
      btn.className='aa-nav-btn';
      btn.dataset.page='oxford';
      btn.textContent='Escala Oxford';
      nav.appendChild(btn);
    }
    if(btn.dataset.aaOxfordFixed==='1')return true;
    btn.dataset.aaOxfordFixed='1';

    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      grid.style.display='none';
      document.querySelector('.aa-patients')?.classList.remove('show');
      page.classList.add('show');
      nav.querySelectorAll('.aa-nav-btn').forEach(x=>x.classList.toggle('active',x===btn));
      window.scrollTo({top:hero.offsetTop,behavior:'smooth'});
    },true);

    nav.addEventListener('click',function(e){
      const other=e.target.closest('[data-page]');
      if(other&&other.dataset.page!=='oxford')page.classList.remove('show');
    },true);
    return true;
  }
  let tries=0;
  const timer=setInterval(()=>{
    if(install()||++tries>200)clearInterval(timer);
  },100);
})();