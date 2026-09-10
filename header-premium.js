// ActivAnatomy — cabeçalho premium sem alterar o restante da aplicação
(function(){
  function icon(name){
    const paths={
      assessment:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5.5h5V20"/>',
      patients:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      oxford:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||''}</svg>`;
  }
  function enhance(){
    const hero=document.querySelector('.hero'),heroIn=hero?.querySelector('.heroin'),nav=hero?.querySelector('.aa-nav'),pro=hero?.querySelector('.pro');
    if(!hero||!heroIn||!nav||!pro)return false;
    if(hero.dataset.premiumHeader==='1')return true;
    hero.dataset.premiumHeader='1';

    const brand=heroIn.firstElementChild;
    if(!brand)return false;
    brand.classList.add('aa-premium-brand');
    const h1=brand.querySelector('h1'); if(h1)h1.innerHTML='ActivAnatomy<span class="aa-brand-dot">.</span>';
    const p=brand.querySelector('p'); if(p){p.textContent='MOVIMENTO GERA NOVAS POSSIBILIDADES';p.classList.add('aa-premium-tagline')}

    nav.querySelectorAll('.aa-nav-btn').forEach(btn=>{
      const page=btn.dataset.page;
      const label=btn.textContent.trim();
      if(page==='assessment') btn.innerHTML=icon('assessment')+`<span>${label}</span>`;
      else if(page==='patients') btn.innerHTML=icon('patients')+`<span>${label}</span>`;
      else if(page==='oxford') btn.innerHTML=icon('oxford')+`<span>${label}</span>`;
    });

    pro.classList.add('aa-premium-account');
    const user=pro.querySelector('.aa-user'),logout=pro.querySelector('.aa-logout');
    const account=document.createElement('button');account.type='button';account.className='aa-account-trigger';account.setAttribute('aria-label','Conta');account.innerHTML='<span class="aa-avatar"><span></span></span><span class="aa-chevron">⌄</span>';
    pro.prepend(account);
    if(user)user.classList.add('aa-user-hidden');
    if(logout){logout.textContent='Sair da conta';logout.classList.add('aa-premium-logout')}
    account.addEventListener('click',()=>pro.classList.toggle('open'));
    document.addEventListener('click',e=>{if(!pro.contains(e.target))pro.classList.remove('open')});
    return true;
  }

  const style=document.createElement('style');
  style.textContent=`
  .hero{position:relative;overflow:visible!important;background:#090d12!important;border:1px solid #1a2028!important;border-radius:18px!important;padding:0 24px!important;min-height:92px;box-shadow:0 14px 38px #10151d26!important;color:#fff!important}
  .hero:before,.hero:after{content:"";position:absolute;pointer-events:none;z-index:0;opacity:.78}
  .hero:before{left:0;bottom:0;width:185px;height:74px;background:radial-gradient(ellipse at 8% 110%,#ef2d3b80 0,#ef2d3b28 32%,transparent 68%);border-radius:0 0 0 18px}
  .hero:after{right:130px;inset-block:0;width:420px;background:radial-gradient(ellipse at 55% 130%,#c91f2f38 0,transparent 63%),linear-gradient(155deg,transparent 35%,#ff2d3b10 52%,transparent 70%)}
  .heroin{position:relative;z-index:1;min-height:92px;display:grid!important;grid-template-columns:minmax(280px,1.05fr) minmax(430px,1.6fr) auto;align-items:center!important;gap:28px!important}
  .aa-premium-brand{display:flex;align-items:center;gap:24px;min-width:0}
  .aa-premium-brand h1{font-size:clamp(25px,3vw,36px)!important;font-weight:760!important;letter-spacing:-1.2px!important;white-space:nowrap;margin:0!important}
  .aa-brand-dot{color:#ff3947!important;font-weight:900!important}
  .aa-premium-tagline{margin:0!important;padding-left:24px;border-left:1px solid #ffffff30;max-width:190px;color:#b9c3d0!important;font-size:10px!important;line-height:1.55!important;letter-spacing:2px!important;font-weight:800!important;opacity:1!important}
  .aa-nav{margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;flex-wrap:nowrap!important}
  .aa-nav-btn{display:flex!important;align-items:center;gap:9px;border:1px solid transparent!important;background:transparent!important;color:#e5e9ef!important;border-radius:12px!important;padding:12px 14px!important;font-size:13px!important;font-weight:760!important;transition:.18s ease;white-space:nowrap}
  .aa-nav-btn svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;opacity:.92}
  .aa-nav-btn:hover{background:#ffffff0b!important;border-color:#ffffff14!important}
  .aa-nav-btn.active{background:linear-gradient(180deg,#5b1b22cc,#35151acc)!important;color:#fff!important;border-color:#ff3d4f99!important;box-shadow:0 0 0 1px #ff263b1a inset,0 7px 20px #9d13252c!important;position:relative}
  .aa-nav-btn.active:after{content:"";position:absolute;left:38%;right:38%;height:3px;border-radius:3px;background:#ff3144;bottom:-1px;box-shadow:0 0 11px #ff3144}
  .pro.aa-premium-account{position:relative!important;display:flex;align-items:center;justify-content:flex-end!important;opacity:1!important;min-width:74px;padding-left:18px;border-left:1px solid #ffffff2c;text-align:left!important}
  .aa-account-trigger{display:flex;align-items:center;gap:8px;background:transparent;border:0;color:#dbe2eb;cursor:pointer;padding:4px}
  .aa-avatar{position:relative;width:38px;height:38px;border-radius:50%;background:linear-gradient(145deg,#cbd4df,#8897a9);border:1px solid #e9eef580;box-shadow:inset 0 1px 4px #fff8}
  .aa-avatar:before{content:"";position:absolute;width:11px;height:11px;border-radius:50%;background:#fff;left:13px;top:7px}.aa-avatar:after{content:"";position:absolute;width:20px;height:10px;border-radius:12px 12px 7px 7px;background:#fff;left:8px;bottom:6px}
  .aa-chevron{font-size:19px;line-height:1;transform:translateY(-2px)}
  .aa-user-hidden{position:absolute!important;right:0;top:62px;background:#121820;color:#cbd5df!important;padding:11px 13px;border-radius:12px 12px 0 0;width:245px;max-width:245px!important;display:none!important;box-shadow:0 16px 34px #0004;z-index:1001;border:1px solid #ffffff12;border-bottom:0;font-size:11px!important}
  .aa-premium-logout{position:absolute!important;right:0;top:98px;width:245px!important;background:#121820!important;color:#fff!important;border:1px solid #ffffff12!important;border-top:1px solid #ffffff0d!important;border-radius:0 0 12px 12px!important;padding:10px 13px!important;text-align:left!important;display:none!important;z-index:1002}
  .aa-premium-account.open .aa-user-hidden,.aa-premium-account.open .aa-premium-logout{display:block!important}
  @media(max-width:980px){.hero{padding:15px 18px!important}.heroin{grid-template-columns:1fr auto!important;gap:14px!important}.aa-premium-brand{grid-column:1/2}.aa-nav{grid-column:1/-1!important;grid-row:2!important;justify-content:flex-start!important;overflow-x:auto;padding-bottom:2px}.aa-premium-account{grid-column:2!important;grid-row:1!important}.aa-premium-tagline{display:none}.hero:after{right:0;width:250px}}
  @media(max-width:560px){.hero{border-radius:15px!important}.heroin{min-height:auto!important}.aa-premium-brand h1{font-size:25px!important}.aa-nav-btn{padding:10px 11px!important;font-size:12px!important}.aa-nav-btn svg{width:17px;height:17px}.pro.aa-premium-account{min-width:58px;padding-left:10px}.aa-avatar{width:34px;height:34px}.aa-avatar:before{left:11px;top:6px}.aa-avatar:after{left:6px}.aa-chevron{display:none}}
  @media print{.hero{display:none!important}}
  `;
  document.head.appendChild(style);
  let tries=0;const timer=setInterval(()=>{if(enhance()||++tries>160)clearInterval(timer)},100);
})();