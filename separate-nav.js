// ActivAnatomy — menu em segunda linha do cabeçalho, sem alterar o sistema.
(function(){
  const style=document.createElement('style');
  style.textContent=`
    .hero{padding-bottom:14px!important}
    .aa-nav-shell{display:block!important;width:100%!important;background:transparent!important;border:0!important;border-top:1px solid #252b33!important;border-radius:0!important;padding:12px 0 0!important;margin:0!important;box-shadow:none!important;overflow-x:auto!important;position:relative!important;z-index:10000!important}
    .aa-nav-shell .aa-nav{display:flex!important;gap:10px!important;align-items:center!important;justify-content:flex-start!important;flex-wrap:nowrap!important;margin:0!important;padding:0!important;width:100%!important;min-width:0!important;max-width:none!important;overflow:visible!important;position:static!important;transform:none!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;pointer-events:auto!important}
    .aa-nav-shell .aa-nav-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;min-width:155px!important;width:auto!important;height:46px!important;padding:0 18px!important;margin:0!important;border:1px solid #3b434d!important;border-radius:11px!important;background:#171c22!important;color:#f5f7fa!important;font-size:13px!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important;overflow:visible!important;opacity:1!important;visibility:visible!important;cursor:pointer!important;pointer-events:auto!important;position:relative!important;z-index:10001!important}
    .aa-nav-shell .aa-nav-btn *{pointer-events:none!important}
    .aa-nav-shell .aa-nav-btn:hover{background:#242b34!important;border-color:#737d89!important}
    .aa-nav-shell .aa-nav-btn.active{background:#571920!important;border-color:#ff4355!important;color:#fff!important;box-shadow:0 0 0 1px #ff435522 inset!important}
    @media(max-width:700px){.aa-nav-shell{padding-top:9px!important}.aa-nav-shell .aa-nav{gap:6px!important}.aa-nav-shell .aa-nav-btn{min-width:125px!important;height:42px!important;padding:0 11px!important;font-size:11px!important}}
  `;
  document.head.appendChild(style);

  function install(){
    const hero=document.querySelector('.hero');
    const hi=hero?.querySelector('.heroin');
    const nav=hero?.querySelector('.aa-nav')||document.querySelector('.aa-nav');
    if(!hero||!hi||!nav)return false;
    let shell=hero.querySelector('.aa-nav-shell');
    if(!shell){shell=document.createElement('div');shell.className='aa-nav-shell';hero.appendChild(shell)}
    if(nav.parentElement!==shell)shell.appendChild(nav);
    nav.style.cssText='position:static!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;transform:none!important;display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;';
    return true;
  }
  let tries=0;
  const timer=setInterval(()=>{if(install()||++tries>300)clearInterval(timer)},100);
})();