// Mostra todos os achados bilaterais no mapa.
// Regra visual: lado mais forte = verde; lado mais fraco = cor da assimetria.
// Se a assimetria for <=10%, os dois lados ficam verdes.
paintTests = function(tests){
  resetBody();
  const chosen = {};
  const rank = {green:1,yellow:2,red:3};
  const apply = (ids, z) => {
    for (const id of ids) {
      if (!chosen[id] || rank[z] > rank[chosen[id]]) chosen[id] = z;
    }
  };
  for (const t of tests) {
    const p = asym(t.left, t.right);
    const z = zone(p);
    const g = targetFor(t.name);
    if (!g) continue;
    if (p <= 10 || t.left === t.right) {
      apply(g.left, 'green');
      apply(g.right, 'green');
      continue;
    }
    const weak = t.left < t.right ? 'left' : 'right';
    const strong = weak === 'left' ? 'right' : 'left';
    apply(g[strong], 'green');
    apply(g[weak], z);
  }
  for (const [id, z] of Object.entries(chosen)) {
    const el = document.getElementById(id);
    if (el) el.style.fill = COLORS[z];
  }
};

const mapHint = document.querySelector('.map-title small');
if (mapHint) mapHint.textContent = 'mostra os dois lados avaliados';
