// ActivAnatomy — suporte a relatórios mistos ActivForce: Força + ROM
(function(){
 const style=document.createElement('style');style.textContent=`
 .aa-rom{margin-top:16px;border-top:1px solid #dfe7e5;padding-top:14px}.aa-rom h3{margin:0 0 4px;font-size:16px}.aa-rom-sub{font-size:11px;color:#687674;margin-bottom:8px}.aa-rec{margin-top:9px;padding:10px 11px;border-radius:10px;background:#f2f6f5;font-size:12px;line-height:1.45;color:#425552}.aa-rec b{color:#17302e}.aa-rom-test{border:1px solid #dfe7e5;border-radius:14px;padding:12px;margin-top:9px}.aa-rom-badge{font-size:10px;font-weight:900;color:#145d58;background:#e9f3f1;border-radius:999px;padding:4px 7px}.aa-rom .vals{margin-top:9px}`;document.head.appendChild(style);
 let lastROM=[];
 const num=s=>{const m=String(s||'').match(/-?\d+(?:[.,]\d+)?/);return m?Number(m[0].replace(',','.')):null};
 const clean=s=>String(s||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
 const norm=s=>clean(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const pct=(a,b)=>{const top=Math.max(Math.abs(a),Math.abs(b));return top?Math.abs(a-b)/top*100:0};
 function parseROM(text){
   if(!/ActivForce|ActivBody/i.test(text)||!/\bROM\b|Ângulo Máximo|Angulo Maximo/i.test(text))return[];
   const lines=text.split('\n').map(clean).filter(Boolean),groups=new Map();
   // Preferir a tabela "Dados de teste", pois ela identifica lado, movimento e cada repetição.
   for(const line of lines){
     const m=line.match(/^#\s*(\d+)\s+ROM\s+(Direita|Esquerda)\s+(.+?)\s+[ÂA]ngulo\s+M[aá]ximo\s*:\s*([\d.,]+)\s*°/i);
     if(!m)continue;
     const name=clean(m[3]).replace(/\s*\((?:Esquerda|Direita)\/(?:Esquerda|Direita)\)\s*$/i,'');
     const key=norm(name),side=m[2].toLowerCase().startsWith('e')?'left':'right',v=num(m[4]);
     if(!groups.has(key))groups.set(key,{name,leftVals:[],rightVals:[]});
     groups.get(key)[side+'Vals'].push(v);
   }
   // Alguns PDFs quebram a linha da tabela. Procura blocos ROM quando necessário.
   if(!groups.size){
     for(let i=0;i<lines.length;i++){
       const h=lines[i].match(/^#\s*\d+\s+ROM\s+(.+?)(?:\s*\((?:Esquerda|Direita)\/(?:Esquerda|Direita)\))?$/i);if(!h)continue;
       const name=clean(h[1]).replace(/\s*\((?:Esquerda|Direita)\/(?:Esquerda|Direita)\)\s*$/i,'');let l=null,r=null;
       for(let j=i+1;j<Math.min(i+40,lines.length);j++){
         if(j>i+1&&/^#\s*\d+\s+(?:ROM|Força)/i.test(lines[j]))break;
         if(/Ângulo Máximo Médio|Angulo Maximo Medio/i.test(lines[j])){
           for(let k=j+1;k<Math.min(j+12,lines.length);k++){
             if(/^Esquerda$/i.test(lines[k]))l=num(lines[k+1]);
             if(/^Direita$/i.test(lines[k]))r=num(lines[k+1]);
           }
           break;
         }
       }
       if(l!=null&&r!=null)groups.set(norm(name),{name,leftVals:[l],rightVals:[r]});
     }
   }
   return [...groups.values()].map(g=>{const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;return{name:g.name,left:avg(g.leftVals),right:avg(g.rightVals),metric:'°'}}).filter(x=>x.left!=null&&x.right!=null);
 }
 function recommendation(t,type){
   const p=pct(t.left,t.right),weak=t.left<t.right?'esquerdo':t.right<t.left?'direito':'nenhum';
   if(type==='rom'){
     if(p<=10)return 'ADM bilateral semelhante. Manter o trabalho de mobilidade e acompanhar em reavaliações.';
     if(p<=20)return `Há diferença moderada de amplitude, com menor valor no lado ${weak}. Considerar trabalho de mobilidade direcionado e reavaliar a evolução.`;
     return `Há diferença importante de amplitude, com menor valor no lado ${weak}. Priorizar investigação clínica e trabalho de mobilidade conforme a avaliação do profissional.`;
   }
   if(p<=10)return 'Força bilateral equilibrada. Manter o trabalho de força e acompanhar em reavaliações.';
   if(p<=20)return `Assimetria moderada. Considerar maior atenção ao lado ${weak} no fortalecimento e acompanhar a evolução.`;
   return `Assimetria importante. Considerar prioridade ao lado ${weak} no fortalecimento e reavaliar após o período de intervenção.`;
 }
 function addForceRecommendations(tests){
   const cards=[...document.querySelectorAll('#testes .test')];
   cards.forEach((card,i)=>{if(!tests[i]||card.querySelector('.aa-rec'))return;const d=document.createElement('div');d.className='aa-rec';d.innerHTML='<b>Recomendação:</b> '+recommendation(tests[i],'force');card.appendChild(d)});
 }
 function renderROM(rom){
   const host=document.getElementById('testes');if(!host)return;
   host.querySelector('.aa-rom')?.remove();if(!rom.length)return;
   const sec=document.createElement('div');sec.className='aa-rom';sec.innerHTML='<h3>Mobilidade / Amplitude de Movimento</h3><div class="aa-rom-sub">Testes ROM identificados no mesmo relatório ActivForce. Estes dados não pintam o mapa muscular de força.</div>'+rom.map(t=>{const p=pct(t.left,t.right),weak=t.left<t.right?'E':t.right<t.left?'D':'—';return `<div class="aa-rom-test"><div class="test-head"><b>${t.name}</b><span class="aa-rom-badge">ROM</span></div><div class="vals"><div class="val">Esquerda<b>${t.left.toFixed(1)}°</b></div><div class="val">Direita<b>${t.right.toFixed(1)}°</b></div><div class="val">Diferença<b>${p.toFixed(1)}% • menor ${weak}</b></div></div><div class="aa-rec"><b>Recomendação:</b> ${recommendation(t,'rom')}</div></div>`}).join('');host.appendChild(sec);
 }
 // Intercepta a extração para guardar também ROM sem alterar o parser de força já validado.
 const originalExtract=window.extractPDF;
 if(typeof originalExtract==='function')window.extractPDF=async function(file){const text=await originalExtract(file);lastROM=parseROM(text);window.currentROMTests=lastROM;window.currentFileName=file?.name||null;return text};
 // Intercepta a renderização existente: força continua igual; acrescenta recomendações + ROM embaixo.
 const originalRender=window.renderTests;
 if(typeof originalRender==='function')window.renderTests=function(tests){originalRender(tests);window.currentTests=tests||[];setTimeout(()=>{addForceRecommendations(tests||[]);renderROM(lastROM)},0)};
 // Alguns builds usam render() em vez de renderTests(). Observa a área para garantir que a seção adicional apareça.
 const host=document.getElementById('testes');if(host){const obs=new MutationObserver(()=>{if(window.currentTests?.length)addForceRecommendations(window.currentTests);if(lastROM.length&&!host.querySelector('.aa-rom'))renderROM(lastROM)});obs.observe(host,{childList:true,subtree:true})}
 window.parseROMTests=parseROM;
})();