const ARQUITETO = "José Patrick Castro Soares";
let tempoAtividade = Date.now();

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
const idsSetores = ['acervo','logs','midia','saude','oficina','atmosfera','backup'];

function navegar(id) {
    idsSetores.forEach(s => document.getElementById(s).style.display = (s === id) ? 'block' : 'none');
    if(id === 'atmosfera') montarEditorNomes();
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

function montarEditorNomes() {
    const nomesAtuais = JSON.parse(localStorage.getItem('DNA_NOMES')) || {acervo:"ACERVO", logs:"CADERNO", midia:"MÍDIA", saude:"SAÚDE", oficina:"OFICINA", atmosfera:"ATMOSFERA", backup:"BACKUP"};
    const container = document.getElementById('editor-nomes'); container.innerHTML = "";
    for(let k in nomesAtuais) {
        container.innerHTML += `<div style="margin-bottom:8px;"><small>${k}:</small><input type="text" id="edit-${k}" value="${nomesAtuais[k]}"></div>`;
    }
}

function consolidarNomes() {
    const novosNomes = {};
    idsSetores.forEach(s => novosNomes[s] = document.getElementById(`edit-${s}`).value);
    localStorage.setItem('DNA_NOMES', JSON.stringify(novosNomes));
    aplicarIdentidadeDNA();
}

function aplicarIdentidadeDNA() {
    const n = JSON.parse(localStorage.getItem('DNA_NOMES'));
    if(n) {
        const botoes = document.querySelectorAll('nav button');
        idsSetores.forEach((s, i) => { if(botoes[i]) botoes[i].innerText = n[s]; });
    }
    const c = JSON.parse(localStorage.getItem('DNA_CORES'));
    if(c) {
        document.documentElement.style.setProperty('--green', c.acc);
        document.documentElement.style.setProperty('--bg', c.bg);
        document.documentElement.style.setProperty('--btn-bg', c.btn);
    }
}

// --- 3. FUNCIONALIDADES DE UTILIDADE REAL ---
function salvarLogsLocal() { localStorage.setItem('DNA_LOGS', document.getElementById('txt-logs').value); alert("Gravado no DNA."); }

function carregarAudio(input) {
    const player = document.getElementById('player-audio');
    player.src = URL.createObjectURL(input.files[0]);
    player.play();
}

function gerarProtocoloSaude() {
    const p = document.getElementById('peso-input').value;
    if(!p) return;
    document.getElementById('resultado-saude').innerHTML = `
        <strong>DIRETRIZ DE OSMOSE:</strong><br>
        • Hidratação: ${(p*0.035).toFixed(2)}L de água/dia.<br>
        • Soro Caseiro: 1L Água + 1 colher café sal + 2 colheres sopa açúcar.
    `;
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
    const dna = {
        arquiteto: ARQUITETO,
        logs: localStorage.getItem('DNA_LOGS'),
        cores: localStorage.getItem('DNA_CORES'),
        nomes: localStorage.getItem('DNA_NOMES'),
        timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dna)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `DNA_C3X4_MAE_SOBERANO.json`; a.click();
}

// --- 4. DIAGNÓSTICO (ESTADO DO ESPECIALISTA) ---
setInterval(() => {
    const delta = Math.floor((Date.now() - tempoAtividade)/1000);
    document.getElementById('uptime').innerText = `${Math.floor(delta/60)}:${(delta%60).toString().padStart(2,'0')}`;
    document.getElementById('st-network').innerText = navigator.onLine ? "ONLINE" : "INDEPENDENTE";
    document.getElementById('st-elements').innerText = document.querySelectorAll('*').length < 1500 ? "LIMPO" : "PESADO";
}, 1000);

window.onload = () => { 
    iniciarPortal(); animarPortal(); aplicarIdentidadeDNA(); 
    document.getElementById('txt-logs').value = localStorage.getItem('DNA_LOGS') || "";
    navegar('acervo'); 
};
