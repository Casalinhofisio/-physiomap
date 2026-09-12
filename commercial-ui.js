// ActivAnatomy — camada comercial: apresentação, status de acesso e cupom vitalício.
(function(){
  const ready=(fn)=>{
    let n=0;const t=setInterval(()=>{const auth=document.querySelector('.aa-auth');if(auth&&window.activAnatomySupabase){clearInterval(t);fn(auth)}else if(++n>80)clearInterval(t)},100);
  };

  ready((auth)=>{
    const sb=window.activAnatomySupabase;
    if(document.getElementById('aa-commercial-style'))return;

    const style=document.createElement('style');
    style.id='aa-commercial-style';
    style.textContent=`
      .aa-auth{padding:28px!important;background:
        radial-gradient(circle at 15% 15%,rgba(31,120,111,.16),transparent 34%),
        radial-gradient(circle at 85% 80%,rgba(150,22,39,.12),transparent 30%),
        linear-gradient(135deg,#eef6f4 0%,#f8faf9 48%,#f4f0f0 100%)!important}
      .aa-commercial-shell{width:min(1080px,100%);display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,430px);gap:54px;align-items:center}
      .aa-commercial-hero{padding:18px 4px;color:#142b29}.aa-commercial-kicker{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border:1px solid #cfe0dd;border-radius:999px;background:#ffffffb8;color:#145d58;font-size:11px;font-weight:900;letter-spacing:.35px;text-transform:uppercase}
      .aa-commercial-hero h1{font-size:clamp(40px,5vw,66px);line-height:.98;letter-spacing:-3px;margin:18px 0 16px;max-width:640px}.aa-commercial-hero h1 span{color:#a8172b}
      .aa-commercial-lead{font-size:17px;line-height:1.55;color:#526461;max-width:610px;margin:0 0 22px}
      .aa-commercial-bullets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 14px;max-width:620px}.aa-commercial-bullet{display:flex;gap:9px;align-items:flex-start;font-size:13px;font-weight:750;color:#29413e}.aa-commercial-check{width:21px;height:21px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;background:#e4f3ee;color:#12684e;font-size:12px;font-weight:1000}
      .aa-commercial-price{margin-top:25px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}.aa-commercial-pricebox{background:#142b29;color:#fff;border-radius:18px;padding:13px 17px;box-shadow:0 12px 30px #102d2922}.aa-commercial-pricebox small{display:block;color:#b9cfca;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.45px}.aa-commercial-pricebox strong{font-size:25px;letter-spacing:-.7px}.aa-commercial-note{font-size:12px;color:#667673;line-height:1.4;max-width:230px}
      .aa-auth-card{position:relative;z-index:2;box-shadow:0 24px 70px #173c3624!important;border-color:#d8e5e2!important}.aa-auth-card:before{content:'30 DIAS GRÁTIS';position:absolute;right:18px;top:18px;background:#e8f6f1;color:#12684e;border:1px solid #c9e8dc;border-radius:999px;padding:6px 9px;font-size:9px;font-weight:1000;letter-spacing:.6px}.aa-auth-brand{padding-right:92px}.aa-auth-sub{margin-bottom:14px!important}.aa-commercial-mini{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 18px}.aa-commercial-mini span{font-size:10px;font-weight:800;color:#667673;background:#f4f7f6;border:1px solid #e1e9e7;border-radius:999px;padding:5px 8px}
      .aa-access-pill{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:5px 8px;font-size:10px;font-weight:900;margin-right:4px}.aa-access-pill.life{background:#e4f5ec;color:#14613e}.aa-access-pill.trial{background:#fff4d9;color:#7d5a00}.aa-access-pill.paid{background:#e9eefc;color:#2e4d8d}.aa-access-pill.expired{background:#ffe9e8;color:#9a302c}
      .aa-coupon-btn{border:1px solid #ffffff45;background:#ffffff12;color:#fff;border-radius:9px;padding:7px 9px;font-size:11px;font-weight:800;cursor:pointer}
      .aa-coupon-modal{position:fixed;inset:0;z-index:40000;background:#09100ecc;display:none;align-items:center;justify-content:center;padding:18px}.aa-coupon-modal.show{display:flex}.aa-coupon-card{width:min(420px,100%);background:#fff;border-radius:22px;padding:24px;box-shadow:0 30px 90px #0008}.aa-coupon-card h3{margin:0 0 6px;color:#17302e;font-size:22px}.aa-coupon-card p{margin:0 0 15px;color:#687674;font-size:12px;line-height:1.45}.aa-coupon-card input{width:100%;border:1px solid #d6e1df;border-radius:12px;padding:13px 14px;font-size:15px;outline:none;text-transform:uppercase}.aa-coupon-actions{display:flex;gap:8px;margin-top:10px}.aa-coupon-actions button{flex:1;border:0;border-radius:11px;padding:12px;font-weight:900;cursor:pointer}.aa-coupon-use{background:#145d58;color:#fff}.aa-coupon-close{background:#edf2f1;color:#526461}.aa-coupon-msg{font-size:12px;margin-top:10px;min-height:17px}.aa-coupon-msg.ok{color:#14613e}.aa-coupon-msg.err{color:#9a302c}
      @media(max-width:860px){.aa-commercial-shell{grid-template-columns:1fr;gap:22px}.aa-commercial-hero{text-align:center;padding:4px}.aa-commercial-hero h1{font-size:38px;letter-spacing:-1.8px;margin:12px auto}.aa-commercial-lead{font-size:14px;margin-left:auto;margin-right:auto}.aa-commercial-bullets{max-width:500px;margin:0 auto;text-align:left}.aa-commercial-price{justify-content:center}.aa-auth-card{margin:0 auto}.aa-auth{align-items:flex-start!important}.aa-commercial-note{text-align:left}}
      @media(max-width:560px){.aa-auth{padding:14px!important}.aa-commercial-shell{gap:14px}.aa-commercial-hero h1{font-size:31px}.aa-commercial-lead{font-size:13px}.aa-commercial-bullets{grid-template-columns:1fr;gap:7px}.aa-commercial-price{margin-top:15px}.aa-commercial-pricebox{padding:10px 13px}.aa-commercial-pricebox strong{font-size:21px}.aa-commercial-hero{padding-top:8px}.aa-auth-card:before{top:14px;right:14px}.aa-auth-brand{padding-right:82px}}
    `;
    document.head.appendChild(style);

    const card=auth.querySelector('.aa-auth-card');
    if(!card)return;

    const mini=document.createElement('div');
    mini.className='aa-commercial-mini';
    mini.innerHTML='<span>✓ 30 dias grátis</span><span>✓ Cancele quando quiser</span>';
    const sub=card.querySelector('.aa-auth-sub');
    sub?.insertAdjacentElement('afterend',mini);

    const shell=document.createElement('div');shell.className='aa-commercial-shell';
    const hero=document.createElement('section');hero.className='aa-commercial-hero';
    hero.innerHTML=`
      <div class="aa-commercial-kicker">⚡ Avaliação de força mais visual</div>
      <h1>Transforme números em uma avaliação que o paciente <span>entende.</span></h1>
      <p class="aa-commercial-lead">O ActivAnatomy organiza avaliações de força, mostra assimetrias no mapa anatômico e guarda a evolução de cada paciente em um só lugar.</p>
      <div class="aa-commercial-bullets">
        <div class="aa-commercial-bullet"><span class="aa-commercial-check">✓</span><span>Mapa anatômico com diferenças entre os lados</span></div>
        <div class="aa-commercial-bullet"><span class="aa-commercial-check">✓</span><span>Histórico individual por paciente</span></div>
        <div class="aa-commercial-bullet"><span class="aa-commercial-check">✓</span><span>Comparação entre avaliações</span></div>
        <div class="aa-commercial-bullet"><span class="aa-commercial-check">✓</span><span>Relatórios e comparativos em PDF</span></div>
      </div>
      <div class="aa-commercial-price">
        <div class="aa-commercial-pricebox"><small>Depois do teste grátis</small><strong>R$ 9,90</strong> <span style="font-size:11px;color:#bfd0cd">1º mês</span><br><span style="font-size:11px;color:#bfd0cd">depois R$ 19,90/mês</span></div>
        <div class="aa-commercial-note">Crie sua conta e teste por 30 dias. Nenhuma cobrança é feita ao criar a conta.</div>
      </div>`;

    card.parentNode.insertBefore(shell,card);
    shell.appendChild(hero);shell.appendChild(card);

    const modal=document.createElement('div');modal.className='aa-coupon-modal';modal.innerHTML=`<div class="aa-coupon-card"><h3>Resgatar cupom</h3><p>O cupom vitalício é de uso único e fica vinculado permanentemente à sua conta.</p><input id="aaCouponCode" placeholder="Digite seu cupom"><div class="aa-coupon-actions"><button class="aa-coupon-close" type="button">Cancelar</button><button class="aa-coupon-use" type="button">Liberar acesso</button></div><div class="aa-coupon-msg"></div></div>`;document.body.appendChild(modal);
    const cInput=modal.querySelector('#aaCouponCode'),cMsg=modal.querySelector('.aa-coupon-msg'),cUse=modal.querySelector('.aa-coupon-use');
    modal.querySelector('.aa-coupon-close').onclick=()=>modal.classList.remove('show');
    modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});

    async function loadAccess(){
      const {data:{user}}=await sb.auth.getUser();if(!user)return;
      const {data}=await sb.from('account_access').select('access_level,status,trial_ends_at').eq('user_id',user.id).maybeSingle();
      const bar=document.querySelector('.aa-account');if(!bar)return;
      bar.querySelector('.aa-access-pill')?.remove();bar.querySelector('.aa-coupon-btn')?.remove();
      let label='Acesso';let cls='trial';
      if(data?.access_level==='lifetime'){label='Vitalício';cls='life'}
      else if(data?.access_level==='paid'){label='Assinante';cls='paid'}
      else if(data?.access_level==='trial'){
        const days=data.trial_ends_at?Math.max(0,Math.ceil((new Date(data.trial_ends_at)-Date.now())/86400000)):30;
        label=`Teste grátis · ${days}d`;cls='trial';
      }else if(data?.access_level==='expired'){label='Teste encerrado';cls='expired'}
      const pill=document.createElement('span');pill.className=`aa-access-pill ${cls}`;pill.textContent=label;bar.insertBefore(pill,bar.firstChild);
      if(data?.access_level!=='lifetime'){
        const b=document.createElement('button');b.className='aa-coupon-btn';b.type='button';b.textContent='Tenho um cupom';b.onclick=()=>{cInput.value='';cMsg.textContent='';cMsg.className='aa-coupon-msg';modal.classList.add('show');setTimeout(()=>cInput.focus(),80)};bar.insertBefore(b,bar.querySelector('.aa-logout'));
      }
    }

    cUse.onclick=async()=>{
      const code=cInput.value.trim();if(!code){cMsg.textContent='Digite o código do cupom.';cMsg.className='aa-coupon-msg err';return}
      cUse.disabled=true;cMsg.textContent='Validando...';cMsg.className='aa-coupon-msg';
      try{
        const {data,error}=await sb.rpc('redeem_lifetime_coupon',{p_code:code});if(error)throw error;
        cMsg.textContent=data?.message||'Cupom processado.';cMsg.className='aa-coupon-msg '+(data?.ok?'ok':'err');
        if(data?.ok){setTimeout(()=>{modal.classList.remove('show');loadAccess()},800)}
      }catch(err){cMsg.textContent='Não foi possível validar o cupom.';cMsg.className='aa-coupon-msg err'}finally{cUse.disabled=false}
    };

    sb.auth.onAuthStateChange((_event,session)=>{if(session?.user)setTimeout(loadAccess,250)});
    setTimeout(loadAccess,350);
  });
})();
