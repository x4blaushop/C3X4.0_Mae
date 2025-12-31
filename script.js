// ---------- ESTADO CENTRAL ----------
let data = JSON.parse(localStorage.getItem("house")) || {
    start: Date.now(),
    photos: [],
    notes: "",
    theme: "matrix",
    simple: false,
    whats: "https://wa.me/55",
    link: "https://google.com",
    interactions: 0
};

function save(){ localStorage.setItem("house", JSON.stringify(data)); }

// ---------- MONITORAMENTO DE DADOS ----------
const interactionDisplay = document.getElementById("interaction-count");
interactionDisplay.innerText = data.interactions;

let seconds = 0;
setInterval(() => {
    seconds++;
    document.getElementById("session-timer").innerText = `${seconds}s`;
}, 1000);

document.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        data.interactions++;
        interactionDisplay.innerText = data.interactions;
        save();
        showToast(`Interação: ${e.target.innerText}`);
    }
});

// ---------- STATUS DE HABITAÇÃO ----------
const statusEl = document.getElementById("status");
const days = Math.floor((Date.now() - data.start) / 86400000);
statusEl.textContent = `Você habita este espaço há ${days} dias.`;

// ---------- GALERIA ----------
const gallery = document.getElementById("gallery");
const input = document.getElementById("photoInput");

function renderGallery(){
    gallery.innerHTML = "";
    data.photos.forEach(p => {
        let img = document.createElement("img");
        img.src = p;
        gallery.appendChild(img);
    });
}
renderGallery();

input.onchange = () => {
    [...input.files].forEach(f => {
        let r = new FileReader();
        r.onload = e => {
            data.photos.push(e.target.result);
            save();
            renderGallery();
            showToast("Nova memória adicionada à Galeria.");
        };
        r.readAsDataURL(f);
    });
};

// ---------- NOTAS ----------
const notes = document.getElementById("notes");
notes.value = data.notes;
notes.oninput = () => { data.notes = notes.value; save(); };

// ---------- LINKS ----------
function openWhats(){ window.open(data.whats); }
function openLink(){ window.open(data.link); }
function openNivel(){ window.open("https://x4blaushop.github.io/NIVEL-0/"); }

// ---------- MODOS E TEMAS ----------
function toggleSimple() {
    data.simple = !data.simple;
    document.body.classList.toggle("simple", data.simple);
    document.getElementById('btn-simple').innerText = data.simple ? "Modo Arquiteto" : "Modo Foco";
    save();
}

function toggleTheme() {
    data.theme = data.theme === "matrix" ? "dark-theme" : "matrix";
    document.body.className = data.theme;
    save();
    showToast("DNA Visual Alterado.");
}

function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = `[DNA]: ${msg}`;
    document.getElementById("toast-container").appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function exportData(){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)]));
    a.download = `C3X4-Backup-${new Date().getTime()}.json`;
    a.click();
    showToast("Sincronização concluída.");
}

// ---------- EFEITO MATRIX ----------
const canvas = document.getElementById("matrix");
const ctxm = canvas.getContext("2d");
function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = "01";
    const fontSize = 14;
    const cols = canvas.width / fontSize;
    const drops = Array.from({length: cols}).fill(1);

    function draw() {
        ctxm.fillStyle = "rgba(0,0,0,0.05)";
        ctxm.fillRect(0, 0, canvas.width, canvas.height);
        ctxm.fillStyle = "#0f0";
        ctxm.font = fontSize + "px monospace";
        drops.forEach((y, i) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctxm.fillText(text, i * fontSize, y * fontSize);
            if(y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(draw, 50);
}
initMatrix();

// Restaurar Estado Inicial
if(data.simple) document.body.classList.add("simple");
document.body.classList.add(data.theme);
