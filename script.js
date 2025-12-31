const ARQUITETO = "José Patrick Castro Soares";
let tempoAtividade = Date.now();
let cronometroFoco; 
let segundosFoco = 0;

// --- 1. PORTAL GRAVITACIONAL ---
const canvas = document.getElementById('portal-canvas');
const ctx = canvas.getContext('2d');
let partículas = [];

function iniciarPortal() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    partículas = [];
    for(let i=0; i<120; i++) {
        partículas.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2, v: Math.random()*0.5 });
    }
}

function animarPortal() {
    ctx.fillStyle = 'rgba(5,5,5,0.15)'; ctx.fillRect(0,0,canvas.width, canvas.height);
    partículas.forEach(p => {
        p.y -= p.v; if(p.y < 0) p.y = canvas.height;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(animarPortal);
}

// --- 2. NAVEGAÇÃO E REFORMA ---
const idsSetores = ['acervo','logs','escritorio','midia','saude','oficina','atmosfera','backup'];

function navegar(id) {
    idsSetores.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = (s === id) ? 'block' : 'none';
    });
    if(id === 'atmosfera') montarEditorNomes();
    if(id === 'escritorio') desenharGrafico();
}

function aplicarReforma() {
    const acc = document.getElementById('color-accent').value;
    const bg = document.getElementById('color-bg').value;
    const btn = document.getElementById('color-btn').value;
    document.documentElement.style.setProperty('--green', acc);
    document.documentElement.style.setProperty('--bg', bg);
    document.documentElement.style.setProperty('--btn-bg', btn);
    localStorage.setItem('DNA_CORES', JSON.stringify({acc, bg, btn}));
}

// --- 3. UTILIDADE OFFICE ---
function iniciarCicloFoco() {
    segundosFoco = 0;
    clearInterval(cronometroFoco);
    cronometroFoco = setInterval(() => {
        segundosFoco++;
        const h = Math.floor(segundosFoco / 3600).toString().padStart(2, '0');
        const m = Math.floor((segundosFoco % 3600) / 60).toString().padStart(2, '0');
        const s = (segundosFoco % 60).toString().padStart(2, '0');
        document.getElementById('timer-foco').innerText = `${h}:${m}:${s}`;
        document.getElementById('barra-foco').style.width = Math.min(segundosFoco / 6, 100) + "%";
    }, 1000);
}

function encerrarESalvarSessao() {
    clearInterval(cronometroFoco);
    let hist = JSON.parse(localStorage.getItem('DNA_PROD')) || [];
    hist.push({ tempo: segundosFoco, data: new Date().toLocaleDateString() });
    localStorage.setItem('DNA_PROD', JSON.stringify(hist));
    alert("Sessão Consolidada no DNA Local.");
    desenharGrafico();
}

function desenharGrafico() {
    const container = document.getElementById('grafico-trabalho');
    const hist = JSON.parse(localStorage.getItem('DNA_PROD')) || [];
    if(!container) return;
    container.innerHTML = "";
    hist.slice(-7).forEach(s => {
        const b = document.createElement('div');
        b.className = "barra-dia";
        b.style.height = Math.min(s.tempo / 10, 80) + "px";
        container.appendChild(b);
    });
}

// --- 4. FUNÇÕES GERAIS ---
function salvarLogsLocal() { localStorage.setItem('DNA_LOGS', document.getElementById('txt-logs').value); alert("Gravado no DNA."); }

function carregarAudio(input) {
    const player = document.getElementById('player-audio');
    player.src = URL.createObjectURL(input.files[0]);
}

function gerarProtocoloSaude() {
    const p = document.getElementById('peso-input').value;
    if(p) document.getElementById('resultado-saude').innerHTML = `<strong>DIRETRIZ:</strong> ${(p*0.035).toFixed(2)}L de água/dia.`;
}

function injetarFotos(input) {
    const galeria = document.getElementById('galeria-fotos');
    Array.from(input.files).forEach(f => {
        const r = new FileReader();
        r.onload = (e) => {
            const img = document.createElement('img'); img.src = e.target.result; img.className = "photo-item";
            galeria.appendChild(img);
        };
        r.readAsDataURL(f);
    });
}

function gerarBackupTotal() {
    const dna = { logs: localStorage.getItem('DNA_LOGS'), cores: localStorage.getItem('DNA_CORES'), prod: localStorage.getItem('DNA_PROD') };
    const blob = new Blob([JSON.stringify(dna)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `DNA_C3X4_BACKUP.json`; a.click();
}

setInterval(() => {
    const delta = Math.floor((Date.now() - tempoAtividade)/1000);
    document.getElementById('uptime').innerText = `${Math.floor(delta/60)}:${(delta%60).toString().padStart(2,'0')}`;
}, 1000);

window.onload = () => { 
    iniciarPortal(); animarPortal(); 
    document.getElementById('txt-logs').value = localStorage.getItem('DNA_LOGS') || "";
    navegar('acervo'); 
};
