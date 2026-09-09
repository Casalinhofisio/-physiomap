// ActivAnatomy — pacientes por usuário (Supabase)
(async function(){
  const waitForSupabase=async()=>{
    for(let i=0;i<80;i++){
      if(window.activAnatomySupabase)return window.activAnatomySupabase;
      await new Promise(r=>setTimeout(r,100));
    }
    return null;
  };
  const sb=await waitForSupabase();
  if(!sb)return;

  const main=document.querySelector('main.wrap');
  const hero=document.querySelector('.hero');
  const grid=document.querySelector('.grid');
  if(!main||!hero||!grid)return;

  const style=document.createElement('style');
  style.textContent=`
  .aa-nav{display:flex;gap:8px;align-items:center;margin-top:14px;flex-wrap:wrap}.aa-nav-btn{border:1px solid #ffffff35;background:#ffffff12;color:#fff;border-radius:11px;padding:9px 12px;font-size:12px;font-weight:800;cursor:pointer}.aa-nav-btn.active{background:#fff;color:#145d58}.aa-add-patient{margin-top:10px;width:100%;border:1px solid #b8cfcb;background:#eef6f4;color:#145d58;border-radius:12px;padding:11px 13px;font-weight:900;cursor:pointer}
  .aa-patients{display:none;background:#fff;border:1px solid #dfe7e5;border-radius:20px;padding:18px;box-shadow:0 5px 18px #183d3914}.aa-patients.show{display:block}.aa-patients-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.aa-patients-head h2{margin:0}.aa-primary{border:0;background:#145d58;color:#fff;border-radius:12px;padding:11px 14px;font-weight:900;cursor:pointer}.aa-search{width:100%;margin:14px 0 10px;border:1px solid #d6e1df;border-radius:12px;padding:12px 13px;font-size:14px}.aa-patient-list{display:grid;gap:9px}.aa-patient-row{border:1px solid #dfe7e5;border-radius:14px;padding:12px 13px;display:flex;justify-content:space-between;gap:12px;align-items:center;background:#fbfcfc}.aa-patient-name{font-weight:900}.aa-patient-meta{font-size:11px;color:#687674;margin-top:3px}.aa-patient-actions{display:flex;gap:6px}.aa-small{border:0;border-radius:9px;padding:8px 10px;font-size:11px;font-weight:800;cursor:pointer;background:#e8efee;color:#17302e}.aa-small.danger{background:#fff0ef;color:#9f312d}.aa-empty{text-align:center;padding:28px;color:#687674}
  .aa-modal-bg{position:fixed;inset:0;background:#0d26247a;display:none;align-items:center;justify-content:center;padding:18px;z-index:9999}.aa-modal-bg.show{display:flex}.aa-modal{width:min(460px,100%);background:#fff;border-radius:20px;padding:20px;box-shadow:0 20px 70px #0004}.aa-modal h3{margin:0 0 14px}.aa-modal label{display:block;font-size:11px;font-weight:800;color:#687674;margin:10px 0 5px}.aa-modal input,.aa-modal textarea{width:100%;border:1px solid #d6e1df;border-radius:11px;padding:11px 12px;font:inherit}.aa-modal textarea{min-height:80px;resize:vertical}.aa-modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:14px}.aa-cancel{border:0;background:#e8efee;color:#17302e;border-radius:11px;padding:10px 13px;font-weight:800;cursor:pointer}
  @media(max-width:560px){.aa-patient-row{align-items:flex-start;flex-direction:column}.aa-patient-actions{width:100%}.aa-small{flex:1}}
  @media print{.aa-nav,.aa-add-patient,.aa-patients{display:none!important}}
  `;
  document.head.appendChild(style);

  const heroText=hero.querySelector('.heroin > div:first-child');
  if(heroText && !hero.querySelector('.aa-nav')){
    const nav=document.createElement('div');
    nav.className='aa-nav';
    nav.innerHTML='<button class="aa-nav-btn active" data-page="assessment">Avaliação</button><button class="aa-nav-btn" data-page="patients">Pacientes</button>';
    heroText.appendChild(nav);
  }

  const importCard=grid.querySelector('.card');
  if(importCard && !document.querySelector('.aa-add-patient')){
    const add=document.createElement('button');
    add.className='aa-add-patient';
    add.type='button';
    add.textContent='+ Adicionar paciente';
    const drop=importCard.querySelector('.drop');
    if(drop)drop.insertAdjacentElement('afterend',add); else importCard.prepend(add);
    add.addEventListener('click',()=>openModal());
  }

  const patientsPage=document.createElement('section');
  patientsPage.className='aa-patients';
  patientsPage.innerHTML=`
    <div class="aa-patients-head"><div><h2>Meus pacientes</h2><div class="hint">Pacientes salvos somente na sua conta.</div></div><button class="aa-primary" id="aaNewPatient">+ Adicionar paciente</button></div>
    <input class="aa-search" id="aaPatientSearch" placeholder="Buscar paciente pelo nome...">
    <div class="aa-patient-list" id="aaPatientList"><div class="aa-empty">Carregando pacientes...</div></div>`;
  grid.insertAdjacentElement('afterend',patientsPage);

  const modalBg=document.createElement('div');
  modalBg.className='aa-modal-bg';
  modalBg.innerHTML=`<div class="aa-modal"><h3 id="aaModalTitle">Adicionar paciente</h3>
    <label>Nome do paciente *</label><input id="aaPName" placeholder="Nome completo">
    <label>Data de nascimento</label><input id="aaPBirth" type="date">
    <label>Telefone</label><input id="aaPPhone" placeholder="(00) 00000-0000">
    <label>Observações</label><textarea id="aaPNotes" placeholder="Opcional"></textarea>
    <div class="aa-modal-actions"><button class="aa-cancel" id="aaCancelPatient">Cancelar</button><button class="aa-primary" id="aaSavePatient">Salvar paciente</button></div>
  </div>`;
  document.body.appendChild(modalBg);

  let patients=[],editingId=null,currentUser=null;
  const listEl=patientsPage.querySelector('#aaPatientList');
  const searchEl=patientsPage.querySelector('#aaPatientSearch');
  const nameEl=modalBg.querySelector('#aaPName'),birthEl=modalBg.querySelector('#aaPBirth'),phoneEl=modalBg.querySelector('#aaPPhone'),notesEl=modalBg.querySelector('#aaPNotes');

  function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function formatDate(d){if(!d)return'';const [y,m,day]=d.split('-');return `${day}/${m}/${y}`}
  function render(){
    const q=searchEl.value.trim().toLowerCase();
    const shown=patients.filter(p=>p.name.toLowerCase().includes(q));
    if(!shown.length){listEl.innerHTML='<div class="aa-empty">'+(q?'Nenhum paciente encontrado.':'Nenhum paciente cadastrado ainda.')+'</div>';return}
    listEl.innerHTML=shown.map(p=>`<div class="aa-patient-row" data-id="${p.id}"><div><div class="aa-patient-name">${esc(p.name)}</div><div class="aa-patient-meta">${p.birth_date?'Nascimento: '+formatDate(p.birth_date):'Sem data de nascimento'}${p.phone?' • '+esc(p.phone):''}</div></div><div class="aa-patient-actions"><button class="aa-small" data-action="edit">Editar</button><button class="aa-small danger" data-action="delete">Excluir</button></div></div>`).join('');
  }
  async function loadPatients(){
    if(!currentUser)return;
    listEl.innerHTML='<div class="aa-empty">Carregando pacientes...</div>';
    const {data,error}=await sb.from('patients').select('*').eq('user_id',currentUser.id).order('name',{ascending:true});
    if(error){listEl.innerHTML='<div class="aa-empty">Não foi possível carregar os pacientes.</div>';return}
    patients=data||[];render();
  }
  function openModal(patient=null){
    editingId=patient?.id||null;
    modalBg.querySelector('#aaModalTitle').textContent=patient?'Editar paciente':'Adicionar paciente';
    nameEl.value=patient?.name||'';birthEl.value=patient?.birth_date||'';phoneEl.value=patient?.phone||'';notesEl.value=patient?.notes||'';
    modalBg.classList.add('show');setTimeout(()=>nameEl.focus(),50);
  }
  function closeModal(){modalBg.classList.remove('show');editingId=null}
  async function savePatient(){
    const name=nameEl.value.trim();if(!name){alert('Digite o nome do paciente.');return}
    const btn=modalBg.querySelector('#aaSavePatient');btn.disabled=true;btn.textContent='Salvando...';
    try{
      const payload={name,birth_date:birthEl.value||null,phone:phoneEl.value.trim()||null,notes:notesEl.value.trim()||null,updated_at:new Date().toISOString()};
      let error;
      if(editingId){({error}=await sb.from('patients').update(payload).eq('id',editingId).eq('user_id',currentUser.id));}
      else{payload.user_id=currentUser.id;({error}=await sb.from('patients').insert(payload));}
      if(error)throw error;
      closeModal();await loadPatients();
    }catch(e){alert('Não foi possível salvar o paciente. '+(e?.message||''))}
    finally{btn.disabled=false;btn.textContent='Salvar paciente'}
  }
  async function deletePatient(id){
    const p=patients.find(x=>x.id===id);if(!p)return;
    if(!confirm(`Excluir ${p.name}?`))return;
    const {error}=await sb.from('patients').delete().eq('id',id).eq('user_id',currentUser.id);
    if(error){alert('Não foi possível excluir o paciente.');return}
    patients=patients.filter(x=>x.id!==id);render();
  }
  function setPage(page){
    document.querySelectorAll('.aa-nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
    if(page==='patients'){grid.style.display='none';patientsPage.classList.add('show');loadPatients();}
    else{grid.style.display='';patientsPage.classList.remove('show');}
  }

  hero.addEventListener('click',e=>{const b=e.target.closest('.aa-nav-btn');if(b)setPage(b.dataset.page)});
  patientsPage.querySelector('#aaNewPatient').addEventListener('click',()=>openModal());
  searchEl.addEventListener('input',render);
  listEl.addEventListener('click',e=>{const row=e.target.closest('.aa-patient-row');if(!row)return;const id=row.dataset.id;const action=e.target.closest('[data-action]')?.dataset.action;if(action==='edit')openModal(patients.find(p=>p.id===id));if(action==='delete')deletePatient(id)});
  modalBg.querySelector('#aaCancelPatient').addEventListener('click',closeModal);
  modalBg.querySelector('#aaSavePatient').addEventListener('click',savePatient);
  modalBg.addEventListener('click',e=>{if(e.target===modalBg)closeModal()});

  async function syncUser(){const {data:{session}}=await sb.auth.getSession();currentUser=session?.user||null;if(currentUser)loadPatients();}
  sb.auth.onAuthStateChange((_e,session)=>{currentUser=session?.user||null;if(!currentUser){patients=[];render();setPage('assessment')}});
  await syncUser();
})();