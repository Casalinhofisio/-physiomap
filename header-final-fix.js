// ActivAnatomy — correção final do cabeçalho e navegação.
(function(){
  const css=document.createElement('style');
  css.id='aa-header-final-fix';
  css.textContent=`
    .hero .heroin{display:flex!important;align-items:center!important;gap:24px!important;width:100%!important;min-width:0!important;overflow:visible!important}
    .hero .aa-premium-brand{flex:0 0 260px!important;min-width:260px!important;max-width:260px!important;overflow:visible!important;z-index:1!important}
    .hero .aa-premium-brand h1{font-size:34px!important;white-space:nowrap!important;overflow:visible!important}
    .hero .aa-nav{flex:1 1 auto!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:10px!important;min-width:0!important;width:auto!important;max-width:none!important;overflow:visible!important;position:relative!important;z-index:999!important;pointer-events:auto!important}
    .hero .aa-nav-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;flex:0 0 auto!important;min-width:145px!important;width:auto!important;height:50px!important;padding:0 18px!important;margin:0!important;border:1px solid #3d4652!important;border-radius:12px!important;background:#171c22!important;color:#f5f7fa!important;font-size:13px!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important;overflow:visible!important;visibility:visible!important;opacity:1!important;cursor:pointer!important;pointer-events:auto!important;position:relative!important;z-index:1000!important}
    .hero .aa-nav-btn span{display:inline!important;color:inherit!important;visibility:visible!important;opacity:1!important;pointer-events:none!important}
    .hero .aa-nav-btn svg{display:block!important;width:18px!important;height:18px!important;flex:0 0 18px!important;stroke:currentColor!important;pointer-events:none!important}
    .hero .aa-nav-btn.active{background:#571920!important;border-color:#ff4355!important;color:#fff!important;box-shadow:0 0 0 1px #ff435522 inset!important}
    .hero .aa-nav-btn:hover{background:#242b34!important;border-color:#77818e!important}
    .hero .pro{flex:0 0 auto!important;min-width:240px!important;max-width:320px!important;margin-left:auto!important;overflow:visible!important;position:relative!important;z-index:20!important}
    @media(max-width:1180px) and (min-width:981px){
      .hero .aa-premium-brand{flex-basis:220px!important;min-width:220px!important;max-width:220px!important}
      .hero .aa-premium-brand h1{font-size:29px!important}
      .hero .aa-nav-btn{min-width:125px!important;padding:0 13px!important;font-size:12px!important}
      .hero .pro{min-width:190px!important;max-width:230px!important}
    }
    @media(max-width:980px){
      .hero .heroin{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:10px!important}
      .hero .aa-premium-brand{grid-column:1!important;grid-row:1!important;min-width:0!important;max-width:none!important;flex-basis:auto!important}
      .hero .pro{grid-column:2!important;grid-row:1!important;min-width:0!important;max-width:none!important}
      .hero .aa-nav{grid-column:1/-1!important;grid-row:2!important;width:100%!important;overflow-x:auto!important;gap:6px!important}
      .hero .aa-nav-btn{min-width:120px!important;height:44px!important;padding:0 12px!important;font-size:11px!important}
    }
  `;
  document.head.appendChild(css);

  const icons={
    assessment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/></svg>',
    patients:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    oxford:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8"/></svg>'
  };
  const labels={assessment:'Avaliação',patients:'Pacientes',oxford:'Escala Oxford'};

  function show(page){
    const grid=document.querySelector('.grid');
    const patients=document.querySelector('.aa-patients');
    const oxford=document.getElementById('aaOxfordPage');
    if(!grid||!patients||!oxford)return;
    grid.style.display=page==='assessment'?'':'none';
    patients.classList.toggle('show',page==='patients');
    oxford.classList.toggle('show',page==='oxford');
    document.querySelectorAll('.hero .aa-nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  }

  function install(){
    const nav=document.querySelector('.hero .aa-nav');
    const grid=document.querySelector('.grid');
    const patients=document.querySelector('.aa-patients');
    const oxford=document.getElementById('aaOxfordPage');
    if(!nav||!grid||!patients||!oxford)return false;

    nav.innerHTML=['assessment','patients','oxford'].map(page=>`<button type="button" class="aa-nav-btn${page==='assessment'?' active':''}" data-page="${page}">${icons[page]}<span>${labels[page]}</span></button>`).join('');
    nav.onclick=function(e){
      const b=e.target.closest('.aa-nav-btn[data-page]');
      if(!b)return;
      e.preventDefault();e.stopPropagation();
      show(b.dataset.page);
    };
    nav.dataset.finalNav='1';
    return true;
  }

  let tries=0;
  const t=setInterval(()=>{
    if(install()||++tries>300)clearInterval(t);
  },100);
})();