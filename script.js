const OWNER = "José Patrick Castro Soares";
let startTime = Date.now();
let modoOnline = false;

// --- 1. MOTOR DO PORTAL GRAVITACIONAL ---
const canvasPortal = document.getElementById('canvas-portal');
const ctxP = canvasPortal.getContext('2d');
let particles = [];

function initPortal() {
    canvasPortal.width = window.innerWidth;
    canvasPortal.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 150; i++) {
        particles.push({ x: Math.random() * canvasPortal.width, y: Math.random() * canvasPortal.height, size: Math.random() * 2, speed: 0.3, angle: Math.random() * Math.PI * 2 });
    }
}

function animatePortal() {
    ctxP.fillStyle = 'rgba(5, 5, 5, 0.15)';
    ctxP.fillRect(0, 0, canvasPortal.width, canvasPortal.height);
    particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed; p.y += Math.sin(p.angle) * p.speed;
        if(p.x < 0 || p.x > canvasPortal.width || p.y < 0 || p.y > canvasPortal.height) { p.x = Math.random() * canvasPortal.width; p.y = Math.random() * canvasPortal.height; }
        ctxP.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green');
        ctxP.beginPath(); ctxP.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctxP.fill();
    });
    requestAnimationFrame(animatePortal);
}

// --- 2. MURAL DE PINTURA (LÁPIS E TINTA) ---
const mural = document.getElementById('muralCriativo');
const ctxM = mural.getContext('2d');
let desenhando = false;

function setupMural() {
    mural.width = mural.offsetWidth; mural.height = mural.offsetHeight;
    mural.addEventListener('mousedown', () => desenhando = true);
    mural.addEventListener('mouseup', () => { desenhando = false; ctxM.beginPath(); });
    mural.addEventListener('mousemove', (e) => {
        if(!desenhando) return;
        const r = mural.getBoundingClientRect();
        ctxM.lineWidth = 4; ctxM.lineCap = 'round'; ctxM.strokeStyle = document.getElementById('corPincel').value;
        ctxM.lineTo(e.clientX - r.left, e.clientY - r.top); ctxM.stroke();
        ctxM.beginPath(); ctxM.moveTo(e.clientX - r.left, e.clientY - r.top);
    });
    // Suporte para toque (Touch)
    mural.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const r = mural.getBoundingClientRect();
        const t = e.touches[0];
        ctxM.lineTo(t.clientX - r.left, t.clientY - r.top); ctxM.stroke();
        ctxM.beginPath(); ctxM.moveTo(t.clientX - r.left, t.clientY - r.top);
    }, {passive: false});
}

function limparMural() { ctxM.clearRect(0,0, mural.width, mural.height); }

// --- 3. CONTROLE DE PORTÃO (SOBERANIA) ---
function toggleRede() {
    modoOnline = !modoOnline;
    const s = document.getElementById('status-rede');
    const b = document.getElementById('btnRede');
    s.innerText = modoOnline ? "ONLINE" : "OFFLINE";
    s.style.color = modoOnline ? "red" : "var(--green)";
    b.innerText = modoOnline ? "FECHAR PORTÃO (MODO PRIVADO)" : "ABRIR PORTÃO (ONLINE)";
}

// --- 4. ACERVO, NOTAS E UTILITÁRIOS ---
function injetarMemoriaMassa(input) {
    const grid = document.getElementById('grid-galeria');
    Array.from(input.files).forEach(f => {
        const r = new FileReader();
        r.onload = (e) => {
            const img = document.createElement('img'); img.src = e.target.result;
            img.className = "photo-item"; grid.appendChild(img);
        };
        r.readAsDataURL(f);
    });
}

function calcularSoro() {
    const p = document.getElementById('pesoCorpo').value;
    if(!p) return;
    document.getElementById('resSoro').innerHTML = `Hidratação: ${(p*0.035).toFixed(2)}L/dia. Soro: 1L água + 1 colher café sal + 2 colheres sopa açúcar.`;
}

function salvarNotaLocal() { localStorage.setItem('DNA_NOTES', document.getElementById('txtNotas').value); alert("Gravado."); }

function baixarNotasComoTXT() {
    const b = new Blob([document.getElementById('txtNotas').value], {type:'text/plain'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = "CADERNO_MAE.txt"; a.click();
}

function toggleSetor(id) {
    ['galeria','notas','pintura','ferramentas','diagnostico'].forEach(s => {
        document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
    });
}

// INICIALIZAÇÃO TOTAL
document.addEventListener('DOMContentLoaded', () => {
    initPortal(); animatePortal(); setupMural();
    setInterval(() => {
        const d = Math.floor((Date.now()-startTime)/1000);
        document.getElementById('timer').innerText = `${Math.floor(d/60).toString().padStart(2,'0')}:${(d%60).toString().padStart(2,'0')}`;
    }, 1000);
    const n = localStorage.getItem('DNA_NOTES'); if(n) document.getElementById('txtNotas').value = n;
});
