// ActivAnatomy — correção de estabilidade do leitor.
// Remove Oxford/MRC da análise e evita que o parser flexível replique o mesmo teste dezenas de vezes.
(function(){
  if(typeof window==='undefined') return;
  window.parseTests=function(text){
    const primary=[
      ...(typeof parseSummary==='function'?parseSummary(text):[]),
      ...(typeof parseDirect==='function'?parseDirect(text):[]),
      ...(typeof parseNarrative==='function'?parseNarrative(text):[])
    ];
    const out=[], seen=new Set();
    const add=t=>{
      if(!t||t.left==null||t.right==null)return;
      const name=String(t.name||'').replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
      if(!name)return;
      const canon=(typeof norm==='function'?norm(name):name.toLowerCase()).replace(/[^a-z0-9]+/g,' ').trim();
      const key=canon+'|'+Number(t.left).toFixed(2)+'|'+Number(t.right).toFixed(2);
      if(seen.has(key))return;
      seen.add(key);out.push({name,left:Number(t.left),right:Number(t.right),metric:'kg'});
    };
    primary.forEach(add);
    // Só usa texto livre se os leitores estruturados não encontrarem nada.
    // Assim um relatório ActivForce não é relido linha por linha e multiplicado.
    if(!out.length && typeof parseFlexible==='function'){
      const flex=parseFlexible(text)||[];
      const byMovement=new Map();
      flex.forEach(t=>{
        if(!t||t.left==null||t.right==null)return;
        const name=String(t.name||'').replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
        const canon=(typeof norm==='function'?norm(name):name.toLowerCase()).replace(/[^a-z0-9]+/g,' ').trim();
        if(!byMovement.has(canon))byMovement.set(canon,t);
      });
      [...byMovement.values()].forEach(add);
    }
    return out;
  };
})();