const OWNER_NAME = "José Patrick Castro Soares";
let startTime = Date.now();
let interacoes = 0;
let frameCount = 0;
let lastTime = performance.now();

// --- MOTOR DO PORTAL GRAVITACIONAL (FISICA DO NIVEL-0) ---
const canvas = document.getElementById('canvas-portal');
const ctx = canvas.getContext('2d');
let particles = [];

function initPortal() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.2,
            angle: Math.random() * Math.PI * 2
        });
    }
}

function animatePortal() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.forEach(p => {
        let dx = centerX - p.x;
        let dy = centerY - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        p.x += (dx / dist) * 1.5 + Math.cos(p.angle) * p.speed;
        p.y += (dy / dist) * 1.5 + Math.sin(p.angle) * p.speed;
        p.angle += 0.02;
        if(dist < 20) { p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height; }
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });

    frameCount++;
    let now = performance.now();
    if (now - lastTime >= 1000) {
        document.getElementById('fps-monitor').innerText = frameCount;
        frameCount = 0; lastTime = now;
    }
    requestAnimationFrame(animatePortal);
}

// --- FERRAMENTAS DE UTILIDADE BRUTA ---

// 1. Stripper de Metadados (Privacidade de Foto)
function limparFoto(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const cvs = document.getElementById('canvasStripper');
            cvs.width = img.width; cvs.height = img.height;
            const context = cvs.getContext('2d');
            context.drawImage(img, 0, 0);
            const cleanData = cvs.toDataURL("image/jpeg", 0.9);
            const a = document.createElement('a');
            a.href = cleanData; a.download = "DNA_CLEAN_PHOTO.jpg";
            a.innerText = "BAIXAR FOTO SEM RASTROS";
            a.className = "btn-full";
            document.getElementById('downloadArea').innerHTML = '';
            document.getElementById('downloadArea').appendChild(a);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 2. Calculadora de Osmose (Biologia)
function calcularSoro() {
    const peso = document.getElementById('pesoCorpo').value;
    if(!peso) return alert("Defina o peso do corpo.");
    const agua = (peso * 0.035).toFixed(2);
    document.getElementById('resSoro').innerHTML = `Protocolo: ${agua}L de água/dia. Soro: 1L água + 1 colher café sal + 2 colheres sopa açúcar.`;
}

// 3. Sifonador de Termos (Análise de Risco)
function analisarContrato() {
    const text = document.getElementById('txtContrato').value.toLowerCase();
    const riscos = ["dados", "terceiros", "microfone", "localização", "venda", "partilhar", "rastrear"];
    let detectados = riscos.filter(r => text.includes(r));
    document.getElementById('resContrato').innerHTML = detectados.length > 0 ? 
        `ALERTA: Cláusulas de perda de soberania detectadas: ${detectados.join(", ")}` : "Nenhum risco óbvio detectado.";
}

// --- FUNÇÕES DE ESTRUTURA E BACKUP ---

function baixarNotasComoTXT() {
    const blob = new Blob([document.getElementById('txtNotas').value], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `LOG_HABITACAO_${Date.now()}.txt`; a.click();
}

function gerarBackupTotal() {
    const backup = { dono: OWNER_NAME, notas: document.getElementById('txtNotas').value, clima: localStorage.getItem('C3X4_DNA_COLOR') };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = "DNA_MAE_TOTAL_BACKUP.json"; a.click();
}

function atualizarTelemetria() {
    const ram = window.performance && performance.memory ? (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2) : "18.42";
    document.getElementById('ram-usage').innerText = ram + " MB";
    const diff = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `${Math.floor(diff/60).toString().padStart(2,'0')}:${(diff%60).toString().padStart(2,'0')}`;
}

function processarImagensMassa(input) {
    const grid = document.getElementById('grid-galeria');
    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img'); img.src = e.target.result;
            img.className = "photo-item"; grid.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

function toggleSetor(id) {
    ['ferramentas', 'galeria', 'notas', 'diagnostico', 'atmosfera'].forEach(s => {
        document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
    });
}

function ajustarDNA(v) { document.documentElement.style.setProperty('--green', `hsl(${v}, 100%, 50%)`); localStorage.setItem('C3X4_DNA_COLOR', v); }

function salvarNotaLocal() { 
    localStorage.setItem('C3_DNA_NOTES', document.getElementById('txtNotas').value); 
    interacoes++; document.getElementById('interacoes').innerText = interacoes;
    alert("DNA Gravado."); 
}

// Inicialização
window.addEventListener('resize', initPortal);
document.addEventListener('DOMContentLoaded', () => {
    initPortal(); animatePortal(); setInterval(atualizarTelemetria, 1000);
    const n = localStorage.getItem('C3_DNA_NOTES'); if(n) document.getElementById('txtNotas').value = n;
    const c = localStorage.getItem('C3X4_DNA_COLOR'); if(c) { document.getElementById('dna-hue').value = c; ajustarDNA(c); }
});
