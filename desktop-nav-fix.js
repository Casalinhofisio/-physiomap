// ActivAnatomy — correção específica do cabeçalho em telas de desktop.
(function(){
  const style=document.createElement('style');
  style.id='aa-desktop-nav-fix';
  style.textContent=`
    @media(min-width:981px){
      .hero .heroin{isolation:isolate!important}
      .hero .aa-premium-brand{min-width:0!important;max-width:100%!important;overflow:hidden!important;position:relative!important;z-index:1!important}
      .hero .aa-premium-brand h1{flex:0 0 auto!important}
      .hero .aa-premium-tagline{flex:1 1 auto!important;min-width:0!important;max-width:150px!important;overflow:hidden!important}
      .hero .aa-nav{position:relative!important;z-index:20!important;pointer-events:auto!important}
      .hero .aa-nav-btn,.hero .aa-nav-btn *{pointer-events:auto!important}
      .hero .pro.aa-premium-account{position:relative!important;z-index:10!important}
    }
  `;
  document.head.appendChild(style);

  // Reforça o clique caso algum elemento visual do cabeçalho tente interceptar o evento.
  function reinforce(){
    const nav=document.querySelector('.hero .aa-nav');
    if(!nav)return false;
    nav.style.pointerEvents='auto';
    nav.querySelectorAll('.aa-nav-btn').forEach(btn=>{
      btn.style.pointerEvents='auto';
      btn.querySelectorAll('*').forEach(x=>x.style.pointerEvents='none');
    });
    return true;
  }
  let n=0,t=setInterval(()=>{if(reinforce()||++n>200)clearInterval(t)},100);
})();