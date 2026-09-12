// Ajustes visuais da tela inicial/login do ActivAnatomy.
(function(){
  const css=document.createElement('style');
  css.id='aa-auth-readability';
  css.textContent=`
    .aa-auth-card{width:min(510px,100%)!important;padding:36px 36px 32px!important}
    .aa-auth-brand{font-size:42px!important;line-height:1.05!important;letter-spacing:-1.4px!important}
    .aa-auth-sub{font-size:17px!important;line-height:1.4!important;margin:8px 0 24px!important;color:#fff!important;font-weight:700!important}
    .aa-tabs{margin-bottom:18px!important;padding:5px!important}.aa-tab{padding:13px 10px!important;font-size:16px!important;font-weight:800!important}
    .aa-google{padding:15px 16px!important;font-size:17px!important;min-height:54px!important;font-weight:800!important}.aa-g{font-size:24px!important}.aa-or{font-size:14px!important;margin:17px 0!important;color:#fff!important}
    .aa-field{margin:14px 0!important}.aa-field label{font-size:14px!important;margin-bottom:7px!important;color:#fff!important;font-weight:800!important}.aa-field input{padding:16px!important;font-size:17px!important;min-height:54px!important;border-radius:13px!important}
    .aa-submit{padding:16px!important;font-size:17px!important;min-height:54px!important;margin-top:10px!important}.aa-forgot{font-size:15px!important;padding-top:12px!important}.aa-creator{font-size:13px!important;line-height:1.55!important;color:#fff!important}
    .aa-commercial-mini{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;margin:5px 0 21px!important}
    .aa-commercial-mini span{display:flex!important;align-items:center!important;width:100%!important;box-sizing:border-box!important;font-size:16px!important;line-height:1.3!important;padding:12px 14px!important;background:#fff!important;color:#000!important;border:2px solid #d7dfdd!important;border-radius:12px!important;font-weight:900!important;white-space:normal!important;text-shadow:none!important}
    .aa-auth-card:before{font-size:13px!important;padding:9px 12px!important;letter-spacing:.3px!important;color:#000!important;background:#fff!important;border:2px solid #d7dfdd!important;font-weight:1000!important}
    @media(max-width:560px){.aa-auth-card{padding:27px 22px!important}.aa-auth-brand{font-size:35px!important}.aa-auth-sub{font-size:15px!important}.aa-tab{font-size:15px!important}.aa-google,.aa-field input,.aa-submit{font-size:16px!important}.aa-commercial-mini span{font-size:14px!important;padding:10px 12px!important}}
  `;
  document.head.appendChild(css);
})();