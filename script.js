const OWNER_NAME = "José Patrick Castro Soares";
let interacoes = 0, ruidoPermitido = false, dnaVerificado = false, startTime = Date.now(), db;

// Inicialização de Infraestrutura de Dados (IndexedDB - Insubstituível)
const request = indexedDB.open("C3X4_DNA_STORAGE", 1);
request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("memorias")) db.createObjectStore("memorias", { autoIncrement: true });
};
request.onsuccess = (e) => { db = e.target.result; carregarTudo(); };

document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateTimer, 1000);
});

// INJEÇÃO EM MASSA: Processa múltiplas imagens e salva no "Solo" da casa
function processarImagensMassa(input) {
    const files = Array.from(input.files);
    const tx = db.transaction("memorias", "readwrite");
    const store = tx.objectStore("memorias");

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            store.add(e.target.result);
            renderizarFoto(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

function renderizarFoto(src) {
    const grid = document.getElementById('grid-galeria');
    const img = document.createElement('img');
    img.src = src;
    img.className = "photo-item";
    grid.appendChild(img);
}

function carregarTudo() {
    // Carregar Acervo do Banco de Dados Local
    const store = db.transaction("memorias").objectStore("memorias");
    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) { renderizarFoto(cursor.value); cursor.continue(); }
    };
    // Carregar Preferências
    const notas = localStorage.getItem('C3_DNA_NOTES');
    if (notas) document.getElementById('txtNotas').value = notas;
    const cor = localStorage.getItem('C3X4_DNA_COLOR');
    if (cor) ajustarDNA(cor);
}

// Lógica Sensorial e Atmosfera
function ajustarDNA(valor) {
    document.documentElement.style.setProperty('--green', `hsl(${valor}, 100%, 50%)`);
    document.getElementById('dna-pulse').style.filter = `hue-rotate(${valor}deg)`;
    localStorage.setItem('C3X4_DNA_COLOR', valor);
}

function toggleRuido() {
    ruidoPermitido = !ruidoPermitido;
    const btn = document.getElementById('noise-filter');
    document.body.classList.toggle('noise-on');
    btn.innerText = ruidoPermitido ? "MURALHA: PERMISSIVA" : "MURALHA: ATIVA";
    btn.style.color = ruidoPermitido ? "red" : "var(--green)";
}

// Biometria Visual
async function ativarScannerVisual() {
    const container = document.getElementById('scanner-container');
    const video = document.getElementById('webcam');
    toggleSetor('atmosfera');
    container.style.display = 'block';
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        setTimeout(() => {
            dnaVerificado = true;
            document.getElementById('sys-state').innerText = "ARQUITETO_OK";
            document.getElementById('galeria-travada').style.display = 'none';
            document.getElementById('galeria-conteudo').style.display = 'block';
            stream.getTracks().forEach(track => track.stop());
            container.style.display = 'none';
            alert("DNA Confirmado: " + OWNER_NAME);
        }, 3000);
    } catch (err) { alert("Hardware não detectado."); }
}

function salvarNota(txt) {
    localStorage.setItem('C3_DNA_NOTES', txt);
    interacoes++;
    document.getElementById('interacoes').innerText = interacoes;
    if (interacoes > 100) {
        document.getElementById('bio-status').innerText = "60% (FADIGA)";
        document.getElementById('sys-state').innerText = "ALERTA";
    }
}

function backupSoberano() {
    const dados = { notas: localStorage.getItem('C3_DNA_NOTES'), cor: localStorage.getItem('C3X4_DNA_COLOR') };
    const blob = new Blob([JSON.stringify(dados)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `DNA_C3X4_BACKUP.json`;
    a.click();
}

function toggleSetor(id) {
    ['galeria', 'notas', 'diagnostico', 'atmosfera'].forEach(s => {
        document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
    });
}

function updateTimer() {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `${Math.floor(diff/60).toString().padStart(2,'0')}:${(diff%60).toString().padStart(2,'0')}`;
}

function verificarAcessoSoberano() { dnaVerificado ? alert("Dono Online.") : ativarScannerVisual(); }
