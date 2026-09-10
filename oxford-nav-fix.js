// ActivAnatomy — navegação robusta do cabeçalho (Avaliação / Pacientes / Oxford).
(function(){
  function install(){
    const hero=document.querySelector('.hero');
    const nav=hero?.querySelector('.aa-nav');
    const grid=document.querySelector('.grid');
    const patients=document.querySelector('.aa-patients');
    const oxford=document.getElementById('aaOxfordPage');
    if(!hero||!nav||!grid||!patients||!oxford)return false;

    let oxBtn=nav.querySelector('[data-page="oxford"]');
    if(!oxBtn){
      oxBtn=document.createElement('button');
      oxBtn.type='button';
      oxBtn.className='aa-nav-btn';
      oxBtn.dataset.page='oxford';
      oxBtn.textContent='Escala Oxford';
      nav.appendChild(oxBtn);
    }

    // Um único roteador em captura impede os handlers antigos de disputarem a tela.
    if(nav.dataset.aaRouterFixed==='1')return true;
    nav.dataset.aaRouterFixed='1';

    nav.addEventListener('click',function(e){
      const btn=e.target.closest('.aa-nav-btn[data-page]');
      if(!btn||!nav.contains(btn))return;
      const page=btn.dataset.page;
      if(!['assessment','patients','oxford'].includes(page))return;

      e.preventDefault();
      e.stopImmediatePropagation();

      nav.querySelectorAll('.aa-nav-btn').forEach(x=>x.classList.toggle('active',x===btn));
      patients.classList.remove('show');
      oxford.classList.remove('show');
      grid.style.display='none';

      if(page==='assessment') grid.style.display='';
      if(page==='patients') patients.classList.add('show');
      if(page==='oxford') oxford.classList.add('show');

      window.dispatchEvent(new CustomEvent('activanatomy:navigate',{detail:{page}}));
    },true);
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{
    if(install()||++tries>300)clearInterval(timer);
  },100);
})();