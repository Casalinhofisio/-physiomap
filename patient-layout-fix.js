// ActivAnatomy — corrige conflitos visuais do guia com a tela de pacientes.
(function(){
 const s=document.createElement('style');
 s.id='aa-patient-layout-fix';
 s.textContent=`
 .aa-patients .aa-head{width:auto!important;height:auto!important;border-radius:0!important;background:transparent!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;flex-wrap:wrap!important}
 .aa-patients .aa-head h2,.aa-patients .aa-head h3{margin:0!important;display:block!important;color:#17191d!important;line-height:1.2!important}
 .aa-patients #aaPatientIndex>.aa-head{margin-bottom:14px!important}
 .aa-patients .aa-search{display:block!important;width:100%!important;margin:0 0 14px!important;box-sizing:border-box!important}
 .aa-patients .aa-history{display:block!important;margin-top:18px!important}
 .aa-patients .aa-select{width:100%!important;height:auto!important;margin:8px 0!important;box-sizing:border-box!important}
 .aa-patients .aa-primary{width:auto!important;height:auto!important;min-width:0!important;white-space:nowrap!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;padding:11px 14px!important}
 .aa-patients #aaNewPatient{position:static!important;float:none!important;margin:0!important}
 .aa-patients .aa-empty{width:100%!important;text-align:center!important;padding:28px 12px!important;box-sizing:border-box!important}
 .aa-patients{min-height:180px!important}
 @media(max-width:560px){.aa-patients .aa-head{align-items:flex-start!important}.aa-patients #aaNewPatient{width:100%!important}}
 `;
 document.head.appendChild(s);
})();