// ActivAnatomy — módulo próprio de Escala Oxford / MRC (0–5)
(function(){
 const MOVES=[
  ['Cervical','Flexão'],['Cervical','Extensão'],['Cervical','Inclinação lateral'],['Cervical','Rotação'],
  ['Escápula','Elevação'],['Escápula','Retração'],['Escápula','Protração'],
  ['Ombro','Flexão'],['Ombro','Extensão'],['Ombro','Abdução'],['Ombro','Adução'],['Ombro','Rotação externa'],['Ombro','Rotação interna'],
  ['Cotovelo','Flexão'],['Cotovelo','Extensão'],['Antebraço','Pronação'],['Antebraço','Supinação'],
  ['Punho','Flexão'],['Punho','Extensão'],['Punho','Desvio radial'],['Punho','Desvio ulnar'],
  ['Mão','Flexão dos dedos'],['Mão','Extensão dos dedos'],['Mão','Abdução dos dedos'],['Mão','Adução dos dedos'],['Polegar','Oposição'],['Polegar','Abdução'],['Polegar','Adução'],['Polegar','Flexão'],['Polegar','Extensão'],
  ['Tronco','Flexão'],['Tronco','Extensão'],['Tronco','Rotação'],['Tronco','Inclinação lateral'],
  ['Quadril','Flexão'],['Quadril','Extensão'],['Quadril','Abdução'],['Quadril','Adução'],['Quadril','Rotação externa'],['Quadril','Rotação interna'],
  ['Joelho','Flexão'],['Joelho','Extensão'],
  ['Tornozelo','Dorsiflexão'],['Tornozelo','Flexão plantar'],['Tornozelo','Inversão'],['Tornozelo','Eversão'],
  ['Hálux','Extensão'],['Hálux','Flexão'],['Dedos do pé','Extensão'],['Dedos do pé','Flexão']
 ];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 function oxfordInterpret(v){v=Number(v);return ['Sem contração palpável','Contração palpável, sem movimento','Movimento com gravidade eliminada','Movimento contra a gravidade','Contra resistência moderada','Força considerada normal'][v]||''}
 function normalizeRegionForMap(region,movement){
  if(region==='Antebraço') return `Punho ${movement}`;
  if(region==='Mão'||region==='Polegar') return `Punho ${movement}`;
  if(region==='Hálux'||region==='Dedos do pé') return `Tornozelo ${movement}`;
  if(region==='Escápula') return `Ombro ${movement}`;
  return `${region} ${movement}`;
 }
 function testsFromRows(root){
  return [...root.querySelectorAll('.aao-row')].map(r=>{const l=r.querySelector('[data-side="left"]').value,rgt=r.querySelector('[data-side="right"]').value;if(l===''&&rgt==='')return null;return {name:normalizeRegionForMap(r.dataset.region,r.dataset.movement),display_name:`${r.dataset.region} — ${r.dataset.movement}`,region:r.dataset.region,movement:r.dataset.movement,left:l===''?0:Number(l),right:rgt===''?0:Number(rgt),metric:'oxford',method:'Oxford / MRC',source:'ActivAnatomy Oxford'} }).filter(Boolean);
 }
 function applyOxford(tests,patient,date){
  window.currentTests=tests;
  window.currentOxfordTests=tests;
  window.currentManualForceTests=tests;
  window.currentPatient={patient:patient||'Não identificado',date:date||'—',weight:null};
  window.currentFileName='Avaliação Oxford / MRC';
  const p=document.getElementById('paciente'),d=document.getElementById('data'),q=document.getElementById('qtd'),w=document.getElementById('peso'),st=document.getElementById('status');
  if(p)p.textContent=patient||'Não identificado';if(d)d.textContent=date?date.split('-').reverse().join('/'):'—';if(q)q.textContent=String(tests.length);if(w)w.textContent='—';
  if(typeof window.render==='function')window.render(tests);
  if(st){st.className='status ok';st.innerHTML=`Escala Oxford carregada: <b>${tests.length}</b> movimento(s) avaliado(s).`}
  document.dispatchEvent(new CustomEvent('activanatomy:manual-force-change',{detail:{tests}}));
 }
 async function ensureJsPDF(){if(window.jspdf?.jsPDF)return window.jspdf.jsPDF;await new Promise((ok,fail)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';s.onload=ok;s.onerror=fail;document.head.appendChild(s)});return window.jspdf.jsPDF}
 async function downloadPDF(tests,patient,date,professional){
  if(!tests.length)return alert('Preencha pelo menos um movimento antes de gerar o PDF.');
  const jsPDF=await ensureJsPDF(),doc=new jsPDF({unit:'mm',format:'a4'}),W=210,M=16;let y=18;
  doc.setFont('helvetica','bold');doc.setFontSize(20);doc.text('ActivAnatomy',M,y);doc.setFontSize(11);doc.text('Escala Oxford / MRC — Avaliação de força muscular',M,y+7);y+=17;
  doc.setFont('helvetica','normal');doc.setFontSize(10);doc.text(`Identificador ${patient||'Não identificado'}`,M,y);y+=6;doc.text(`Data ${date?date.split('-').reverse().join('/'):'—'}`,M,y);y+=6;if(professional){doc.text(`Profissional ${professional}`,M,y);y+=6}y+=3;
  doc.setFillColor(242,246,245);doc.roundedRect(M,y,W-M*2,12,2,2,'F');doc.setFontSize(9);doc.text('0 sem contração • 1 contração sem movimento • 2 gravidade eliminada • 3 contra gravidade',M+3,y+5);doc.text('4 contra resistência moderada • 5 força considerada normal',M+3,y+9);y+=17;
  const header=()=>{doc.setFont('helvetica','bold');doc.setFontSize(9);doc.text('Movimento',M,y);doc.text('E',151,y);doc.text('D',171,y);y+=3;doc.line(M,y,W-M,y);y+=5;doc.setFont('helvetica','normal')};header();
  tests.forEach(t=>{if(y>267){doc.addPage();y=18;header()}doc.setFontSize(9);doc.text(t.display_name||t.name,M,y,{maxWidth:128});doc.text(`${t.left}/5`,151,y);doc.text(`${t.right}/5`,171,y);y+=6});
  y+=4;if(y>250){doc.addPage();y=18}doc.setFontSize(8);doc.setTextColor(100);doc.text('Dados estruturados para reimportação no ActivAnatomy:',M,y);y+=4;tests.forEach(t=>{if(y>284){doc.addPage();y=18}doc.text(`AAOXFORD|${t.region}|${t.movement}|${t.left}|${t.right}`,M,y);y+=4});doc.setTextColor(0);
  const safe=(patient||'Paciente').replace(/[^A-Za-zÀ-ÿ0-9_-]+/g,'_');doc.save(`ActivAnatomy_Oxford_${safe}.pdf`);
 }
 function parseOxfordPDF(text){if(!/AAOXFORD\|/i.test(text))return null;const rx=/AAOXFORD\s*\|\s*([^|\n]+)\|\s*([^|\n]+)\|\s*([0-5])\s*\|\s*([0-5])/gi,out=[],seen=new Set();let m;while((m=rx.exec(text))){const region=m[1].trim(),movement=m[2].trim(),l=Number(m[3]),r=Number(m[4]),key=region+'|'+movement;if(seen.has(key))continue;seen.add(key);out.push({name:normalizeRegionForMap(region,movement),display_name:`${region} — ${movement}`,region,movement,left:l,right:r,metric:'oxford',method:'Oxford / MRC',source:'ActivAnatomy Oxford PDF'})}return out}
 function installParser(){if(typeof window.parseTests!=='function')return false;if(window.parseTests.__aaOxford)return true;const old=window.parseTests;const wrapped=function(text){const ox=parseOxfordPDF(text);return ox&&ox.length?ox:old(text)};wrapped.__aaOxford=true;window.parseTests=wrapped;return true}
 function boot(){
  const main=document.querySelector('main.wrap'),hero=document.querySelector('.hero'),grid=document.querySelector('.grid');if(!main||!hero||!grid||document.getElementById('aaOxfordPage'))return;
  const style=document.createElement('style');style.textContent=`.aao-page{display:none;background:#fff;border:1px solid #dfe7e5;border-radius:20px;padding:18px;box-shadow:0 5px 18px #183d3914}.aao-page.show{display:block}.aao-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap}.aao-head h2{margin:0}.aao-sub{font-size:12px;color:#687674;margin-top:4px}.aao-info{display:grid;grid-template-columns:2fr 1fr 1.5fr;gap:8px;margin:15px 0}.aao-info label{font-size:10px;font-weight:800;color:#687674;display:block;margin-bottom:4px}.aao-info input{width:100%;border:1px solid #d6e1df;border-radius:10px;padding:10px}.aao-guide{border:1px solid #dfe7e5;background:#f7faf9;border-radius:13px;padding:11px;font-size:11px;color:#536360;line-height:1.5;margin-bottom:14px}.aao-tools{display:flex;gap:8px;flex-wrap:wrap}.aao-btn{border:0;border-radius:11px;padding:10px 13px;font-weight:900;cursor:pointer;background:#145d58;color:#fff}.aao-btn.alt{background:#e8efee;color:#17302e}.aao-filter{width:100%;margin:13px 0 8px;border:1px solid #d6e1df;border-radius:11px;padding:11px}.aao-table{display:grid;gap:8px}.aao-group{font-size:13px;font-weight:900;color:#145d58;margin-top:11px}.aao-row{display:grid;grid-template-columns:1fr 130px 130px;gap:8px;align-items:center;border:1px solid #e1e9e7;border-radius:12px;padding:9px 10px}.aao-name{font-weight:800;font-size:12px}.aao-side label{display:block;font-size:9px;color:#687674;margin-bottom:3px}.aao-side select{width:100%;border:1px solid #d6e1df;border-radius:9px;padding:8px;background:#fff}.aao-count{font-size:11px;color:#687674;margin-top:10px}@media(max-width:700px){.aao-info{grid-template-columns:1fr}.aao-row{grid-template-columns:1fr 1fr}.aao-name{grid-column:1/-1}}@media print{.aao-page{display:none!important}}`;document.head.appendChild(style);
  const nav=hero.querySelector('.aa-nav');if(nav&&!nav.querySelector('[data-page="oxford"]')){const b=document.createElement('button');b.className='aa-nav-btn';b.dataset.page='oxford';b.textContent='Escala Oxford';nav.appendChild(b)}
  const page=document.createElement('section');page.id='aaOxfordPage';page.className='aao-page';page.innerHTML=`<div class="aao-head"><div><h2>Escala Oxford / MRC</h2><div class="aao-sub">Preencha os movimentos avaliados, aplique no mapa anatômico ou gere um PDF para reimportar no ActivAnatomy.</div></div><div class="aao-tools"><button class="aao-btn" id="aaoApply">Aplicar no mapa</button><button class="aao-btn" id="aaoPDF">Baixar PDF Oxford</button><button class="aao-btn alt" id="aaoClear">Limpar</button></div></div><div class="aao-info"><div><label>Paciente</label><input id="aaoPatient" placeholder="Nome do paciente"></div><div><label>Data</label><input id="aaoDate" type="date"></div><div><label>Profissional</label><input id="aaoProfessional" placeholder="Nome do fisioterapeuta"></div></div><div class="aao-guide"><b>Escala:</b> 0 = sem contração palpável • 1 = contração palpável sem movimento • 2 = movimento com gravidade eliminada • 3 = movimento contra a gravidade • 4 = movimento contra resistência moderada • 5 = força considerada normal. <b>Deixe em branco o movimento que não foi avaliado.</b></div><input class="aao-filter" id="aaoFilter" placeholder="Buscar movimento, ex.: abdução de quadril"><div class="aao-table" id="aaoTable"></div><div class="aao-count" id="aaoCount">0 movimentos preenchidos</div>`;grid.insertAdjacentElement('afterend',page);
  const table=page.querySelector('#aaoTable');let last='';table.innerHTML=MOVES.map(([region,movement])=>{const group=region!==last?`<div class="aao-group" data-group="${esc(region)}">${esc(region)}</div>`:'';last=region;const opts='<option value="">—</option>'+[0,1,2,3,4,5].map(v=>`<option value="${v}">${v} — ${oxfordInterpret(v)}</option>`).join('');return `${group}<div class="aao-row" data-region="${esc(region)}" data-movement="${esc(movement)}"><div class="aao-name">${esc(movement)}</div><div class="aao-side"><label>Esquerdo</label><select data-side="left">${opts}</select></div><div class="aao-side"><label>Direito</label><select data-side="right">${opts}</select></div></div>`}).join('');
  const count=()=>{const n=testsFromRows(page).length;page.querySelector('#aaoCount').textContent=`${n} movimento${n===1?'':'s'} preenchido${n===1?'':'s'}`};page.addEventListener('change',count);
  page.querySelector('#aaoFilter').oninput=e=>{const q=String(e.target.value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();table.querySelectorAll('.aao-row').forEach(r=>{const s=(r.dataset.region+' '+r.dataset.movement).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();r.style.display=!q||s.includes(q)?'grid':'none'});table.querySelectorAll('.aao-group').forEach(g=>{const region=g.dataset.group;const any=[...table.querySelectorAll(`.aao-row[data-region="${CSS.escape(region)}"]`)].some(r=>r.style.display!=='none');g.style.display=any?'block':'none'})};
  page.querySelector('#aaoApply').onclick=()=>{const tests=testsFromRows(page);if(!tests.length)return alert('Preencha pelo menos um movimento.');applyOxford(tests,page.querySelector('#aaoPatient').value.trim(),page.querySelector('#aaoDate').value);const assess=hero.querySelector('[data-page="assessment"]');if(assess)assess.click();else{page.classList.remove('show');grid.style.display='grid'}window.scrollTo({top:hero.offsetTop,behavior:'smooth'})};
  page.querySelector('#aaoPDF').onclick=()=>downloadPDF(testsFromRows(page),page.querySelector('#aaoPatient').value.trim(),page.querySelector('#aaoDate').value,page.querySelector('#aaoProfessional').value.trim()).catch(()=>alert('Não foi possível gerar o PDF. Tente novamente.'));
  page.querySelector('#aaoClear').onclick=()=>{page.querySelectorAll('select').forEach(s=>s.value='');count()};
  if(nav){nav.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b)return;if(b.dataset.page==='oxford'){grid.style.display='none';document.querySelector('.aa-patients')?.classList.remove('show');page.classList.add('show');nav.querySelectorAll('.aa-nav-btn').forEach(x=>x.classList.toggle('active',x===b));window.scrollTo({top:hero.offsetTop,behavior:'smooth'})}else{page.classList.remove('show')}})}
  installParser();
 }
 let tries=0;const timer=setInterval(()=>{installParser();boot();if(++tries>100&&document.getElementById('aaOxfordPage'))clearInterval(timer)},100);
})();