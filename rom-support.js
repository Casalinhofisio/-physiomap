// ActivAnatomy — Força + ROM no mesmo relatório ActivForce
(function(){
 const style=document.createElement('style');style.textContent=`.aa-rom{margin-top:16px;border-top:1px solid #dfe7e5;padding-top:14px}.aa-rom h3{margin:0 0 4px;font-size:16px}.aa-rom-sub{font-size:11px;color:#687674;margin-bottom:8px}.aa-rec{margin-top:9px;padding:10px 11px;border-radius:10px;background:#f2f6f5;font-size:12px;line-height:1.45;color:#425552}.aa-rec b{color:#17302e}.aa-rom-test{border:1px solid #dfe7e5;border-radius:14px;padding:12px;margin-top:9px}.aa-rom-badge{font-size:10px;font-weight:900;color:#145d58;background:#e9f3f1;border-radius:999px;padding:4px 7px}`;document.head.appendChild(style);
 const num=s=>{const m=String(s||'').match(/-?\d+(?:[.,]\d+)?/);return m?Number(m[0].replace(',','.')):null},clean=s=>String(s||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim(),key=s=>clean(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),pct=(a,b)=>{const m=Math.max(Math.abs(a),Math.abs(b));return m?Math.abs(a-b)/m*100:0};
 function parseROM(text){
  if(!/ActivForce|activbody/i.test(text))return[];
  const lines=text.split('\n').map(clean).filter(Boolean),g=new Map();
  const put=(name,side,v)=>{if(v==null)return;name=clean(name).replace(/\s*\((?:Esquerda|Direita)\/(?:Esquerda|Direita)\)\s*$/i,'');const k=key(name);if(!g.has(k))g.set(k,{name,left:[],right:[]});g.get(k)[side].push(v)};
  // Formato da tabela detalhada: #N / movimento / ROM / lado / Ângulo Máximo: N°
  for(let i=0;i<lines.length;i++){
   let m=lines[i].match(/^#\s*(\d+)\s+(.+)$/),name='',j=i+1;if(m){name=m[2]}else if((m=lines[i].match(/^#\s*(\d+)$/))){name=lines[i+1]||'';j=i+2}else continue;
   if(!/^(Ombro|Quadril|Joelho|Tornozelo|Cotovelo|Punho)/i.test(name))continue;
   let isROM=false,side=null,v=null;
   for(let x=j;x<Math.min(j+14,lines.length);x++){
    const s=lines[x];if(/^#\s*\d+/.test(s))break;if(/^ROM$/i.test(s)||/\bROM\b/i.test(s))isROM=true;if(/^Esquerda$/i.test(s)||/ROM\s+Esquerda/i.test(s))side='left';if(/^Direita$/i.test(s)||/ROM\s+Direita/i.test(s))side='right';const a=s.match(/[ÂA]ngulo\s+M[aá]ximo\s*:?\s*([\d.,]+)\s*°?/i);if(a)v=num(a[1]);const packed=s.match(/ROM\s+(Esquerda|Direita).*?[ÂA]ngulo\s+M[aá]ximo\s*:?\s*([\d.,]+)/i);if(packed){isROM=true;side=packed[1].toLowerCase().startsWith('e')?'left':'right';v=num(packed[2])}if(isROM&&side&&v!=null)break;
   }
   if(isROM&&side&&v!=null)put(name,side,v);
  }
  // Formato resumo: ROM Direita/Esquerda Movimento ... Ângulo Máximo: N°
  lines.forEach(s=>{const m=s.match(/ROM\s+(Direita|Esquerda)\s+(.+?)\s+[ÂA]ngulo\s+M[aá]ximo\s*:?\s*([\d.,]+)/i);if(m)put(m[2],m[1].toLowerCase().startsWith('e')?'left':'right',num(m[3]))});
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;return [...g.values()].map(x=>({name:x.name,left:avg(x.left),right:avg(x.right),metric:'°'})).filter(x=>x.left!=null&&x.right!=null);
 }
 function rec(t,type){const p=pct(t.left,t.right),weak=t.left<t.right?'esquerdo':t.right<t.left?'direito':'nenhum';if(type==='rom'){if(p<=10)return'ADM bilateral semelhante. Manter mobilidade e acompanhar em reavaliações.';if(p<=20)return`Diferença moderada de amplitude, menor no lado ${weak}. Considerar mobilidade direcionada e reavaliar.`;return`Diferença importante de amplitude, menor no lado ${weak}. Priorizar investigação clínica e mobilidade conforme a avaliação profissional.`}if(p<=10)return'Força bilateral equilibrada. Manter fortalecimento e acompanhar em reavaliações.';if(p<=20)return`Assimetria moderada. Dar maior atenção ao lado ${weak} no fortalecimento e acompanhar a evolução.`;return`Assimetria importante. Priorizar o lado ${weak} no fortalecimento e reavaliar após a intervenção.`}
 function forceRec(tests){const cards=[...document.querySelectorAll('#testes .test')];cards.forEach((c,i)=>{if(!tests[i]||c.querySelector('.aa-rec'))return;const d=document.createElement('div');d.className='aa-rec';d.innerHTML='<b>Recomendação:</b> '+rec(tests[i],'force');c.appendChild(d)})}
 function renderROM(rom){const host=document.getElementById('testes');if(!host)return;host.querySelector('.aa-rom')?.remove();if(!rom.length)return;const sec=document.createElement('div');sec.className='aa-rom';sec.innerHTML='<h3>Mobilidade / Amplitude de Movimento</h3><div class="aa-rom-sub">ROM identificado no mesmo PDF. Não interfere nas cores do mapa de força.</div>'+rom.map(t=>{const p=pct(t.left,t.right),w=t.left<t.right?'E':t.right<t.left?'D':'—';return`<div class="aa-rom-test"><div class="test-head"><b>${t.name}</b><span class="aa-rom-badge">ROM</span></div><div class="vals"><div class="val">Esquerda<b>${t.left.toFixed(1)}°</b></div><div class="val">Direita<b>${t.right.toFixed(1)}°</b></div><div class="val">Diferença<b>${p.toFixed(1)}% • menor ${w}</b></div></div><div class="aa-rec"><b>Recomendação:</b> ${rec(t,'rom')}</div></div>`}).join('');host.appendChild(sec)}
 // O leitor principal usa funções internas; por isso processamos o MESMO clique de Analisar independentemente.
 const btn=document.getElementById('analisar'),input=document.getElementById('pdfFile');
 if(btn&&input)btn.addEventListener('click',async()=>{const file=input.files?.[0];if(!file)return;try{const text=await extractPDF(file),rom=parseROM(text),tests=typeof window.parseTests==='function'?window.parseTests(text):[];window.currentROMTests=rom;window.currentTests=tests;window.currentFileName=file.name;setTimeout(()=>{forceRec(tests);renderROM(rom)},350)}catch(e){console.error('ROM ActivAnatomy',e)} });
 window.parseROMTests=parseROM;
})();