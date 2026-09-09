// ActivAnatomy — deixa o fluxo de salvar a avaliação claro e logo abaixo do PDF
(function(){
  const css=document.createElement('style');
  css.textContent=`
  .aa-savebox{border:1px solid #bfd5d1!important;background:#f7fbfa!important;border-radius:16px!important;padding:14px!important;margin:12px 0 0!important}
  .aa-savebox .aa-save-title{font-size:16px;font-weight:900;color:#17302e;margin-bottom:3px}
  .aa-savebox .aa-save-sub{font-size:11px;color:#687674;line-height:1.35;margin-bottom:10px}
  .aa-savebox .aa-select{margin:0 0 9px!important}
  .aa-savebox #aaSaveEval{width:100%;padding:12px 14px;font-size:13px}
  .aa-savebox #aaSaveEval:disabled{opacity:.45;cursor:not-allowed}
  .aa-save-ready{margin-top:8px;padding:8px 10px;border-radius:10px;background:#edf8f1;color:#17683c;font-size:11px;font-weight:800}
  .aa-save-wait{margin-top:8px;padding:8px 10px;border-radius:10px;background:#f2f6f5;color:#687674;font-size:11px}
  .aa-add-patient{margin-top:9px!important}
  `;
  document.head.appendChild(css);

  function setup(){
    const box=document.querySelector('.aa-savebox'),drop=document.querySelector('.drop'),add=document.querySelector('.aa-add-patient');
    if(!box||!drop)return false;

    if(!box.dataset.aaFlow){
      box.dataset.aaFlow='1';
      const oldLabel=box.querySelector('label');
      if(oldLabel){
        const title=document.createElement('div');title.className='aa-save-title';title.textContent='2. Salvar avaliação no paciente';
        const sub=document.createElement('div');sub.className='aa-save-sub';sub.textContent='Depois de analisar o PDF, escolha o paciente. Serão salvos os resultados de força, ROM/ADM, assimetrias e o mapa anatômico desta avaliação.';
        oldLabel.replaceWith(title,sub);
      }
      // Traz o salvamento para perto do arquivo, sem precisar rolar até o fim dos resultados.
      drop.insertAdjacentElement('afterend',box);
      if(add)box.insertAdjacentElement('afterend',add);
    }

    const btn=document.getElementById('aaSaveEval'),status=document.getElementById('aaSaveStatus'),sel=document.getElementById('aaEvalPatient');
    if(!btn||!status)return true;

    const refresh=()=>{
      const tests=Array.isArray(window.currentTests)?window.currentTests:[];
      const rom=Array.isArray(window.currentROMTests)?window.currentROMTests:[];
      const hasData=tests.length>0||rom.length>0;
      btn.disabled=!hasData;
      if(status.textContent.includes('salva')||status.textContent.includes('Salvando'))return;
      if(hasData){
        const parts=[]; if(tests.length)parts.push(`${tests.length} teste${tests.length===1?'':'s'} de força`); if(rom.length)parts.push(`${rom.length} teste${rom.length===1?'':'s'} de ROM`);
        status.className='aa-save-status aa-save-ready';
        status.textContent=`Análise pronta: ${parts.join(' + ')}. Escolha o paciente e salve.`;
      }else{
        status.className='aa-save-status aa-save-wait';
        status.textContent='Primeiro analise o PDF. Depois este botão libera para salvar tudo no paciente.';
      }
      if(sel&&sel.value)btn.textContent='Salvar avaliação neste paciente';
      else btn.textContent='Salvar avaliação';
    };

    refresh();
    const input=document.getElementById('pdfFile'),analisar=document.getElementById('analisar');
    if(input&&!input.dataset.aaFlow){input.dataset.aaFlow='1';input.addEventListener('change',()=>{window.currentTests=[];window.currentROMTests=[];setTimeout(refresh,0)})}
    if(analisar&&!analisar.dataset.aaFlow){analisar.dataset.aaFlow='1';analisar.addEventListener('click',()=>{status.className='aa-save-status aa-save-wait';status.textContent='Analisando o PDF...';let n=0;const t=setInterval(()=>{refresh();if((window.currentTests?.length||window.currentROMTests?.length)||++n>60)clearInterval(t)},150)})}
    if(sel&&!sel.dataset.aaFlow){sel.dataset.aaFlow='1';sel.addEventListener('change',refresh)}
    return true;
  }

  if(setup())return;
  let n=0;const t=setInterval(()=>{if(setup()||++n>100)clearInterval(t)},100);
})();