// ActivAnatomy — corrige colisão visual do guia com o cabeçalho de Pacientes.
(function(){
  const s=document.createElement('style');
  s.id='aa-patients-layout-fix';
  s.textContent=`
  .aa-patients .aa-head{
    width:auto!important;height:auto!important;min-height:0!important;
    border-radius:0!important;background:transparent!important;
    margin:0!important;padding:0!important;
    display:flex!important;align-items:center!important;
    justify-content:space-between!important;gap:12px!important;
    position:static!important;float:none!important;
  }
  .aa-patients .aa-head>div{width:auto!important;height:auto!important;min-width:220px!important;flex:1 1 auto!important;background:transparent!important;border-radius:0!important;margin:0!important;padding:0!important}
  .aa-patients .aa-head h2,.aa-patients .aa-head h3{display:block!important;width:auto!important;height:auto!important;margin:0!important;padding:0!important;text-align:left!important;background:transparent!important;color:#17191d!important;font-size:24px!important;line-height:1.15!important}
  .aa-patients .aa-head h3{font-size:18px!important}
  .aa-patients .aa-head .hint{display:block!important;width:auto!important;height:auto!important;margin-top:5px!important;line-height:1.35!important;text-align:left!important}
  .aa-patients .aa-head .aa-primary{flex:0 0 auto!important;width:auto!important;height:auto!important;min-width:0!important;margin:0!important;padding:11px 14px!important;position:static!important;transform:none!important;white-space:nowrap!important}
  .aa-patients #aaPatientIndex{width:100%!important}
  .aa-patients #aaSearch{display:block!important;width:100%!important;margin:14px 0 10px!important}
  .aa-patients #aaList{clear:both!important;width:100%!important}
  @media(max-width:620px){
    .aa-patients .aa-head{align-items:stretch!important;flex-direction:column!important}
    .aa-patients .aa-head .aa-primary{width:100%!important}
    .aa-patients .aa-head h2{font-size:22px!important}
  }
  `;
  document.head.appendChild(s);
})();
