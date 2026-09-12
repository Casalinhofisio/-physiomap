// ActivAnatomy — comparativo confiável de avaliações de força
(async function(){
  const wait=async()=>{for(let i=0;i<120;i++){if(window.activAnatomySupabase&&document.querySelector('#aaRunCompare'))return true;await new Promise(r=>setTimeout(r,100))}return false};
  if(!await wait())return;
  const sb=window.activAnatomySupabase;
  const btn=document.querySelector('#aaRunCompare');
  const result=document.querySelector('#aaCompareResult');
  if(!btn||!result)return;

  const style=document.createElement('style');
  style.textContent=`
  .aac-wrap{margin-top:14px}.aac-note{font-size:11px;line-height:1.45;color:#64716f;background:#fff;border:1px solid #e1e9e7;border-radius:12px;padding:10px 12px;margin-bottom:12px}
  .aac-top{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin:12px 0}.aac-kpi{background:#fff;border:1px solid #dfe7e5;border-radius:14px;padding:11px}.aac-kpi span{display:block;color:#6f7c79;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.35px}.aac-kpi b{display:block;color:#17302e;font-size:18px;margin-top:4px}.aac-kpi small{display:block;color:#6f7c79;font-size:10px;margin-top:2px}
  .aac-test{background:#fff;border:1px solid #dfe7e5;border-radius:16px;padding:14px;margin:10px 0}.aac-test-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap}.aac-test-title{font-weight:900;color:#17302e;font-size:14px}.aac-status{font-size:10px;font-weight:900;padding:5px 8px;border-radius:999px}.aac-green{background:#e8f7ee;color:#167944}.aac-yellow{background:#fff5dc;color:#9a6810}.aac-red{background:#ffebea;color:#a73b36}.aac-gray{background:#eef2f1;color:#64716f}
  .aac-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px}.aac-metric{background:#f6f9f8;border-radius:11px;padding:9px}.aac-metric span{display:block;color:#71807d;font-size:10px}.aac-metric b{display:block;color:#17302e;font-size:13px;margin-top:3px}.aac-delta-up{color:#168149!important}.aac-delta-down{color:#b23d38!important}.aac-delta-neutral{color:#667572!important}
  .aac-chart{margin-top:12px;padding-top:11px;border-top:1px solid #e6eceb}.aac-chart-title{font-size:10px;font-weight:900;color:#64716f;margin-bottom:8px;text-transform:uppercase;letter-spacing:.3px}.aac-bar-row{display:grid;grid-template-columns:86px 1fr 56px;gap:8px;align-items:center;margin:6px 0}.aac-bar-label{font-size:10px;color:#60706d;white-space:nowrap}.aac-track{height:10px;background:#edf1f0;border-radius:999px;overflow:hidden}.aac-fill{height:100%;border-radius:999px}.aac-old{background:#95a5a2}.aac-new{background:#215f59}.aac-bar-value{font-size:10px;font-weight:800;color:#17302e;text-align:right}.aac-asym{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.aac-asym-box{border-radius:11px;padding:9px;background:#f6f9f8}.aac-asym-box span{display:block;font-size:10px;color:#71807d}.aac-asym-box b{display:block;font-size:14px;margin-top:3px}.aac-conclusion{margin-top:10px;font-size:11px;line-height:1.45;color:#435450;background:#f7faf9;border-radius:10px;padding:9px 10px}
  .aac-unmatched{margin-top:12px;font-size:11px;color:#7b6663;background:#fff7f5;border:1px solid #f0ded9;border-radius:12px;padding:10px 12px}.aac-empty{padding:20px;text-align:center;color:#6b7976;background:#fff;border:1px solid #dfe7e5;border-radius:14px}
  @media(max-width:760px){.aac-top{grid-template-columns:1fr 1fr}.aac-metrics{grid-template-columns:1fr}.aac-bar-row{grid-template-columns:72px 1fr 52px}}`;
  document.head.appendChild(style);

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const fmtDate=d=>{if(!d)return'—';const p=String(d).slice(0,10).split('-');return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:String(d)};
  const n=v=>Number(v);
  const valid=v=>Number.isFinite(n(v));
  const asym=(l,r)=>{l=n(l);r=n(r);const top=Math.max(Math.abs(l),Math.abs(r));return top?Math.abs(l-r)/top*100:0};
  const pct=(oldV,newV)=>{oldV=n(oldV);newV=n(newV);if(!Number.isFinite(oldV)||!Number.isFinite(newV)||oldV===0)return null;return (newV-oldV)/Math.abs(oldV)*100};
  const absDelta=(a,b)=>n(b)-n(a);
  const key=t=>String(t?.name||'').trim().replace(/\s+/g,' ').toLocaleLowerCase('pt-BR');
  const isForce=t=>t&&valid(t.left)&&valid(t.right)&&(!t.metric||String(t.metric).toLowerCase()==='kg');
  const zone=p=>p<=10?{label:'≤ 10% · verde',cls:'aac-green'}:p<=20?{label:'10–20% · amarelo',cls:'aac-yellow'}:{label:'> 20% · vermelho',cls:'aac-red'};
  const deltaText=(oldV,newV,unit='kg')=>{const d=absDelta(oldV,newV),p=pct(oldV,newV);return `${d>=0?'+':''}${d.toFixed(1)} ${unit}${p==null?'':` (${p>=0?'+':''}${p.toFixed(1)}%)`}`};
  const deltaClass=(oldV,newV)=>absDelta(oldV,newV)>0?'aac-delta-up':absDelta(oldV,newV)<0?'aac-delta-down':'aac-delta-neutral';
  const bar=(label,value,max,kind)=>`<div class="aac-bar-row"><div class="aac-bar-label">${esc(label)}</div><div class="aac-track"><div class="aac-fill ${kind}" style="width:${max>0?Math.max(2,Math.min(100,n(value)/max*100)):0}%"></div></div><div class="aac-bar-value">${n(value).toFixed(1)} kg</div></div>`;

  function pairTests(oldEval,newEval){
    const oldTests=(Array.isArray(oldEval.tests)?oldEval.tests:[]).filter(isForce);
    const newTests=(Array.isArray(newEval.tests)?newEval.tests:[]).filter(isForce);
    const oldMap=new Map(oldTests.map(t=>[key(t),t]));
    const newMap=new Map(newTests.map(t=>[key(t),t]));
    const paired=[];
    for(const [k,a] of oldMap){if(newMap.has(k))paired.push({name:a.name||newMap.get(k).name,old:a,new:newMap.get(k)})}
    const onlyOld=[...oldMap.entries()].filter(([k])=>!newMap.has(k)).map(([,t])=>t.name);
    const onlyNew=[...newMap.entries()].filter(([k])=>!oldMap.has(k)).map(([,t])=>t.name);
    return {paired,onlyOld,onlyNew};
  }

  function renderTest(p,oldDate,newDate){
    const a=p.old,b=p.new;
    const pa=asym(a.left,a.right),pb=asym(b.left,b.right),dpp=pb-pa,z=zone(pb);
    const max=Math.max(n(a.left),n(a.right),n(b.left),n(b.right),0);
    const weakA=n(a.left)<n(a.right)?'Esquerdo':n(a.right)<n(a.left)?'Direito':'Equilibrado';
    const weakB=n(b.left)<n(b.right)?'Esquerdo':n(b.right)<n(b.left)?'Direito':'Equilibrado';
    const concl=dpp<0?`A assimetria reduziu ${Math.abs(dpp).toFixed(1)} p.p. (${pa.toFixed(1)}% → ${pb.toFixed(1)}%).`:dpp>0?`A assimetria aumentou ${dpp.toFixed(1)} p.p. (${pa.toFixed(1)}% → ${pb.toFixed(1)}%).`:`A assimetria permaneceu em ${pb.toFixed(1)}%.`;
    return `<div class="aac-test">
      <div class="aac-test-head"><div><div class="aac-test-title">${esc(p.name)}</div><div style="font-size:10px;color:#7a8785;margin-top:3px">Comparação exata do mesmo teste</div></div><span class="aac-status ${z.cls}">${z.label}</span></div>
      <div class="aac-metrics">
        <div class="aac-metric"><span>Lado esquerdo</span><b>${n(a.left).toFixed(1)} → ${n(b.left).toFixed(1)} kg</b><b class="${deltaClass(a.left,b.left)}">${deltaText(a.left,b.left)}</b></div>
        <div class="aac-metric"><span>Lado direito</span><b>${n(a.right).toFixed(1)} → ${n(b.right).toFixed(1)} kg</b><b class="${deltaClass(a.right,b.right)}">${deltaText(a.right,b.right)}</b></div>
        <div class="aac-metric"><span>Assimetria</span><b>${pa.toFixed(1)}% → ${pb.toFixed(1)}%</b><b class="${dpp<0?'aac-delta-up':dpp>0?'aac-delta-down':'aac-delta-neutral'}">${dpp>0?'+':''}${dpp.toFixed(1)} p.p.</b></div>
      </div>
      <div class="aac-chart"><div class="aac-chart-title">Força por lado</div>${bar(`${oldDate} · E`,a.left,max,'aac-old')}${bar(`${newDate} · E`,b.left,max,'aac-new')}${bar(`${oldDate} · D`,a.right,max,'aac-old')}${bar(`${newDate} · D`,b.right,max,'aac-new')}</div>
      <div class="aac-asym"><div class="aac-asym-box"><span>Lado de menor valor · anterior</span><b>${weakA}</b></div><div class="aac-asym-box"><span>Lado de menor valor · atual</span><b>${weakB}</b></div></div>
      <div class="aac-conclusion">${concl} Valores representam comparação matemática das medições salvas; não substituem interpretação clínica ou erro de medida do equipamento.</div>
    </div>`;
  }

  async function enhancedCompare(){
    const idA=document.querySelector('#aaCompareA')?.value,idB=document.querySelector('#aaCompareB')?.value;
    if(!idA||!idB||idA===idB){alert('Escolha duas avaliações diferentes.');return}
    btn.disabled=true;btn.textContent='Comparando...';result.innerHTML='<div class="aac-empty">Carregando avaliações...</div>';
    try{
      const {data,error}=await sb.from('evaluations').select('*').in('id',[idA,idB]);
      if(error)throw error;
      if(!data||data.length!==2)throw new Error('Não foi possível carregar as duas avaliações.');
      let a=data.find(x=>x.id===idA),b=data.find(x=>x.id===idB);
      const time=e=>new Date(e.evaluation_date||e.created_at||0).getTime();
      let oldEval=a,newEval=b;
      if(time(a)>time(b)){oldEval=b;newEval=a}
      const oldDate=fmtDate(oldEval.evaluation_date||oldEval.created_at),newDate=fmtDate(newEval.evaluation_date||newEval.created_at);
      const sourceA=String(oldEval.source||'').toLowerCase(),sourceB=String(newEval.source||'').toLowerCase();
      if(sourceA.includes('oxford')||sourceB.includes('oxford')){
        result.innerHTML='<div class="aac-empty">Este comparador é exclusivo para dinamometria em kg. Avaliações Oxford/MRC devem ser comparadas por graus 0–5, sem converter para porcentagem de força.</div>';return;
      }
      const {paired,onlyOld,onlyNew}=pairTests(oldEval,newEval);
      if(!paired.length){result.innerHTML='<div class="aac-empty">As duas avaliações não têm testes de força equivalentes com o mesmo nome. Nada foi comparado para evitar pareamentos incorretos.</div>';return}
      const oldWorst=Math.max(...paired.map(p=>asym(p.old.left,p.old.right)));
      const newWorst=Math.max(...paired.map(p=>asym(p.new.left,p.new.right)));
      const avg=(arr,fn)=>arr.reduce((s,x)=>s+fn(x),0)/arr.length;
      const avgOld=avg(paired,p=>(n(p.old.left)+n(p.old.right))/2),avgNew=avg(paired,p=>(n(p.new.left)+n(p.new.right))/2);
      const overallPct=pct(avgOld,avgNew);
      const unmatched=[...onlyOld.map(x=>`${x} (somente ${oldDate})`),...onlyNew.map(x=>`${x} (somente ${newDate})`)];
      result.innerHTML=`<div class="aac-wrap">
        <div class="aac-note"><b>Comparação confiável:</b> o ActivAnatomy só pareou testes com o mesmo nome normalizado, sem aproximação automática. Avaliação anterior: <b>${oldDate}</b>. Avaliação posterior: <b>${newDate}</b>.</div>
        <div class="aac-top">
          <div class="aac-kpi"><span>Testes pareados</span><b>${paired.length}</b><small>mesmo movimento</small></div>
          <div class="aac-kpi"><span>Pior assimetria anterior</span><b>${oldWorst.toFixed(1)}%</b><small>${zone(oldWorst).label}</small></div>
          <div class="aac-kpi"><span>Pior assimetria atual</span><b>${newWorst.toFixed(1)}%</b><small>${zone(newWorst).label}</small></div>
          <div class="aac-kpi"><span>Média bilateral dos testes</span><b>${avgOld.toFixed(1)} → ${avgNew.toFixed(1)} kg</b><small>${overallPct==null?'variação % indisponível':`${overallPct>=0?'+':''}${overallPct.toFixed(1)}%`}</small></div>
        </div>
        ${paired.map(p=>renderTest(p,oldDate,newDate)).join('')}
        ${unmatched.length?`<div class="aac-unmatched"><b>Não comparados:</b> ${unmatched.map(esc).join(' • ')}. Foram excluídos para não comparar testes diferentes.</div>`:''}
      </div>`;
      result.scrollIntoView({behavior:'smooth',block:'start'});
    }catch(err){result.innerHTML=`<div class="aac-empty">Erro ao comparar: ${esc(err?.message||err)}</div>`}
    finally{btn.disabled=false;btn.textContent='Comparar'}
  }

  btn.onclick=enhancedCompare;
})();
