// ActivAnatomy — correção forte da tela Pacientes; neutraliza estilos do tutorial.
(function(){
 const s=document.createElement('style');
 s.id='aa-patient-layout-fix';
 s.textContent=`
 .aa-patients{display:none!important;width:100%!important;min-height:220px!important;background:#fff!important;border:1px solid #e1e2e5!important;border-radius:20px!important;padding:22px!important;box-sizing:border-box!important;overflow:visible!important}
 .aa-patients.show{display:block!important}
 .aa-patients #aaPatientIndex,.aa-patients #aaDetail{width:100%!important;max-width:none!important}
 .aa-patients .aa-head{
   width:100%!important;height:auto!important;min-height:0!important;
   border-radius:0!important;background:transparent!important;
   margin:0!important;padding:0!important;position:static!important;float:none!important;
   display:flex!important;align-items:flex-start!important;justify-content:space-between!important;
   gap:16px!important;flex-wrap:wrap!important;
 }
 .aa-patients #aaPatientIndex>.aa-head{margin-bottom:16px!important}
 .aa-patients .aa-head>div{display:block!important;width:auto!important;height:auto!important;min-width:260px!important;flex:1 1 420px!important;background:transparent!important;border:0!important;border-radius:0!important;margin:0!important;padding:0!important;position:static!important}
 .aa-patients .aa-head h2,.aa-patients .aa-head h3{display:block!important;width:auto!important;height:auto!important;margin:0!important;padding:0!important;background:transparent!important;text-align:left!important;color:#17191d!important;line-height:1.2!important;font-weight:800!important}
 .aa-patients .aa-head h2{font-size:28px!important}.aa-patients .aa-head h3{font-size:19px!important}
 .aa-patients .aa-head .hint{display:block!important;width:auto!important;height:auto!important;max-width:none!important;margin:5px 0 0!important;padding:0!important;font-size:11px!important;line-height:1.45!important;text-align:left!important;color:#6f737a!important;background:transparent!important}
 .aa-patients #aaNewPatient,.aa-patients .aa-head .aa-primary{position:static!important;float:none!important;transform:none!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important;width:auto!important;height:auto!important;min-width:150px!important;max-width:none!important;margin:0!important;padding:11px 15px!important;white-space:nowrap!important;line-height:1.2!important}
 .aa-patients .aa-search{position:static!important;display:block!important;width:100%!important;height:auto!important;min-height:46px!important;margin:0 0 16px!important;padding:12px 14px!important;box-sizing:border-box!important}
 .aa-patients .aa-list{display:grid!important;width:100%!important;gap:9px!important;clear:both!important}
 .aa-patients .aa-empty{display:block!important;width:100%!important;height:auto!important;margin:0!important;padding:30px 12px!important;text-align:center!important;position:static!important;color:#687674!important;background:transparent!important}
 .aa-patients .aa-history{display:block!important;width:100%!important;height:auto!important;margin-top:18px!important}
 .aa-patients .aa-select{width:100%!important;height:auto!important;margin:8px 0!important;box-sizing:border-box!important}
 @media(max-width:620px){
   .aa-patients{padding:16px!important}.aa-patients .aa-head{flex-direction:column!important;align-items:stretch!important}
   .aa-patients .aa-head>div{min-width:0!important;flex:1 1 auto!important}.aa-patients #aaNewPatient,.aa-patients .aa-head .aa-primary{width:100%!important}
   .aa-patients .aa-head h2{font-size:23px!important}
 }
 `;
 document.getElementById('aa-patient-layout-fix')?.remove();
 document.head.appendChild(s);
})();
