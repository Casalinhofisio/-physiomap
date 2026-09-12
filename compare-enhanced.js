// ActivAnatomy — comparativo clássico: mapas + tabela colorida + PDF
(async function(){
  const wait=async()=>{for(let i=0;i<140;i++){const b=document.querySelector('#aaRunCompare');if(window.activAnatomySupabase&&b&&typeof b.onclick==='function')return b;await new Promise(r=>setTimeout(r,100))}return null};
  const btn=await wait();
  if(!btn||btn.dataset.aaClassicWrapped==='1')return;
  btn.dataset.aaClassicWrapped='1';
  const result=document.querySelector('#aaCompareResult');
  if(!result)return;

  const style=document.createElement('style');
  style.textContent=`
    .aa-pdf-compare{display:none;border:0;background:#b91f2f;color:#fff;border-radius:12px;padding:11px 14px;font-weight:900;cursor:pointer;white-space:nowrap}
    .aa-pdf-compare.show{display:inline-block}.aa-pdf-compare:disabled{opacity:.6;cursor:wait}
    #aaCompareResult .aa-compare-table td.aa-pct-green{color:#168149!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-pct-yellow{color:#b77712!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-pct-red{color:#c43d38!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-evo-good{color:#168149!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-evo-bad{color:#c43d38!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-evo-neutral{color:#687674!important;font-weight:800}
    .aa-pdf-title{display:none}
    @media(max-width:800px){.aa-pdf-compare{width:100%;margin-top:2px}}
  `;
  document.head.appendChild(style);

  let pdfBtn=document.querySelector('#aaDownloadComparePDF');
  if(!pdfBtn){
    pdfBtn=document.createElement('button');
    pdfBtn.id='aaDownloadComparePDF';
    pdfBtn.className='aa-pdf-compare';
    pdfBtn.type='button';
    pdfBtn.textContent='Baixar PDF';
    btn.insertAdjacentElement('afterend',pdfBtn);
  }

  const original=btn.onclick;
  const zoneClass=v=>v<=10?'aa-pct-green':v<=20?'aa-pct-yellow':'aa-pct-red';
  function paintTable(){
    const table=result.querySelector('.aa-compare-table table');
    if(!table){pdfBtn.classList.remove('show');return}
    table.querySelectorAll('tbody tr').forEach(tr=>{
      const cells=tr.querySelectorAll('td');
      [1,2].forEach(i=>{
        const td=cells[i]; if(!td)return;
        td.classList.remove('aa-pct-green','aa-pct-yellow','aa-pct-red');
        const m=td.textContent.match(/(-?\d+(?:[.,]\d+)?)\s*%/);
        if(m){const v=Math.abs(Number(m[1].replace(',','.')));td.classList.add(zoneClass(v))}
      });
      const evo=cells[3];
      if(evo){
        evo.classList.remove('aa-good','aa-bad','aa-evo-good','aa-evo-bad','aa-evo-neutral');
        const m=evo.textContent.match(/([+-]?\d+(?:[.,]\d+)?)\s*p\.p\./i);
        if(m){const v=Number(m[1].replace(',','.'));evo.classList.add(v<0?'aa-evo-good':v>0?'aa-evo-bad':'aa-evo-neutral')}
        else evo.classList.add('aa-evo-neutral');
      }
    });
    pdfBtn.classList.add('show');
  }

  btn.onclick=function(ev){
    pdfBtn.classList.remove('show');
    const out=original.call(this,ev);
    setTimeout(paintTable,40);
    setTimeout(paintTable,220);
    return out;
  };

  const loadScript=(id,src)=>new Promise((resolve,reject)=>{
    if(document.getElementById(id))return resolve();
    const s=document.createElement('script');s.id=id;s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
  });

  pdfBtn.onclick=async()=>{
    if(!result.querySelector('.aa-compare-table table'))return;
    pdfBtn.disabled=true;const oldText=pdfBtn.textContent;pdfBtn.textContent='Gerando PDF...';
    try{
      if(!window.html2canvas)await loadScript('aa-html2canvas','https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
      if(!window.jspdf)await loadScript('aa-jspdf','https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js');
      const patient=document.querySelector('#aaDetailName')?.textContent?.trim()||'Paciente';
      const capture=document.createElement('div');
      capture.style.cssText='position:fixed;left:-10000px;top:0;width:1120px;background:#fff;padding:30px;color:#17302e;font-family:Arial,sans-serif;z-index:-1';
      capture.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:18px;border-bottom:2px solid #b91f2f;padding-bottom:12px"><div><div style="font-size:28px;font-weight:800">ActivAnatomy</div><div style="font-size:12px;color:#687674">Dinamometria & Mapeamento de Força</div></div><div style="text-align:right"><div style="font-size:17px;font-weight:800">Comparação de avaliações</div><div style="font-size:12px;color:#687674">${patient.replace(/[&<>"']/g,'')}</div></div></div>`;
      const clone=result.cloneNode(true);
      clone.querySelectorAll('button').forEach(x=>x.remove());
      clone.style.display='block';
      capture.appendChild(clone);
      document.body.appendChild(capture);
      const canvas=await window.html2canvas(capture,{scale:1.7,backgroundColor:'#ffffff',useCORS:true,logging:false});
      capture.remove();
      const {jsPDF}=window.jspdf;
      const pdf=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
      const pageW=297,pageH=210,margin=8,usableW=pageW-margin*2,usableH=pageH-margin*2;
      const img=canvas.toDataURL('image/jpeg',0.94);
      const imgH=canvas.height*usableW/canvas.width;
      let y=margin,remaining=imgH;
      pdf.addImage(img,'JPEG',margin,y,usableW,imgH);
      remaining-=usableH;
      while(remaining>0){pdf.addPage();y=margin-(imgH-remaining);pdf.addImage(img,'JPEG',margin,y,usableW,imgH);remaining-=usableH}
      const safe=patient.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'_').replace(/^_+|_+$/g,'')||'paciente';
      pdf.save(`ActivAnatomy_Comparacao_${safe}.pdf`);
    }catch(err){console.error(err);alert('Não foi possível gerar o PDF agora. Tente novamente.')}
    finally{pdfBtn.disabled=false;pdfBtn.textContent=oldText}
  };
})();
