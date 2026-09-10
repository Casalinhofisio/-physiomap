// ActivAnatomy — tema global preto/vermelho sem alterar regras clínicas ou estrutura
(function(){
 const css=`
 :root{--ink:#17191d!important;--muted:#6f737a!important;--brand:#b91f2f!important;--bg:#f5f5f6!important;--line:#e1e2e5!important;--green:#35aa67!important;--yellow:#e9a62f!important;--red:#db5651!important;--neutral:#d7dfdd!important}
 body{background:#f5f5f6!important;color:#17191d!important}
 .card,.aa-patients,.aao-page,.aa-modal,.aa-auth-card{border-color:#e1e2e5!important;box-shadow:0 8px 24px #11131810!important}
 .card h2,.aa-head h2,.aa-head h3,.aao-head h2{color:#17191d!important}
 .btn,.aa-primary,.aao-btn,.aa-submit{background:linear-gradient(180deg,#c82b3b,#a71727)!important;color:#fff!important;box-shadow:0 6px 16px #9e16252b!important}
 .btn:hover,.aa-primary:hover,.aao-btn:hover,.aa-submit:hover{filter:brightness(.97)}
 .btn.secondary,.aa-cancel,.aa-small,.aao-btn.alt{background:#f0f1f3!important;color:#22252a!important}
 .aa-small.open{background:#1a1d22!important;color:#fff!important}
 .aa-small.danger{background:#fff1f2!important;color:#a71727!important}
 .drop{border-color:#c9ccd1!important;background:#fafafa!important}
 .status{background:#f0f1f3!important;color:#3d4147!important}.status.ok{background:#fff0f2!important;color:#8f1825!important}.status.err{background:#fff0ef!important;color:#9f312d!important}
 .meta div,.bodybox,.test,.aa-row,.aa-eval-card,.aa-test-card,.aa-compare-panel,.aa-compare-col,.aa-eval-map,.aa-mini-map,.aao-row,.aao-guide{border-color:#e1e2e5!important}
 .muscle-name,.aa-back,.aa-name,.aa-primary,.aao-group{color:#a71727!important}
 .aa-primary,.aao-btn{color:#fff!important}
 .aa-add-patient{border-color:#d8b7bc!important;background:#fff7f8!important;color:#a71727!important}
 .aa-select,.aa-search,.aa-modal input,.aa-modal textarea,.aao-info input,.aao-filter,.aao-side select{border-color:#d7d9dd!important}
 .aa-savebox{border-color:#e3e4e7!important}
 .aa-pill{background:#f4e9eb!important;color:#7f2832!important}
 .legend .dot{box-shadow:0 0 0 1px #0000000d}
 .footer{color:#7b7f86!important}
 .aa-auth{background:radial-gradient(circle at 18% 15%,#351118 0,transparent 30%),linear-gradient(145deg,#090d12,#151018 58%,#080b10)!important;color:#f4f4f5!important}
 .aa-auth-card{background:#10141a!important;border-color:#242933!important;color:#fff!important;box-shadow:0 24px 70px #0008!important}
 .aa-auth-brand{color:#fff!important}.aa-auth-brand:after{content:'.';color:#ff3947;font-weight:900}.aa-auth-sub,.aa-field label,.aa-creator{color:#aeb4bd!important}.aa-creator{border-color:#2a2f38!important}.aa-creator b{color:#fff!important}
 .aa-tabs{background:#191e25!important}.aa-tab{color:#aeb4bd!important}.aa-tab.active{background:#2a1217!important;color:#fff!important;box-shadow:inset 0 0 0 1px #b7273766!important}
 .aa-field input{background:#151a21!important;border-color:#303640!important;color:#fff!important}.aa-field input::placeholder{color:#777e88!important}.aa-field input:focus{border-color:#c82b3b!important;box-shadow:0 0 0 3px #c82b3b22!important}
 .aa-msg.ok{background:#261217!important;color:#f5bbc1!important}.aa-msg.err{background:#2a1313!important;color:#ffb3b3!important}
 @media(max-width:560px){.card,.aa-patients,.aao-page{border-radius:16px!important}}
 `;
 const s=document.createElement('style');s.id='aa-red-theme';s.textContent=css;document.head.appendChild(s);
})();