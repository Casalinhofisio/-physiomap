// PhysioMap — mapa anatômico detalhado usando o SVG fornecido pelo usuário.
// Carrega os 92 cortes salvos em anatomy/part1..part6 e associa movimentos do ActivForce às regiões funcionais.
(async function(){
  const COLORS_LOCAL={green:'#35aa67',yellow:'#e9a62f',red:'#db5651'};
  const neutral='#d7dfdd', base='#eef2f1';

  try{
    const parts=await Promise.all([1,2,3,4,5,6].map(i=>fetch(`anatomy/part${i}.txt`).then(r=>{if(!r.ok)throw new Error('anatomy '+i);return r.text()})));
    const bodybox=document.querySelector('.bodybox');
    if(!bodybox)return;

    bodybox.innerHTML=`<div class="detailed-labels"><b>Frente</b><b>Costas</b></div><svg id="detailed-anatomy" viewBox="120 400 790 960" preserveAspectRatio="xMidYMid meet" aria-label="Mapa anatômico detalhado"></svg>`;
    const svg=document.getElementById('detailed-anatomy');
    svg.innerHTML=parts.join('');
    svg.style.width='100%';svg.style.height='auto';svg.style.maxHeight='720px';

    const paths=[...svg.querySelectorAll('path')];
    paths.forEach((p,i)=>{
      const n=i+1;p.id=`p${n}`;
      p.style.stroke='#fff';p.style.strokeWidth='1.05';
      p.style.transition='fill .18s ease';
      if(n===1){p.style.display='none';return;}
      if(n===2||n===52){p.dataset.base='1';p.style.fill=base;}
      else{p.dataset.muscle='1';p.style.fill=neutral;}
    });

    // Lateridade visual mantida igual ao mapa anterior: E à esquerda e D à direita em cada vista.
    const ns='http://www.w3.org/2000/svg';
    [['E',205,1342],['D',320,1342],['E',690,1342],['D',815,1342]].forEach(([t,x,y])=>{const el=document.createElementNS(ns,'text');el.textContent=t;el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('fill','#60706d');el.setAttribute('font-size','15');el.setAttribute('font-weight','800');svg.appendChild(el)});

    const style=document.createElement('style');
    style.textContent='.detailed-labels{display:grid;grid-template-columns:1fr 1fr;text-align:center;color:#687674;font-size:13px;margin:2px 8% 0;gap:24%}#detailed-anatomy{display:block;margin:auto}.muscle-name{line-height:1.25}';
    document.head.appendChild(style);

    // Ações musculares: quadríceps = extensão do joelho; isquiotibiais = flexão do joelho/extensão do quadril;
    // adutores = adução do quadril; iliopsoas/compartimento anterior = flexão do quadril;
    // gastrocnêmio/sóleo = flexão plantar; compartimento anterior = dorsiflexão.
    const GROUPS_DETAILED={
      shoulderFlex:{label:'Flexão de ombro • deltoide anterior / peitoral superior',left:['p4','p3'],right:['p23','p22']},
      shoulderAbd:{label:'Abdução de ombro • deltoide',left:['p4'],right:['p23']},
      shoulderAdd:{label:'Adução de ombro • peitoral / grande dorsal',left:['p3','p54'],right:['p22','p74']},
      shoulderER:{label:'Rotação externa • deltoide posterior / região infraespinal',left:['p55','p62'],right:['p75','p82']},
      shoulderIR:{label:'Rotação interna • peitoral / grande dorsal',left:['p3','p54'],right:['p22','p74']},
      shoulderExt:{label:'Extensão de ombro • deltoide posterior / grande dorsal',left:['p55','p54'],right:['p75','p74']},
      shoulder:{label:'Ombro / deltoide',left:['p4','p55'],right:['p23','p75']},
      biceps:{label:'Flexão de cotovelo • bíceps / braquial',left:['p5'],right:['p24']},
      triceps:{label:'Extensão de cotovelo • tríceps',left:['p56','p63','p64'],right:['p76','p83','p84']},
      hipAbd:{label:'Abdução de quadril • glúteo médio',left:['p68'],right:['p88']},
      hipAdd:{label:'Adução de quadril • adutores da coxa',left:['p19'],right:['p40']},
      hipFlex:{label:'Flexão de quadril • flexores / reto femoral proximal',left:['p17','p20'],right:['p38','p41']},
      hipExt:{label:'Extensão de quadril • glúteo máximo / isquiotibiais',left:['p67','p66'],right:['p87','p86']},
      quad:{label:'Extensão de joelho • quadríceps',left:['p13','p19','p20'],right:['p33','p40','p41']},
      ham:{label:'Flexão de joelho • isquiotibiais',left:['p61','p66'],right:['p81','p86']},
      tib:{label:'Dorsiflexão • tibial anterior / compartimento anterior',left:['p10','p12','p15'],right:['p30','p32','p36']},
      calf:{label:'Flexão plantar • gastrocnêmio / sóleo',left:['p69','p70','p71','p72'],right:['p89','p90','p91','p92']},
      forearm:{label:'Punho / antebraço',left:['p8','p18'],right:['p28','p39']}
    };

    window.targetFor=function(name){
      const s=String(name||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      if(s.includes('ombro')){
        if(s.includes('rotacao externa'))return GROUPS_DETAILED.shoulderER;
        if(s.includes('rotacao interna'))return GROUPS_DETAILED.shoulderIR;
        if(s.includes('abdu'))return GROUPS_DETAILED.shoulderAbd;
        if(s.includes('adu'))return GROUPS_DETAILED.shoulderAdd;
        if(s.includes('flex'))return GROUPS_DETAILED.shoulderFlex;
        if(s.includes('ext'))return GROUPS_DETAILED.shoulderExt;
        return GROUPS_DETAILED.shoulder;
      }
      if(s.includes('cotovelo')&&s.includes('flex'))return GROUPS_DETAILED.biceps;
      if(s.includes('cotovelo')&&s.includes('ext'))return GROUPS_DETAILED.triceps;
      if(s.includes('quadril')&&s.includes('abdu'))return GROUPS_DETAILED.hipAbd;
      if(s.includes('quadril')&&s.includes('adu'))return GROUPS_DETAILED.hipAdd;
      if(s.includes('quadril')&&s.includes('flex'))return GROUPS_DETAILED.hipFlex;
      if(s.includes('quadril')&&s.includes('ext'))return GROUPS_DETAILED.hipExt;
      if(s.includes('joelho')&&s.includes('ext'))return GROUPS_DETAILED.quad;
      if(s.includes('joelho')&&s.includes('flex'))return GROUPS_DETAILED.ham;
      if(s.includes('tornozelo')&&(s.includes('dorsi')||s.includes('dorsal')))return GROUPS_DETAILED.tib;
      if(s.includes('tornozelo')&&(s.includes('plantar')||s.includes('plantiflex')))return GROUPS_DETAILED.calf;
      if(s.includes('punho'))return GROUPS_DETAILED.forearm;
      return null;
    };

    window.resetBody=function(){svg.querySelectorAll('[data-muscle]').forEach(p=>p.style.fill=neutral);document.querySelectorAll('.finding-marker,.finding-number').forEach(x=>x.remove())};
    const sideZone=(t,side)=>{const p=asym(t.left,t.right),z=zone(p);if(p<=10||t.left===t.right)return'green';const weak=t.left<t.right?'left':'right';return side===weak?z:'green'};

    window.paintTests=function(tests){
      resetBody();const chosen={},rank={green:1,yellow:2,red:3};
      const apply=(ids,z)=>ids.forEach(id=>{if(!chosen[id]||rank[z]>rank[chosen[id]])chosen[id]=z});
      tests.forEach(t=>{const g=targetFor(t.name);if(!g)return;apply(g.left,sideZone(t,'left'));apply(g.right,sideZone(t,'right'))});
      Object.entries(chosen).forEach(([id,z])=>{const el=document.getElementById(id);if(el)el.style.fill=COLORS_LOCAL[z]});
    };

    window.render=function(tests){
      const box=document.getElementById('testes');box.innerHTML='';
      tests.forEach(t=>{
        const p=asym(t.left,t.right),z=zone(p),side=t.left<t.right?'Esquerda':t.right<t.left?'Direita':'Igual',g=targetFor(t.name),zl=sideZone(t,'left'),zr=sideZone(t,'right');
        const cn=z=>z==='green'?'verde':z==='yellow'?'amarelo':'vermelho';
        const d=document.createElement('div');d.className='test';
        d.innerHTML=`<div class="test-head"><b>${t.name}</b><span class="asym" style="color:${COLORS_LOCAL[z]}">${p.toFixed(1)}%</span></div>${g?`<div class="muscle-name">Mapa: ${g.label}</div>`:'<div class="muscle-name">Mapa: movimento ainda sem região definida</div>'}<div class="vals"><div class="val">Esquerda<b style="color:${COLORS_LOCAL[zl]}">${t.left.toFixed(1)} kg • ${cn(zl)}</b></div><div class="val">Direita<b style="color:${COLORS_LOCAL[zr]}">${t.right.toFixed(1)} kg • ${cn(zr)}</b></div><div class="val">Lado mais fraco<b>${side}</b></div></div>`;
        box.appendChild(d);
      });
      if(!tests.length)box.innerHTML='<div class="empty">Nenhum teste reconhecido.</div>';
      paintTests(tests);
    };

    const hint=document.querySelector('.map-title small');if(hint)hint.textContent='SVG detalhado • todos os achados bilaterais';
  }catch(e){console.error('Falha ao carregar mapa anatômico detalhado',e)}
})();