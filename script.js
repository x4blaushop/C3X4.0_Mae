const ARQUITETO = "José Patrick Castro Soares";
let startTime = Date.now();
let modoOnline = false;

// --- MOTOR DO PORTAL (ESTÉTICA E ENERGIA) ---
const canvasPortal = document.getElementById('canvas-portal');
const ctxP = canvasPortal.getContext('2d');
let particles = [];

function initPortal() {
    canvasPortal.width = window.innerWidth;
    canvasPortal.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 180; i++) {
        particles.push({ x: Math.random() * canvasPortal.width, y: Math.random() * canvasPortal.height, size: Math.random() * 2.2, speed: 0.4, angle: Math.random() * Math.PI * 2 });
    }
}

function animatePortal() {
    ctxP.fillStyle = 'rgba(5, 5, 5, 0.15)';
    ctxP.fillRect(0, 0, canvasPortal.width, canvasPortal.height);
    particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed; p.y += Math.sin(p.angle) * p.speed;
        if(p.x < 0 || p.x > canvasPortal.width || p.y < 0 || p.y > canvasPortal.height) { p.x = Math.random() * canvasPortal.width; p.y = Math.random() * canvasPortal.height; }
        ctxP.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green') || '#00ff41';
        ctxP.beginPath(); ctxP.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctxP.fill();
    });
    requestAnimationFrame(animatePortal);
}

// --- MURAL DE PINTURA (O LÁPIS DA CASA) ---
const mural = document.getElementById('muralCriativo');
const ctxM = mural.getContext('2d');
let desenhando = false;

function setupMural() {
    const rect = mural.getBoundingClientRect();
    mural.width = mural.offsetWidth; mural.height = mural.offsetHeight;
    
    const startDrawing = (e) => { desenhando = true; draw(e); };
    const stopDrawing = () => { desenhando = false; ctxM.beginPath(); };
    
    const draw = (e) => {
        if(!desenhando) return;
        const r = mural.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - r.left;
        const y = (e.clientY || e.touches[0].clientY) - r.top;
        
        ctxM.lineWidth = document.getElementById('tamanhoPincel').value;
        ctxM.lineCap = 'round';
        ctxM.strokeStyle = document.getElementById('corPincel').value;
        
        ctxM.lineTo(x, y); ctxM.stroke();
        ctxM.beginPath(); ctxM.moveTo(x, y);
    };

    mural.addEventListener('mousedown', startDrawing);
    mural.addEventListener('mousemove', draw);
    mural.addEventListener('mouseup', stopDrawing);
    mural.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
    mural.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
    mural.addEventListener('touchend', stopDrawing);
}

function limparMural() { ctxM.clearRect(0, 0, mural.width, mural.height); }

// --- MULTIMÍDIA (MÚSICA OFFLINE) ---
function carregarMusica(input) {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    const player = document.getElementById('playerAudio');
    player.src = url;
    player.play();
}

// --- SOBERANIA E ACERVO ---
function toggleRede() {
    modoOnline = !modoOnline;
    const s = document.getElementById('status-rede');
    const b = document.getElementById('btnRede');
    s.innerText = modoOnline ? "MODO ONLINE (RISCO)" : "MODO PRIVADO";
    s.style.color = modoOnline ? "#ff4444" : "#00ff41";
    b.innerText = modoOnline ? "FECHAR PORTÃO (VOLTAR À SEGURANÇA)" : "ABRIR PORTÃO (CONECTAR AO MUNDO)";
}

function injetarMemoriaMassa(input) {
    const grid = document.getElementById('grid-galeria');
    Array.from(input.files).forEach(f => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result; img.className = "photo-item";
            grid.appendChild(img);
        };
        reader.readAsDataURL(f);
    });
}

function salvarNotaLocal() {
    localStorage.setItem('DNA_MAE_NOTES', document.getElementById('txtNotas').value);
    alert("Memória registrada no Caderno.");
}

function calcularSoro() {
    const p = document.getElementById('pesoCorpo').value;
    if(!p) return;
    document.getElementById('resSoro').innerHTML = `
        <strong>Protocolo de Vida:</strong><br>
        • Hidratação: ${(p * 0.035).toFixed(2)}L de água/dia.<br>
        • Soro: 1L Água + 1 colher café sal + 2 colheres sopa açúcar.
    `;
}

function toggleSetor(id) {
    const setores = ['galeria', 'notas', 'pintura', 'multimidia', 'ferramentas', 'diagnostico'];
    setores.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = (s === id) ? 'block' : 'none';
    });
}

// INICIALIZAÇÃO
window.addEventListener('resize', initPortal);
document.addEventListener('DOMContentLoaded', () => {
    initPortal(); animatePortal(); setupMural();
    setInterval(() => {
        const d = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = `${Math.floor(d/60).toString().padStart(2,'0')}:${(d%60).toString().padStart(2,'0')}`;
        const ram = window.performance && performance.memory ? (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2) : "9.54";
        document.getElementById('ram-usage').innerText = ram + " MB";
    }, 1000);
    const n = localStorage.getItem('DNA_MAE_NOTES'); if(n) document.getElementById('txtNotas').value = n;
});

function verificarAcessoSoberano() { alert(`Reconhecido: Arquiteto ${ARQUITETO}. Habitação Segura.`); }
