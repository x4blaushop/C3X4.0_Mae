const ARQUITETO = "José Patrick Castro Soares";
let uptimeStart = Date.now();

// --- 1. EXPANSÃO DO PORTAL (FLUXO) ---
const cvs = document.getElementById('portal-canvas');
const ctx = cvs.getContext('2d');
let partículas = [];

function setupPortal() {
    cvs.width = window.innerWidth; cvs.height = window.innerHeight;
    partículas = [];
    for(let i=0; i<100; i++) {
        partículas.push({ x: Math.random()*cvs.width, y: Math.random()*cvs.height, r: Math.random()*2.5, s: Math.random()*0.4 + 0.1 });
    }
}

function fluxPortal() {
    ctx.fillStyle = 'rgba(5,5,5,0.15)'; ctx.fillRect(0,0,cvs.width,cvs.height);
    partículas.forEach(p => {
        p.y -= p.s; if(p.y < 0) p.y = cvs.height;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(fluxPortal);
}

// --- 2. NAVEGAÇÃO E REFORMA SOBERANA ---
const setores = ['acervo','caderno','midia','saude','oficina','reforma','backup'];

function navegar(id) {
    setores.forEach(s => document.getElementById(s).style.display = (s===id)?'block':'none');
    if(id === 'reforma') montarInterfaceReforma();
}

function mutarDNA() {
    const a = document.getElementById('cfg-accent').value;
    const b = document.getElementById('cfg-bg').value;
    const c = document.getElementById('cfg-btn').value;
    document.documentElement.style.setProperty('--green', a);
    document.documentElement.style.setProperty('--bg', b);
    document.documentElement.style.setProperty('--btn', c);
    localStorage.setItem('DNA_CORES', JSON.stringify({a, b, c}));
}

function montarInterfaceReforma() {
    const nomes = JSON.parse(localStorage.getItem('DNA_NOMES')) || {acervo:"ACERVO", caderno:"CADERNO", midia:"MÍDIA", saude:"SAÚDE", oficina:"OFICINA", reforma:"REFORMA", backup:"BACKUP"};
    const container = document.getElementById('editor-nomes'); container.innerHTML = "";
    for(let k in nomes) {
        container.innerHTML += `<div><small>${k}:</small><input type="text" id="edit-${k}" value="${nomes[k]}"></div>`;
    }
}

function consolidarReforma() {
    const novosNomes = {};
    setores.forEach(s => novosNomes[s] = document.getElementById(`edit-${s}`).value);
    localStorage.setItem('DNA_NOMES', JSON.stringify(novosNomes));
    aplicarDNA();
}

function aplicarDNA() {
    const n = JSON.parse(localStorage.getItem('DNA_NOMES'));
    if(n) {
        const btns = document.querySelectorAll('nav button');
        setores.forEach((s, i) => { if(btns[i]) btns[i].innerText = n[s]; });
    }
    const c = JSON.parse(localStorage.getItem('DNA_CORES'));
    if(c) {
        document.documentElement.style.setProperty('--green', c.a);
        document.documentElement.style.setProperty('--bg', c.b);
        document.documentElement.style.setProperty('--btn', c.c);
    }
}

// --- 3. FUNCIONALIDADES EXPANDIDAS ---
function salvarLogs() { localStorage.setItem('DNA_LOGS', document.getElementById('txt-logs').value); alert("Gravado no DNA."); }

function carregarAudio(input) {
    const player = document.getElementById('audio-player');
    player.src = URL.createObjectURL(input.files[0]);
    player.play();
}

function calcularSaude() {
    const p = document.getElementById('peso-mae').value;
    if(!p) return;
    document.getElementById('res-saude').innerHTML = `<strong>RECOMENDAÇÃO:</strong><br>Hidratação: ${(p*0.035).toFixed(2)}L de água/dia.<br>Soro Caseiro: 1L água + 1 colher café sal + 2 colheres sopa açúcar.`;
}

function executarBackup() {
    const cofre = { 
        logs: localStorage.getItem('DNA_LOGS'), 
        cores: localStorage.getItem('DNA_CORES'), 
        nomes: localStorage.getItem('DNA_NOMES'),
        fotos: localStorage.getItem('DNA_FOTOS')
    };
    const blob = new Blob([JSON.stringify(cofre)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = "DNA_C3X4_MAE.json"; a.click();
}

// --- 4. TELEMETRIA (DIAGNÓSTICO REAL) ---
setInterval(() => {
    const delta = Math.floor((Date.now() - uptimeStart)/1000);
    document.getElementById('uptime').innerText = `${Math.floor(delta/60)}:${(delta%60).toString().padStart(2,'0')}`;
    document.getElementById('st-network').innerText = navigator.onLine ? "ONLINE" : "OFFLINE";
    document.getElementById('st-elements').innerText = document.querySelectorAll('*').length < 1000 ? "LIMPO" : "PESADO";
}, 1000);

window.onload = () => { 
    setupPortal(); fluxPortal(); aplicarDNA(); 
    document.getElementById('txt-logs').value = localStorage.getItem('DNA_LOGS') || "";
    navegar('acervo'); 
};
