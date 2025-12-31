// Memória de Identificação do Dono
const OWNER_NAME = "José Patrick Castro Soares";
let interacoes = 0;
let ruidoPermitido = false;
let dnaVerificado = false;
let startTime = Date.now();

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    iniciarMatriz();
    carregarDNA();
    setInterval(updateTimer, 1000);
});

// Lógica de Atmosfera e 255 Cores (HSL)
function ajustarDNA(valor) {
    document.documentElement.style.setProperty('--green', `hsl(${valor}, 100%, 50%)`);
    document.getElementById('dna-pulse').style.filter = `hue-rotate(${valor}deg)`;
    localStorage.setItem('C3X4_DNA_COLOR', valor);
}

// Filtro de Ruído do Mundo Externo
function toggleRuido() {
    ruidoPermitido = !ruidoPermitido;
    const btn = document.getElementById('noise-filter');
    if (ruidoPermitido) {
        btn.innerText = "MURALHA: PERMISSIVA";
        btn.style.color = "red";
        document.body.classList.add('noise-on');
    } else {
        btn.innerText = "MURALHA: ATIVA";
        btn.style.color = "var(--green)";
        document.body.classList.remove('noise-on');
    }
}

// FUNCIONALIDADE: Scanner Biométrico Visual
async function ativarScannerVisual() {
    const container = document.getElementById('scanner-container');
    const video = document.getElementById('webcam');
    toggleSetor('atmosfera');
    container.style.display = 'block';

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        document.getElementById('sys-state').innerText = "ESCANEAR_DNA...";
        
        setTimeout(() => {
            dnaVerificado = true;
            document.getElementById('sys-state').innerText = "ARQUITETO_OK";
            document.getElementById('scanner-msg').innerText = "DNA RECONHECIDO: " + OWNER_NAME;
            document.getElementById('galeria-travada').style.display = 'none';
            document.getElementById('galeria-conteudo').style.display = 'block';
            alert("Soberania Confirmada. Acervo liberado.");
            stream.getTracks().forEach(track => track.stop());
            container.style.display = 'none';
        }, 3000);
    } catch (err) {
        alert("Erro de Hardware: Câmera não detectada ou permissão negada.");
    }
}

function aplicarEfeito(tipo) {
    document.body.classList.add(tipo);
    setTimeout(() => document.body.classList.remove(tipo), 3000);
}

// Lógica de Diagnóstico Bio-Sensorial
function monitorarSaude() {
    const estado = document.getElementById('sys-state');
    const bio = document.getElementById('bio-status');
    const consoleLog = document.getElementById('check-console');

    if (interacoes > 100) {
        estado.innerText = "ALERTA_CRÍTICO";
        bio.innerText = "60% (PARESTESIA)";
        consoleLog.innerText = "3. Console: Ruído detectado (Agulhas). Injetar B12.";
    }
}

function executarSoroCaseiro() {
    alert("Executando Protocolo de Reposição: Soro Caseiro (Sal + Açúcar + Água). Estabilizando Osmose...");
    document.getElementById('sys-state').innerText = "ESTÁVEL";
    document.getElementById('bio-status').innerText = "100%";
    document.getElementById('check-console').innerText = "3. Console: Silêncio restaurado.";
}

function toggleSetor(setorId) {
    const setores = ['galeria', 'notas', 'diagnostico', 'atmosfera'];
    setores.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = (s === setorId) ? 'block' : 'none';
    });
}

function verificarAcessoSoberano() {
    if(!dnaVerificado) {
        ativarScannerVisual();
    } else {
        alert("Bem-vindo de volta, Arquiteto " + OWNER_NAME);
    }
}

function salvarNota(txt) {
    localStorage.setItem('C3_DNA_NOTES', txt);
    interacoes++;
    document.getElementById('interacoes').innerText = interacoes;
    monitorarSaude();
}

function carregarDNA() {
    const notasSalvas = localStorage.getItem('C3_DNA_NOTES');
    if (notasSalvas) document.getElementById('txtNotas').value = notasSalvas;
    
    const corSalva = localStorage.getItem('C3X4_DNA_COLOR');
    if (corSalva) {
        document.getElementById('dna-hue').value = corSalva;
        ajustarDNA(corSalva);
    }
}

function iniciarMatriz() { console.log("C3X4.0_MAE: Sistema Online."); }

function updateTimer() {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const min = String(Math.floor(diff / 60)).padStart(2, '0');
    const sec = String(diff % 60).padStart(2, '0');
    document.getElementById('timer').innerText = `${min}:${sec}`;
}
