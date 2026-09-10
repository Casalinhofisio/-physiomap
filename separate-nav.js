// ActivAnatomy — barra de navegação separada do cabeçalho, preservando todo o sistema.
(function(){
  const style=document.createElement('style');
  style.textContent=`
    .aa-nav-shell{display:flex;gap:10px;align-items:center;justify-content:flex-start;background:#0d1116;border:1px solid #20262e;border-radius:16px;padding:10px;margin:-4px 0 16px;box-shadow:0 8px 24px #11131812;overflow-x:auto;position:relative;z-index:30}
    .aa-nav-shell .aa-nav{display:flex!important;gap:10px!important;align-items:center!important;justify-content:flex-start!important;flex-wrap:nowrap!important;margin:0!important;width:auto!important;min-width:0!important;overflow:visible!important;position:static!important}
    .aa-nav-shell .aa-nav-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;min-width:150px!important;min-height:48px!important;padding:0 18px!important;border:1px solid #3a414b!important;border-radius:12px!important;background:#171c22!important;color:#f3f5f7!important;font-size:13px!important;font-weight:800!important;cursor:pointer!important;pointer-events:auto!important;position:relative!important;z-index:2!important;white-space:nowrap!important}
    .aa-nav-shell .aa-nav-btn.active{background:#571920!important;border-color:#ff4355!important;color:#fff!important;box-shadow:0 0 0 1px #ff435522 inset!important}
    .aa-nav-shell .aa-nav-btn:hover{background:#242b34!important;border-color:#737d89!important}
    .aa-nav-shell .aa-nav-btn *{pointer-events:none!important}
    @media(max-width:700px){.aa-nav-shell{padding:8px;margin-top:-6px}.aa-nav-shell .aa-nav-btn{min-width:128px!important;min-height:44px!important;font-size:11px!important;padding:0 12px!important}}
  `;
  document.head.appendChild(style);

  function install(){
    const hero=document.querySelector('.hero');
    const nav=hero?.querySelector('.aa-nav')||document.querySelector('.aa-nav');
    const main=document.querySelector('main.wrap');
    if(!hero||!nav||!main)return false;
    if(document.querySelector('.aa-nav-shell'))return true;

    const shell=document.createElement('div');
    shell.className='aa-nav-shell';
    hero.insertAdjacentElement('afterend',shell);
    shell.appendChild(nav);

    // Remove qualquer posicionamento antigo herdado do cabeçalho.
    nav.style.position='static';
    nav.style.left='auto';nav.style.right='auto';nav.style.top='auto';nav.style.transform='none';
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{if(install()||++tries>300)clearInterval(timer)},100);
})();