// ActivAnatomy — botões de navegação com área clicável claramente delimitada.
(function(){
  const style=document.createElement('style');
  style.id='aa-nav-buttons-fix';
  style.textContent=`
    .aa-nav{position:relative!important;z-index:50!important;pointer-events:auto!important}
    .aa-nav-btn{
      position:relative!important;z-index:51!important;pointer-events:auto!important;
      min-height:46px!important;padding:12px 18px!important;
      border:1px solid #3a414b!important;
      background:#151a20!important;color:#f2f4f7!important;
      border-radius:12px!important;cursor:pointer!important;
      box-shadow:inset 0 0 0 1px #ffffff05!important;
    }
    .aa-nav-btn:hover{background:#20262e!important;border-color:#69717c!important}
    .aa-nav-btn.active{background:#4a171e!important;border-color:#ff4658!important;color:#fff!important;box-shadow:0 7px 20px #9d13252c!important}
    .aa-nav-btn>*{pointer-events:none!important}
    @media(min-width:981px){
      .aa-nav{gap:10px!important}
      .aa-nav-btn{min-width:132px!important;justify-content:center!important}
    }
    @media(max-width:980px){
      .aa-nav-btn{min-height:42px!important;padding:10px 14px!important}
    }
  `;
  document.head.appendChild(style);
})();