// Ajustes visuais da tela inicial/login do ActivAnatomy.
(function(){
  const css=document.createElement('style');
  css.id='aa-auth-readability';
  css.textContent=`
    .aa-auth-card{width:min(430px,100%)!important;padding:26px 30px 24px!important;box-sizing:border-box!important}
    .aa-auth-brand{font-size:36px!important;line-height:1.05!important;letter-spacing:-1.2px!important}
    .aa-auth-sub{font-size:14px!important;line-height:1.35!important;margin:6px 0 16px!important;color:#fff!important;font-weight:650!important}
    .aa-tabs{margin-bottom:13px!important;padding:4px!important}.aa-tab{padding:10px 8px!important;font-size:14px!important;font-weight:800!important}
    .aa-google{padding:11px 14px!important;font-size:15px!important;min-height:48px!important;font-weight:800!important}.aa-g{font-size:21px!important}.aa-or{font-size:12px!important;margin:12px 0!important;color:#fff!important}
    .aa-field{margin:10px 0!important}.aa-field label{font-size:12px!important;margin-bottom:5px!important;color:#fff!important;font-weight:800!important}.aa-field input{padding:12px 14px!important;font-size:15px!important;min-height:48px!important;border-radius:12px!important}
    .aa-submit{padding:12px!important;font-size:15px!important;min-height:48px!important;margin-top:8px!important}.aa-forgot{font-size:13px!important;padding-top:9px!important}.aa-creator{font-size:11px!important;line-height:1.45!important;color:#fff!important}
    .aa-commercial-mini,.aa-auth-card:before{display:none!important;content:none!important}
    @media(min-width:861px){.aa-commercial-shell{grid-template-columns:minmax(0,1.35fr) 430px!important;gap:58px!important;align-items:center!important}.aa-auth-card{max-height:760px!important}.aa-commercial-hero{padding-right:12px!important}}
    @media(max-width:560px){.aa-auth-card{width:100%!important;padding:25px 21px!important}.aa-auth-brand{font-size:34px!important}.aa-auth-sub{font-size:14px!important}.aa-tab{font-size:14px!important}.aa-google,.aa-field input,.aa-submit{font-size:15px!important}}
  `;
  document.head.appendChild(css);
})();