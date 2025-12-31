let data = JSON.parse(localStorage.getItem("house")) || {
    start: Date.now(),
    photos: [],
    notes: "",
    theme: "matrix",
    simple: false,
    clicks: 0
};

const save = () => localStorage.setItem("house", JSON.stringify(data));

// TIMER DE SESSÃO
let sec = 0;
setInterval(() => {
    sec++;
    let m = Math.floor(sec/60).toString().padStart(2,'0');
    let s = (sec%60).toString().padStart(2,'0');
    document.getElementById("timer").innerText = `${m}:${s}`;
}, 1000);

// MEDIDOR DE CLIQUES E PING
document.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        data.clicks++;
        document.getElementById("click-count").innerText = data.clicks;
        save();
        
        // Simulação de Latência de Processamento Interno
        const start = Date.now();
        setTimeout(() => {
            document.getElementById("ping").innerText = (Date.now() - start) + "ms";
        }, 50);
    }
});

// FUNÇÕES DE COMANDO
function toggleSimple() {
    data.simple = !data.simple;
    document.body.classList.toggle("simple-mode", data.simple);
    document.getElementById("btn-foco").innerText = data.simple ? "MODO_FOCO: ON" : "MODO_FOCO: OFF";
    save();
}

function toggleTheme() {
    data.theme = data.theme === "matrix" ? "brutalist" : "matrix";
    document.body.className = data.theme;
    save();
}

// RESTANTE DA LÓGICA (GALERIA/NOTAS)
const notes = document.getElementById("notes");
notes.value = data.notes;
notes.oninput = () => { data.notes = notes.value; save(); };

const days = Math.floor((Date.now() - data.start) / 86400000);
document.getElementById("habita-status").innerText = `Habitação ativa há ${days} ciclos.`;

// MATRIX (O FUNDO SOBERANO)
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width/14)).fill(1);
function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#0f0"; ctx.font = "14px monospace";
    drops.forEach((y, i) => {
        ctx.fillText(Math.floor(Math.random()*2), i*14, y*14);
        if(y*14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(draw, 50);
