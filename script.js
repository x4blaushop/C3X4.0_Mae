const OWNER = "José Patrick Castro Soares";
let db, interacoes = 0, startTime = Date.now();

// --- MOTOR DO PORTAL GRAVITACIONAL ---
const canvas = document.getElementById('canvas-portal');
const ctx = canvas.getContext('2d');
let particles = [];

function initPortal() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for(let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2
        });
    }
}

function animatePortal() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.forEach(p => {
        // Atração gravitacional para o centro
        let dx = centerX - p.x;
        let dy = centerY - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        let force = 0.5;

        p.x += (dx / dist) * force + Math.cos(p.angle) * p.speed;
        p.y += (dy / dist) * force + Math.sin(p.angle) * p.speed;
        p.angle += 0.01;

        if(dist < 30) { // Reset ao entrar no portal
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
        }

        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animatePortal);
}

// --- LOGICA DE HABITAÇÃO (MANTIDA) ---
const request = indexedDB.open("MAE_DNA", 1);
request.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore("acervo", { autoIncrement: true });
};
request.onsuccess = (e) => { db = e.target.result; carregarTudo(); };

function carregarTudo() {
    const store = db.transaction("acervo").objectStore("acervo");
    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) { exibirFoto(cursor.value); cursor.continue(); }
    };
    if(localStorage.getItem('C3_NOTES')) document.getElementById('txtNotas').value = localStorage.getItem('C3_NOTES');
    if(localStorage.getItem('C3_COLOR')) ajustarDNA(localStorage.getItem('C3_COLOR'));
}

function injetarMemoriaMassa(input) {
    const tx = db.transaction("acervo", "readwrite");
    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => { tx.objectStore("acervo").add(e.target.result); exibirFoto(e.target.result); };
        reader.readAsDataURL(file);
    });
}

function exibirFoto(src) {
    const img = document.createElement('img');
    img.src = src; img.className = "photo-item";
    document.getElementById('grid-galeria').appendChild(img);
}

function ajustarDNA(v) {
    document.documentElement.style.setProperty('--green', `hsl(${v}, 100%, 50%)`);
    localStorage.setItem('C3_COLOR', v);
}

function toggleSetor(id) {
    ['galeria', 'notas', 'diagnostico', 'atmosfera'].forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = (s === id) ? 'block' : 'none';
    });
}

function salvarNota(v) { localStorage.setItem('C3_NOTES', v); }

window.addEventListener('resize', initPortal);
initPortal();
animatePortal();
