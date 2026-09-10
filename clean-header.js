// ActivAnatomy — cabeçalho único e estável, sem sobreposição entre abas.
(function(){
  const style=document.createElement('style');
  style.id='aa-clean-header-style';
  style.textContent=`
    .hero{position:relative!important;overflow:visible!important;background:#090d12!important;border:1px solid #1c222b!important;border-radius:18px!important;min-height:104px!important;padding:0 28px!important;color:#fff!important}
    .hero .heroin{position:relative!important;display:block!important;min-height:104px!important;width:100%!important;overflow:visible!important}
    .hero .aa-clean-brand{position:absolute!important;left:0!important;top:50%!important;transform:translateY(-50%)!important;margin:0!important;z-index:2!important;font-size:36px!important;font-weight:800!important;letter-spacing:-1.4px!important;white-space:nowrap!important;color:#fff!important}
    .hero .aa-clean-brand .dot{color:#ff3947!important}
    .hero .aa-nav{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;display:flex!important;gap:12px!important;align-items:center!important;justify-content:center!important;width:auto!important;min-width:0!important;max-width:none!important;margin:0!important;padding:0!important;overflow:visible!important;z-index:9999!important;pointer-events:auto!important}
    .hero .aa-nav-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;width:auto!important;min-width:148px!important;height:50px!important;padding:0 18px!important;margin:0!important;border:1px solid #3b434d!important;border-radius:12px!important;background:#171c22!important;color:#f5f7fa!important;font-size:13px!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important;overflow:visible!important;opacity:1!important;visibility:visible!important;cursor:pointer!important;pointer-events:auto!important;position:relative!important;z-index:10000!important}
    .hero .aa-nav-btn *{pointer-events:none!important}
    .hero .aa-nav-btn:hover{background:#232a33!important;border-color:#707b87!important}
    .hero .aa-nav-btn.active{background:#581920!important;border-color:#ff4355!important;color:#fff!important;box-shadow:0 0 0 1px #ff435522 inset!important}
    .hero .aa-nav-btn svg{width:18px!important;height:18px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important}
    .hero .pro{position:absolute!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;display:flex!important;align-items:center!important;gap:10px!important;max-width:300px!important;z-index:3!important;text-align:right!important;opacity:1!important;font-size:11px!important;white-space:nowrap!important;overflow:visible!important}
    .hero .pro .aa-user{display:block!important;max-width:220px!important;overflow:hidden!important;text-overflow:ellipsis!important;color:#fff!important}
    .hero .pro .aa-logout{display:block!important;background:#1a1f25!important;color:#fff!important;border:1px solid #4b535c!important;border-radius:9px!important;padding:8px 11px!important;cursor:pointer!important}
    .hero .pro .aa-account-trigger{display:none!important}
    @media(max-width:1180px) and (min-width:981px){
      .hero{padding:0 20px!important}.hero .aa-clean-brand{font-size:30px!important}.hero .aa-nav{gap:8px!important}.hero .aa-nav-btn{min-width:126px!important;padding:0 12px!important;font-size:12px!important}.hero .pro{max-width:215px!important}.hero .pro .aa-user{max-width:145px!important;font-size:10px!important}
    }
    @media(max-width:980px){
      .hero{padding:14px!important;min-height:0!important}.hero .heroin{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:10px!important;min-height:0!important}.hero .aa-clean-brand{position:static!important;transform:none!important;grid-column:1!important;grid-row:1!important;font-size:26px!important;align-self:center!important}.hero .pro{position:static!important;transform:none!important;grid-column:2!important;grid-row:1!important;max-width:none!important}.hero .pro .aa-user{display:none!important}.hero .aa-nav{position:static!important;transform:none!important;grid-column:1/-1!important;grid-row:2!important;width:100%!important;overflow-x:auto!important;justify-content:flex-start!important;gap:6px!important}.hero .aa-nav-btn{min-width:120px!important;height:44px!important;padding:0 12px!important;font-size:11px!important}
    }
  `;
  document.head.appendChild(style);

  const icons={
    assessment:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/></svg>',
    patients:'<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    oxford:'<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8"/></svg>'
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
    const hero=document.querySelector('.hero');
    const hi=hero?.querySelector('.heroin');
    const nav=hero?.querySelector('.aa-nav');
    const pro=hero?.querySelector('.pro');
    const grid=document.querySelector('.grid');
    const patients=document.querySelector('.aa-patients');
    const oxford=document.getElementById('aaOxfordPage');
    if(!hero||!hi||!nav||!pro||!grid||!patients||!oxford)return false;

    const oldBrand=hi.firstElementChild;
    if(oldBrand && !oldBrand.classList.contains('aa-nav')){
      oldBrand.innerHTML='<div class="aa-clean-brand">ActivAnatomy<span class="dot">.</span></div>';
    }

    nav.innerHTML=['assessment','patients','oxford'].map(page=>`<button type="button" class="aa-nav-btn${page==='assessment'?' active':''}" data-page="${page}">${icons[page]}<span>${labels[page]}</span></button>`).join('');

    nav.addEventListener('click',function(e){
      const btn=e.target.closest('.aa-nav-btn[data-page]');
      if(!btn)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      show(btn.dataset.page);
    },true);

    hero.dataset.cleanHeader='1';
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{
    if(install()||++tries>300)clearInterval(timer);
  },100);
})();