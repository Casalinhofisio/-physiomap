// Ajuste final do card de login no desktop — carregado por último para prevalecer.
(function(){
  const s=document.createElement('style');
  s.id='aa-login-final-fix';
  s.textContent=`
    @media (min-width:861px){
      .aa-commercial-shell{grid-template-columns:minmax(0,1fr) 370px!important;gap:46px!important;align-items:center!important;max-width:1040px!important}
      .aa-auth-card{width:370px!important;max-width:370px!important;padding:20px 24px 18px!important;border-radius:22px!important;margin:0!important}
      .aa-auth-brand{font-size:30px!important;line-height:1!important;margin:0!important}
      .aa-auth-sub{font-size:12px!important;line-height:1.25!important;margin:5px 0 12px!important}
      .aa-tabs{margin:0 0 10px!important;padding:3px!important;border-radius:10px!important}
      .aa-tab{padding:8px 6px!important;font-size:13px!important}
      .aa-google{min-height:42px!important;padding:9px 12px!important;font-size:14px!important;border-radius:10px!important}
      .aa-g{font-size:19px!important}
      .aa-or{font-size:11px!important;margin:9px 0!important;gap:8px!important}
      .aa-field{margin:8px 0!important}
      .aa-field label{font-size:11px!important;margin-bottom:4px!important}
      .aa-field input{min-height:42px!important;padding:9px 12px!important;font-size:14px!important;border-radius:10px!important}
      .aa-submit{min-height:43px!important;padding:10px 12px!important;font-size:14px!important;margin-top:6px!important;border-radius:10px!important}
      .aa-forgot{font-size:12px!important;padding:7px 2px 0!important}
      .aa-creator{font-size:10.5px!important;line-height:1.35!important;margin-top:12px!important;padding-top:10px!important}
      .aa-commercial-mini,.aa-auth-card:before{display:none!important;content:none!important}
      #aaGuideBtn{min-height:40px!important;padding:9px 10px!important;font-size:12px!important;margin-top:8px!important}
      .aa-msg{font-size:11px!important;margin-top:8px!important;padding:8px 9px!important}
    }
  `;
  document.head.appendChild(s);
})();