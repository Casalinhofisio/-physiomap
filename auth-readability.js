// Ajustes visuais da tela inicial/login do ActivAnatomy.
(function(){
  const css=document.createElement('style');
  css.id='aa-auth-readability';
  css.textContent=`
    .aa-auth-card{width:min(470px,100%)!important;padding:34px 34px 30px!important}
    .aa-auth-brand{font-size:40px!important;line-height:1.05!important;letter-spacing:-1.4px!important}
    .aa-auth-sub{font-size:16px!important;line-height:1.35!important;margin:7px 0 24px!important;color:#aeb8b6!important;font-weight:500!important}
    .aa-tabs{margin-bottom:18px!important;padding:5px!important}
    .aa-tab{padding:12px 10px!important;font-size:15px!important}
    .aa-google{padding:14px 16px!important;font-size:16px!important;min-height:50px!important}
    .aa-g{font-size:23px!important}
    .aa-or{font-size:13px!important;margin:16px 0!important;color:#a8b0af!important}
    .aa-field{margin:13px 0!important}
    .aa-field label{font-size:13px!important;margin-bottom:7px!important;color:#d7dedc!important;letter-spacing:.05px!important}
    .aa-field input{padding:15px 16px!important;font-size:16px!important;min-height:52px!important;border-radius:13px!important}
    .aa-submit{padding:15px 16px!important;font-size:16px!important;min-height:52px!important;margin-top:10px!important}
    .aa-forgot{font-size:14px!important;padding-top:12px!important}
    .aa-creator{font-size:12.5px!important;line-height:1.5!important;color:#9aa8a5!important}
    .aa-commercial-mini span{font-size:11px!important;padding:6px 9px!important}
    @media(max-width:560px){
      .aa-auth-card{padding:26px 22px!important}
      .aa-auth-brand{font-size:34px!important}
      .aa-auth-sub{font-size:14px!important}
      .aa-tab{font-size:14px!important}
      .aa-google,.aa-field input,.aa-submit{font-size:15px!important}
    }
  `;
  document.head.appendChild(css);
})();