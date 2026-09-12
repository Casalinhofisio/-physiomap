// ActivAnatomy — mantém o comparativo ORIGINAL do patients.js.
// Este arquivo só colore os números e acrescenta o botão Baixar PDF.
(async function(){
  const wait=async()=>{for(let i=0;i<160;i++){const b=document.querySelector('#aaRunCompare'),r=document.querySelector('#aaCompareResult');if(b&&r)return {b,r};await new Promise(x=>setTimeout(x,100))}return null};
  const found=await wait(); if(!found)return;
  const {b:btn,r:result}=found;
  const style=document.createElement('style');
  style.textContent=`
    .aa-pdf-compare{display:none;border:0;background:#b91f2f;color:#fff;border-radius:12px;padding:11px 14px;font-weight:900;cursor:pointer;white-space:nowrap;margin-left:8px}
    .aa-pdf-compare.show{display:inline-block}.aa-pdf-compare:disabled{opacity:.6;cursor:wait}
    #aaCompareResult .aa-compare-table td.aa-pct-green{color:#168149!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-pct-yellow{color:#b77712!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-pct-red{color:#c43d38!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-evo-good{color:#168149!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-evo-bad{color:#c43d38!important;font-weight:900}
    #aaCompareResult .aa-compare-table td.aa-evo-neutral{color:#687674!important;font-weight:800}
    @media(max-width:800px){.aa-pdf-compare{width:100%;margin:8px 0 0}}
  `; document.head.appendChild(style);

  let pdfBtn=document.querySelector('#aaDownloadComparePDF');
  if(!pdfBtn){pdfBtn=document.createElement('button');pdfBtn.id='aaDownloadComparePDF';pdfBtn.className='aa-pdf-compare';pdfBtn.type='button';pdfBtn.textContent='Baixar PDF';btn.insertAdjacentElement('afterend',pdfBtn)}

  const zone=v=>v<=10?'aa-pct-green':v<=20?'aa-pct-yellow':'aa-pct-red';
  function decorate(){
    const table=result.querySelector('.aa-compare-table table');
    if(!table){pdfBtn.classList.remove('show');return}
    table.querySelectorAll('tbody tr').forEach(tr=>{
      const c=tr.querySelectorAll('td');
      [1,2].forEach(i=>{const td=c[i];if(!td)return;td.classList.remove('aa-pct-green','aa-pct-yellow','aa-pct-red');const m=td.textContent.match(/(-?\d+(?:[.,]\d+)?)\s*%/);if(m)td.classList.add(zone(Math.abs(Number(m[1].replace(',','.')))))});
      const td=c[3];if(td){td.classList.remove('aa-good','aa-bad','aa-evo-good','aa-evo-bad','aa-evo-neutral');const m=td.textContent.match(/([+-]?\d+(?:[.,]\d+)?)\s*p\.p\./i);if(m){const v=Number(m[1].replace(',','.'));td.classList.add(v<0?'aa-evo-good':v>0?'aa-evo-bad':'aa-evo-neutral')}else td.classList.add('aa-evo-neutral')}
    });
    pdfBtn.classList.add('show');
  }
  new MutationObserver(()=>setTimeout(decorate,0)).observe(result,{childList:true,subtree:true});
  decorate();

  const load=(id,src)=>new Promise((ok,no)=>{if(document.getElementById(id))return ok();const s=document.createElement('script');s.id=id;s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)});
  pdfBtn.onclick=async()=>{
    if(!result.querySelector('.aa-compare-table table'))return;
    pdfBtn.disabled=true;pdfBtn.textContent='Gerando PDF...';
    try{
      if(!window.html2canvas)await load('aa-html2canvas','https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
      if(!window.jspdf)await load('aa-jspdf','https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js');
      const patient=document.querySelector('#aaDetailName')?.textContent?.trim()||'Paciente';
      const capture=document.createElement('div');capture.style.cssText='position:fixed;left:-10000px;top:0;width:1100px;background:#fff;padding:28px;color:#17302e;font-family:Arial,sans-serif';
      capture.innerHTML=`<div style="border-bottom:2px solid #b91f2f;padding-bottom:10px;margin-bottom:16px"><div style="font-size:28px;font-weight:800">ActivAnatomy</div><div style="font-size:13px">Comparação de avaliações — ${patient.replace(/[&<>"']/g,'')}</div></div>`;
      const clone=result.cloneNode(true);clone.style.display='block';capture.appendChild(clone);document.body.appendChild(capture);
      const canvas=await window.html2canvas(capture,{scale:1.6,backgroundColor:'#fff',useCORS:true,logging:false});capture.remove();
      const {jsPDF}=window.jspdf,pdf=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'}),w=281,h=canvas.height*281/canvas.width,img=canvas.toDataURL('image/jpeg',.94);let remaining=h,y=8;pdf.addImage(img,'JPEG',8,y,w,h);remaining-=194;while(remaining>0){pdf.addPage();y=8-(h-remaining);pdf.addImage(img,'JPEG',8,y,w,h);remaining-=194}
      const safe=patient.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'_')||'paciente';pdf.save(`ActivAnatomy_Comparacao_${safe}.pdf`);
    }catch(e){console.error(e);alert('Não foi possível gerar o PDF agora. Tente novamente.')}finally{pdfBtn.disabled=false;pdfBtn.textContent='Baixar PDF'}
  };
})();