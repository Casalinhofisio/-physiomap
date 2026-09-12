// Garante que o comparador novo assuma o botão após o patients.js terminar de registrar os eventos.
(function(){
  setTimeout(()=>{
    const old=document.getElementById('aa-compare-late-script');
    if(old) old.remove();
    const s=document.createElement('script');
    s.id='aa-compare-late-script';
    s.src='compare-enhanced.js?v=late-'+Date.now();
    document.body.appendChild(s);
  },1800);
})();
