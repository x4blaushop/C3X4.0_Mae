// Memória de Identificação do Dono
const OWNER_NAME = "José Patrick Castro Soares";
let interacoes = 0;
let ruidoPermitido = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    iniciarMatriz();
    carregarDNA();
    setInterval(updateTimer, 1000);
});

// Lógica de Atmosfera e 255 Cores (HSL)
function ajustarDNA(valor) {
    // Mapeia o valor 0-255 para o espectro HSL
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

function aplicarEfeito(tipo) {
    document.body.className = 'matrix ' + tipo;
    setTimeout(() => document.body.className = 'matrix', 3000);
}

// Lógica de Diagnóstico Bio-Sensorial (Aba Console)
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

// Função de Troca de Setores (Abas) - Expandida para Atmosfera
function toggleSetor(setorId) {
    const setores = ['galeria', 'notas', 'diagnostico', 'atmosfera'];
    setores.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = (s === setorId) ? 'block' : 'none';
    });
}

function verificarAcessoSoberano() {
    console.log("Iniciando reconhecimento facial do Arquiteto...");
    alert("Identificação confirmada: Bem-vindo, Arquiteto " + OWNER_NAME);
    document.body.style.border = "4px solid var(--green)";
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

// Funções de suporte (Timer e Matriz simulada para não quebrar o código enviado)
function iniciarMatriz() { console.log("Matrix Ativa."); }
function updateTimer() { /* Lógica de timer aqui */ }
