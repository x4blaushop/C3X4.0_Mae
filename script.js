// ---------- ESTADO E DNA ----------
let data = JSON.parse(localStorage.getItem("house")) || {
    start: Date.now(),
    photos: [],
    notes: "",
    theme: "matrix",
    simple: false,
    clicks: 0,
    accentColor: "#00ff41"
};

const save = () => localStorage.setItem("house", JSON.stringify(data));

// ---------- CONTROLE DE PERSONALIZAÇÃO ----------
function updateDNAColor(color) {
    document.documentElement.style.setProperty('--green', color);
    data.accentColor = color;
    save();
    showToast("Tom da Casa atualizado.");
}

function toggleSection(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === "none") ? "block" : "none";
    showToast(`${id.toUpperCase()} alterada.`);
}

// ---------- GALERIA FUNCIONAL (CORREÇÃO) ----------
const galleryGrid = document.getElementById("gallery-grid");
const photoInput = document.getElementById("photoInput");

function renderGallery() {
    galleryGrid.innerHTML = "";
    data.photos.forEach((photo, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "photo-item";
        wrapper.innerHTML = `
            <img src="${photo}">
            <button onclick="removePhoto(${index})" class="del-btn">Remover</button>
        `;
        galleryGrid.appendChild(wrapper);
    });
}

photoInput.onchange = () => {
    [...photoInput.files].forEach(f => {
        let r = new FileReader();
        r.onload = e => {
            data.photos.push(e.target.result);
            save();
            renderGallery();
        };
        r.readAsDataURL(f);
    });
};

function removePhoto(index) {
    data.photos.splice(index, 1);
    save();
    renderGallery();
}

// ---------- MEDIDORES E STATUS ----------
let sec = 0;
setInterval(() => {
    sec++;
    let m = Math.floor(sec/60).toString().padStart(2,'0');
    let s = (sec%60).toString().padStart(2,'0');
    document.getElementById("timer").innerText = `${m}:${s}`;
}, 1000);

document.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        data.clicks++;
        document.getElementById("click-count").innerText = data.clicks;
        save();
    }
});

// ---------- FUNÇÕES ORIGINAIS PRESERVADAS ----------
const notes = document.getElementById("notes");
notes.value = data.notes;
notes.oninput = () => { data.notes = notes.value; save(); };

function openWhats(){ window.open("https://wa.me/55"); }
function openNivel(){ window.open("https://x4blaushop.github.io/NIVEL-0/"); }
function openLink(){ window.open("https://google.com"); }

function toggleSimple() {
    data.simple = !data.simple;
    document.body.classList.toggle("simple", data.simple);
    save();
}

function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerText = `[SISTEMA]: ${msg}`;
    t.style.display = "block";
    setTimeout(() => t.style.display = "none", 2000);
}

function exportData(){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)]));
    a.download = "DNA-C3X4.json";
    a.click();
}

// ---------- MATRIX (ESSÊNCIA) ----------
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width/14)).fill(1);
function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = data.accentColor; ctx.font = "14px monospace";
    drops.forEach((y, i) => {
        ctx.fillText(Math.floor(Math.random()*2), i*14, y*14);
        if(y*14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(draw, 50);

// Restaurar Preferências
document.documentElement.style.setProperty('--green', data.accentColor);
document.getElementById("colorPicker").value = data.accentColor;
renderGallery();
