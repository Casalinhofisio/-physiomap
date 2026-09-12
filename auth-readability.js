// Ajustes visuais da tela inicial/login do ActivAnatomy.
(function(){
  const css=document.createElement('style');
  css.id='aa-auth-readability';
  css.textContent=`
    .aa-auth-card{width:min(500px,100%)!important;padding:36px 36px 32px!important}
    .aa-auth-brand{font-size:42px!important;line-height:1.05!important;letter-spacing:-1.4px!important}
    .aa-auth-sub{font-size:17px!important;line-height:1.4!important;margin:8px 0 24px!important;color:#d4dcda!important;font-weight:600!important}
    .aa-tabs{margin-bottom:18px!important;padding:5px!important}
    .aa-tab{padding:13px 10px!important;font-size:16px!important;font-weight:800!important}
    .aa-google{padding:15px 16px!important;font-size:17px!important;min-height:54px!important;font-weight:800!important}
    .aa-g{font-size:24px!important}.aa-or{font-size:14px!important;margin:17px 0!important;color:#c8d0ce!important}
    .aa-field{margin:14px 0!important}.aa-field label{font-size:14px!important;margin-bottom:7px!important;color:#edf1f0!important;font-weight:800!important}.aa-field input{padding:16px!important;font-size:17px!important;min-height:54px!important;border-radius:13px!important}
    .aa-submit{padding:16px!important;font-size:17px!important;min-height:54px!important;margin-top:10px!important}.aa-forgot{font-size:15px!important;padding-top:12px!important}.aa-creator{font-size:13px!important;line-height:1.55!important;color:#bdc8c5!important}
    .aa-commercial-mini{display:grid!important;grid-template-columns:1fr!important;gap:9px!important;margin:4px 0 20px!important}
    .aa-commercial-mini span{display:flex!important;align-items:center!important;width:100%!important;box-sizing:border-box!important;font-size:14px!important;line-height:1.25!important;padding:10px 13px!important;background:#f2f6f5!important;color:#17302e!important;border:1px solid #dbe6e3!important;border-radius:11px!important;font-weight:900!important;white-space:normal!important}
    .aa-auth-card:before{font-size:11px!important;padding:8px 11px!important;letter-spacing:.4px!important;color:#105a42!important;background:#e5f5ed!important}
    @media(max-width:560px){.aa-auth-card{padding:27px 22px!important}.aa-auth-brand{font-size:35px!important}.aa-auth-sub{font-size:15px!important}.aa-tab{font-size:15px!important}.aa-google,.aa-field input,.aa-submit{font-size:16px!important}.aa-commercial-mini span{font-size:13px!important;padding:9px 11px!important}}
  `;
  document.head.appendChild(css);
})();