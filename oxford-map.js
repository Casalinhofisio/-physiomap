// ActivAnatomy — renderização Oxford/MRC separada da dinamometria ActivForce.
(function(){
  const COLORS={green:'#35aa67',yellow:'#e9a62f',red:'#db5651'};
  const rank={green:1,yellow:2,red:3};
  const gradeZone=v=>Number(v)>=5?'green':Number(v)>=4?'yellow':'red';
  const gradeText=v=>['Sem contração palpável','Contração palpável, sem movimento','Movimento com gravidade eliminada','Movimento contra a gravidade','Contra resistência moderada','Força considerada normal'][Number(v)]||'';
  const isOxfordSet=tests=>Array.isArray(tests)&&tests.length&&tests.every(t=>String(t.metric||'').toLowerCase()==='oxford'||String(t.method||'').toLowerCase().includes('oxford'));
  const isFront=id=>{const n=Number(String(id).replace('p',''));return n>=2&&n<=51};
  function install(){
    if(typeof window.render!=='function'||typeof window.resetBody!=='function'||typeof window.targetFor!=='function')return false;
    if(window.render.__aaOxfordSafe)return true;
    const oldRender=window.render;
    function paintOxford(tests){
      window.resetBody();
      const chosen={},infos={};
      const add=(ids,z,info)=>ids.forEach(id=>{if(!chosen[id]||rank[z]>rank[chosen[id]])chosen[id]=z;(infos[id]??=[]).push(info)});
      tests.forEach(t=>{
        const g=window.targetFor(t.name);if(!g)return;
        const zl=gradeZone(t.left),zr=gradeZone(t.right);
        const fl=g.right.filter(isFront),fr=g.left.filter(isFront),bl=g.left.filter(id=>!isFront(id)),br=g.right.filter(id=>!isFront(id));
        add(fl,zl,{t,side:'left',label:g.label});add(bl,zl,{t,side:'left',label:g.label});
        add(fr,zr,{t,side:'right',label:g.label});add(br,zr,{t,side:'right',label:g.label});
      });
      Object.entries(chosen).forEach(([id,z])=>{const el=document.getElementById(id);if(el){el.style.fill=COLORS[z];el.classList.add('has-finding');el.dataset.oxford='1';el.dataset.oxfordInfo=JSON.stringify(infos[id]||[]);}});
      const svg=document.getElementById('detailed-anatomy');
      if(svg&&!svg.dataset.oxfordClick){
        svg.dataset.oxfordClick='1';
        svg.addEventListener('click',e=>{
          const p=e.target.closest?.('[data-oxford="1"]');if(!p)return;
          e.stopImmediatePropagation();
          let list=[];try{list=JSON.parse(p.dataset.oxfordInfo||'[]')}catch(_){return}
          const info=document.getElementById('map-info');if(!info)return;
          info.className='map-info active';
          info.innerHTML=list.map(f=>{const v=f.side==='left'?f.t.left:f.t.right;const side=f.side==='left'?'Esquerda':'Direita';return `<b>${f.t.display_name||f.t.name}</b><div class="mini">${f.label}<br>${side}: Oxford ${v}/5 — ${gradeText(v)}</div>`}).join('<div style="height:7px"></div>');
        },true);
      }
    }
    const wrapped=function(tests){
      if(!isOxfordSet(tests))return oldRender(tests);
      const box=document.getElementById('testes');if(!box)return;
      box.innerHTML='';
      tests.forEach(t=>{
        const zl=gradeZone(t.left),zr=gradeZone(t.right),d=Math.abs(Number(t.left)-Number(t.right));
        const weaker=Number(t.left)<Number(t.right)?'Esquerda':Number(t.right)<Number(t.left)?'Direita':'Mesmo grau';
        const g=window.targetFor(t.name);
        const el=document.createElement('div');el.className='test';
        el.innerHTML=`<div class="test-head"><b>${t.display_name||t.name}</b><span class="asym" style="color:${d===0?COLORS.green:COLORS.yellow}">${d===0?'mesmo grau':`diferença de ${d} grau${d===1?'':'s'}`}</span></div>${g?`<div class="muscle-name">Mapa: ${g.label}</div>`:'<div class="muscle-name">Movimento registrado; região sem mapeamento anatômico específico.</div>'}<div class="vals"><div class="val">Esquerda<b style="color:${COLORS[zl]}">Oxford ${t.left}/5</b><small>${gradeText(t.left)}</small></div><div class="val">Direita<b style="color:${COLORS[zr]}">Oxford ${t.right}/5</b><small>${gradeText(t.right)}</small></div><div class="val">Lado com menor grau<b>${weaker}</b></div></div>`;
        box.appendChild(el);
      });
      paintOxford(tests);
    };
    wrapped.__aaOxfordSafe=true;window.render=wrapped;
    return true;
  }
  let n=0;const timer=setInterval(()=>{if(install()||++n>80)clearInterval(timer)},100);
})();