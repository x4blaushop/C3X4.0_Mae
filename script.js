// ---------- ESTADO ----------
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

// ---------- MEDIDORES E ESTATÍSTICAS ----------
const interactionDisplay = document.getElementById("interaction-count");
interactionDisplay.innerText = data.interactions;

// Contador de Sessão (Tempo de permanência)
let seconds = 0;
setInterval(() => {
    seconds++;
    document.getElementById("session-timer").innerText = `Sessão: ${seconds}s`;
}, 1000);

// Registro de Cliques Soberanos
document.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON" || e.target.tagName === "A") {
        data.interactions++;
        interactionDisplay.innerText = data.interactions;
        save();
        console.log(`[DNA LOG]: Interação em ${e.target.innerText}`); // Aba Console
    }
});

// Diagnóstico de Performance
window.addEventListener('load', () => {
    const perf = window.performance.getEntriesByType("navigation")[0];
    if(perf.domContentLoadedEventEnd < 1000) {
        document.getElementById("sys-status").innerText = "Ultraveloz";
    }
});

// ---------- STATUS E RESTANTE DO CÓDIGO ----------
const status = document.getElementById("status");
const days = Math.floor((Date.now() - data.start) / 86400000);
status.textContent = `Você vive aqui há ${days} dias.`;

// (Manter funções de Galeria, Notas, Matrix, Temas e Backup originais aqui)
// ... [Código Original de Galeria, Notas e Matrix omitido para brevidade]
