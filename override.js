// PhysioMap: exibe TODOS os achados bilaterais do PDF no boneco.
// Regra visual: <=10% = ambos verdes; 10-20% = forte verde / fraco amarelo; >20% = forte verde / fraco vermelho.
// Sem números/marcadores sobre o boneco: apenas as cores musculares.

(function(){
  const originalReset = resetBody;

  resetBody = function(){
    originalReset();
    document.querySelectorAll('.finding-marker,.finding-number').forEach(x=>x.remove());
  };

  function sideZone(t, side){
    const p=asym(t.left,t.right), z=zone(p);
    if(p<=10 || t.left===t.right) return 'green';
    const weak=t.left<t.right?'left':'right';
    return side===weak?z:'green';
  }

  paintTests = function(tests){
    resetBody();
    const chosen={}, rank={green:1,yellow:2,red:3};
    const apply=(ids,z)=>{for(const id of ids){if(!chosen[id]||rank[z]>rank[chosen[id]])chosen[id]=z;}};

    tests.forEach(t=>{
      const g=targetFor(t.name);
      if(!g) return;
      apply(g.left,sideZone(t,'left'));
      apply(g.right,sideZone(t,'right'));
    });

    for(const [id,z] of Object.entries(chosen)){
      const el=document.getElementById(id);
      if(el) el.style.fill=COLORS[z];
    }
  };

  render = function(tests){
    const box=$('testes'); box.innerHTML='';
    for(let i=0;i<tests.length;i++){
      const t=tests[i], p=asym(t.left,t.right), z=zone(p);
      const side=t.left<t.right?'Esquerda':t.right<t.left?'Direita':'Igual';
      const g=targetFor(t.name), zl=sideZone(t,'left'), zr=sideZone(t,'right');
      const colorName=z=>z==='green'?'verde':z==='yellow'?'amarelo':'vermelho';
      const d=document.createElement('div'); d.className='test';
      d.innerHTML=`<div class="test-head"><b>${t.name}</b><span class="asym" style="color:${COLORS[z]}">${p.toFixed(1)}%</span></div>${g?`<div class="muscle-name">Mapa: ${g.label}</div>`:''}<div class="vals"><div class="val">Esquerda<b style="color:${COLORS[zl]}">${t.left.toFixed(1)} kg • ${colorName(zl)}</b></div><div class="val">Direita<b style="color:${COLORS[zr]}">${t.right.toFixed(1)} kg • ${colorName(zr)}</b></div><div class="val">Lado mais fraco<b>${side}</b></div></div>`;
      box.appendChild(d);
    }
    if(!tests.length) box.innerHTML='<div class="empty">Nenhum teste reconhecido.</div>';
    paintTests(tests);
  };

  const hint=document.querySelector('.map-title small');
  if(hint) hint.textContent='todos os achados do PDF';
})();
