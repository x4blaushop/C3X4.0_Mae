const OWNER = "José Patrick Castro Soares";
let startTime = Date.now();
let countInteracoes = 0;

// --- MOTOR DO PORTAL GRAVITACIONAL ---
const canvas = document.getElementById('canvas-portal');
const ctx = canvas.getContext('2d');
let particles = [];

function initPortal() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 180; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5,
            speed: Math.random() * 0.4 + 0.1,
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
        p.x += (dx / dist) * 1.3 + Math.cos(p.angle) * p.speed;
        p.y += (dy / dist) * 1.3 + Math.sin(p.angle) * p.speed;
        p.angle += 0.015;
        if(dist < 20) { p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height; }
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(animatePortal);
}

// --- FUNCIONALIDADES DO ACERVO ---
function injetarMemoriaMassa(input) {
    const grid = document.getElementById('grid-galeria');
    let fotosSalvas = JSON.parse(localStorage.getItem('DNA_FOTOS') || "[]");
    
    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const src = e.target.result;
            exibirFoto(src);
            fotosSalvas.push(src);
            localStorage.setItem('DNA_FOTOS', JSON.stringify(fotosSalvas));
        };
        reader.readAsDataURL(file);
    });
    registrarInteracao();
}

function exibirFoto(src) {
    const grid = document.getElementById('grid-galeria');
    const img = document.createElement('img');
    img.src = src; img.className = "photo-item";
    grid.appendChild(img);
}

function carregarAcervo() {
    const fotos = JSON.parse(localStorage.getItem('DNA_FOTOS') || "[]");
    fotos.forEach(src => exibirFoto(src));
}

function limparAcervo() {
    if(confirm("Deseja apagar todas as fotos da memória?")) {
        localStorage.removeItem('DNA_FOTOS');
        document.getElementById('grid-galeria').innerHTML = '';
    }
}

// --- FUNCIONALIDADES DE FERRAMENTAS ---
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
            a.href = cleanData; a.download = "MAE_FOTO_SEGURA.jpg";
            a.innerText = "BAIXAR FOTO LIMPA"; a.className = "btn-full";
            document.getElementById('downloadArea').innerHTML = '';
            document.getElementById('downloadArea').appendChild(a);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function calcularSoro() {
    const peso = document.getElementById('pesoCorpo').value;
    if(!peso) return;
    const agua = (peso * 0.035).toFixed(2);
    document.getElementById('resSoro').innerHTML = `Beber ${agua}L de água/dia. Soro: 1L água + 1 colher café sal + 2 colheres sopa açúcar.`;
    registrarInteracao();
}

function analisarContrato() {
    const text = document.getElementById('txtContrato').value.toLowerCase();
    const riscos = ["partilhar", "vender", "microfone", "contatos", "localização"];
    let detectados = riscos.filter(r => text.includes(r));
    document.getElementById('resContrato').innerHTML = detectados.length > 0 ? "Risco: Uso de " + detectados.join(", ") : "Texto parece seguro.";
}

// --- REGISTROS E TELEMETRIA ---
function salvarNotaLocal() {
    localStorage.setItem('C3_DNA_NOTES', document.getElementById('txtNotas').value);
    registrarInteracao();
    alert("Caderno Gravado.");
}

function baixarNotasComoTXT() {
    const blob = new Blob([document.getElementById('txtNotas').value], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `CADERNO_MAE_${Date.now()}.txt`; a.click();
}

function gerarBackupTotal() {
    const backup = { dono: OWNER, notas: document.getElementById('txtNotas').value, clima: localStorage.getItem('DNA_HUE') };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = "BACKUP_MAE_COMPLETO.json"; a.click();
}

function atualizarTelemetria() {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `${Math.floor(diff/60).toString().padStart(2,'0')}:${(diff%60).toString().padStart(2,'0')}`;
    const ram = window.performance && performance.memory ? (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2) : (Math.random()*2 + 12).toFixed(2);
    document.getElementById('ram-usage').innerText = ram + " MB";
}

function registrarInteracao() {
    countInteracoes++;
    document.getElementById('interacoes').innerText = countInteracoes;
}

function ajustarDNA(v) {
    document.documentElement.style.setProperty('--green', `hsl(${v}, 100%, 50%)`);
    localStorage.setItem('DNA_HUE', v);
}

function toggleSetor(id) {
    ['galeria', 'notas', 'ferramentas', 'diagnostico'].forEach(s => {
        document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
    });
}

// INICIALIZAÇÃO
window.addEventListener('resize', initPortal);
document.addEventListener('DOMContentLoaded', () => {
    initPortal(); animatePortal(); carregarAcervo();
    setInterval(atualizarTelemetria, 1000);
    const n = localStorage.getItem('C3_DNA_NOTES'); if(n) document.getElementById('txtNotas').value = n;
    const h = localStorage.getItem('DNA_HUE'); if(h) { document.getElementById('dna-hue').value = h; ajustarDNA(h); }
});

function verificarAcessoSoberano() { alert("Acesso Identificado: Arquiteto José Patrick."); }
