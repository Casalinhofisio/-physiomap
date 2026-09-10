// ActivAnatomy — guia compacto no login. Não altera avaliação/pacientes.
(function(){
 const css=document.createElement('style');css.textContent=`
 .aa-auth{align-items:center!important;justify-content:center!important;overflow:auto!important;padding:22px!important}
 .aa-auth-card{position:relative!important}
 .aa-help-login{width:100%;margin-top:10px;border:1px solid #303640;background:#171c23;color:#fff;border-radius:12px;padding:11px 13px;font-weight:900;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
 .aa-help-login:hover{background:#231419;border-color:#8e2935}.aa-help-login .ico{font-size:16px}
 .aa-guide-modal{position:fixed;inset:0;background:#07090dcc;display:none;align-items:flex-start;justify-content:center;padding:24px;z-index:20000;overflow:auto}.aa-guide-modal.show{display:flex}
 .aa-guide-box{width:min(980px,100%);background:#f5f5f6;border-radius:22px;padding:18px;position:relative;box-shadow:0 25px 80px #0008;color:#17191d}
 .aa-guide-close{position:sticky;top:0;float:right;border:0;background:#17191e;color:#fff;width:38px;height:38px;border-radius:10px;font-size:22px;font-weight:900;cursor:pointer;z-index:2}
 .aa-how{clear:both}.aa-how h2{margin:0 0 5px;font-size:28px}.aa-how-lead{color:#6f737a;margin:0 0 18px}.aa-step{display:grid;grid-template-columns:40px 1fr;gap:12px;margin:16px 0}.aa-num{width:34px;height:34px;border-radius:50%;background:#c51f35;color:#fff;display:grid;place-items:center;font-weight:900}.aa-step h3{margin:2px 0 4px;font-size:16px}.aa-step p{margin:0;color:#6f737a;font-size:13px;line-height:1.45}.aa-tip{margin-top:18px;background:#fff;border:1px solid #e1e2e5;border-radius:14px;padding:14px;font-size:12px;color:#555}
 @media(max-width:560px){.aa-guide-modal{padding:10px}.aa-guide-box{padding:14px;border-radius:16px}.aa-step{grid-template-columns:34px 1fr}}
 `;document.head.appendChild(css);
 function guideHTML(){return `<section class="aa-how"><h2>Como usar o ActivAnatomy</h2><p class="aa-how-lead">Um guia rápido para usar o sistema do início ao fim.</p>
 <div class="aa-step"><div class="aa-num">1</div><div><h3>Acesse Avaliação</h3><p>Entre na aba Avaliação para iniciar uma nova análise.</p></div></div>
 <div class="aa-step"><div class="aa-num">2</div><div><h3>Selecione o PDF do ActivForce</h3><p>Escolha o relatório e clique em Analisar PDF.</p></div></div>
 <div class="aa-step"><div class="aa-num">3</div><div><h3>Confira o mapa muscular</h3><p>As regiões avaliadas são coloridas conforme os resultados da força.</p></div></div>
 <div class="aa-step"><div class="aa-num">4</div><div><h3>Veja os resultados</h3><p>Confira lado direito, esquerdo, assimetria e status de cada teste.</p></div></div>
 <div class="aa-step"><div class="aa-num">5</div><div><h3>Salve no paciente</h3><p>Escolha o paciente e salve a avaliação para manter o histórico organizado.</p></div></div>
 <div class="aa-step"><div class="aa-num">6</div><div><h3>Use a Escala Oxford</h3><p>Para avaliações manuais, entre na aba Escala Oxford e preencha os graus.</p></div></div>
 <div class="aa-tip"><b>Dica:</b> o mapa é uma representação funcional das regiões avaliadas e deve ser interpretado junto à avaliação clínica.</div></section>`}
 function install(){
   const auth=document.querySelector('.aa-auth'),card=auth?.querySelector('.aa-auth-card');if(!auth||!card)return false;
   if(document.querySelector('.aa-help-login'))return true;
   const btn=document.createElement('button');btn.type='button';btn.className='aa-help-login';btn.innerHTML='<span class="ico">◉</span> Como usar';
   const creator=card.querySelector('.aa-creator');if(creator)card.insertBefore(btn,creator);else card.appendChild(btn);
   const modal=document.createElement('div');modal.className='aa-guide-modal';modal.innerHTML=`<div class="aa-guide-box"><button class="aa-guide-close" type="button">×</button>${guideHTML()}</div>`;document.body.appendChild(modal);
   btn.onclick=()=>modal.classList.add('show');modal.querySelector('.aa-guide-close').onclick=()=>modal.classList.remove('show');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});
   return true;
 }
 let tries=0;const t=setInterval(()=>{if(install()||++tries>200)clearInterval(t)},100);
})();