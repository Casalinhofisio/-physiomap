// ActivAnatomy — garante que a avaliação atual fique disponível para salvar no paciente.
(function(){
  function readMeta(){
    const txt=id=>document.getElementById(id)?.textContent?.trim()||'';
    return {
      patient: txt('paciente')||'Não identificado',
      date: txt('data')||null,
      weight: txt('peso')||null
    };
  }
  function captureFile(){
    const f=document.getElementById('pdfFile')?.files?.[0];
    if(f) window.currentFileName=f.name;
  }
  function install(){
    if(typeof window.render==='function' && !window.render.__aaStateWrapped){
      const original=window.render;
      const wrapped=function(tests){
        const arr=Array.isArray(tests)?tests:[];
        window.currentTests=arr.map(t=>({
          name:t.name,
          left:Number(t.left),
          right:Number(t.right),
          metric:t.metric||'kg'
        })).filter(t=>t.name&&Number.isFinite(t.left)&&Number.isFinite(t.right));
        captureFile();
        const meta=readMeta();
        window.currentPatient={...(window.currentPatient||{}),...meta};
        return original.apply(this,arguments);
      };
      wrapped.__aaStateWrapped=true;
      window.render=wrapped;
    }
    const btn=document.getElementById('analisar');
    if(btn&&!btn.dataset.aaStateFix){
      btn.dataset.aaStateFix='1';
      btn.addEventListener('click',()=>{
        captureFile();
        // O parser/render é assíncrono. Atualiza os metadados depois que o resultado aparecer.
        let tries=0;
        const timer=setInterval(()=>{
          const cards=document.querySelectorAll('#testes .test');
          if(cards.length||++tries>40){
            const meta=readMeta();
            window.currentPatient={...(window.currentPatient||{}),...meta};
            clearInterval(timer);
          }
        },150);
      });
    }
  }
  install();
  let attempts=0;
  const timer=setInterval(()=>{
    install();
    if(++attempts>40)clearInterval(timer);
  },100);
})();