// ActivAnatomy — acesso ao guia também para usuários já logados.
(function(){
  const css=document.createElement('style');
  css.textContent=`
  .aa-help-btn{border:1px solid #3a3d43;background:#17191e;color:#fff;border-radius:11px;padding:9px 12px;font-size:12px;font-weight:800;cursor:pointer}.aa-help-btn:hover{background:#231419;border-color:#8e2935}
  .aa-guide-modal{position:fixed;inset:0;background:#07090dcc;display:none;align-items:flex-start;justify-content:center;padding:24px;z-index:20000;overflow:auto}.aa-guide-modal.show{display:flex}.aa-guide-box{width:min(900px,100%);background:#f5f5f6;border-radius:22px;padding:18px;position:relative;box-shadow:0 25px 80px #0008}.aa-guide-close{position:sticky;top:0;float:right;border:0;background:#17191e;color:#fff;width:38px;height:38px;border-radius:10px;font-size:22px;font-weight:900;cursor:pointer;z-index:2}.aa-guide-box .aa-how{box-shadow:none!important;border:0!important;background:transparent!important;padding:8px!important}.aa-guide-box .aa-start{display:none!important}
  `;
  document.head.appendChild(css);

  function install(){
    const nav=document.querySelector('.aa-nav');
    const source=document.querySelector('.aa-how');
    if(!nav||!source)return false;
    if(document.querySelector('.aa-help-btn'))return true;
    const btn=document.createElement('button');
    btn.type='button';btn.className='aa-help-btn';btn.textContent='Como usar';
    nav.appendChild(btn);
    const modal=document.createElement('div');modal.className='aa-guide-modal';
    const box=document.createElement('div');box.className='aa-guide-box';
    const close=document.createElement('button');close.className='aa-guide-close';close.type='button';close.textContent='×';
    const clone=source.cloneNode(true);
    box.appendChild(close);box.appendChild(clone);modal.appendChild(box);document.body.appendChild(modal);
    btn.addEventListener('click',()=>modal.classList.add('show'));
    close.addEventListener('click',()=>modal.classList.remove('show'));
    modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});
    return true;
  }
  let tries=0;const t=setInterval(()=>{if(install()||++tries>300)clearInterval(t)},100);
})();