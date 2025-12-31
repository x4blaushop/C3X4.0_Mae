// Memória de Identificação do Dono
const OWNER_NAME = "José Patrick Castro Soares";
let interacoes = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    iniciarMatriz();
    carregarDNA();
    setInterval(updateTimer, 1000);
});

// Lógica de Diagnóstico Bio-Sensorial (Aba Console)
function monitorarSaude() {
    const estado = document.getElementById('sys-state');
    const bio = document.getElementById('bio-status');
    const consoleLog = document.getElementById('check-console');

    // Simulação de detecção de fadiga/agulhas por tempo de sessão
    if (interacoes > 100) {
        estado.innerText = "ALERTA_CRÍTICO";
        bio.innerText = "60% (PARESTESIA)";
        consoleLog.innerText = "3. Console: Ruído detectado (Agulhas). Injetar B12.";
        notificarDono("Sistema detectou fadiga nervosa. Ative o Repositor.");
    }
}

// Implementação do Soro Caseiro no Sistema
function executarSoroCaseiro() {
    alert("Executando Protocolo de Reposição: Soro Caseiro (Sal + Açúcar + Água). Estabilizando Osmose...");
    document.getElementById('sys-state').innerText = "ESTÁVEL";
    document.getElementById('bio-status').innerText = "100%";
    document.getElementById('check-console').innerText = "3. Console: Silêncio restaurado.";
}

// Função de Troca de Setores (Abas)
function toggleSetor(setorId) {
    const setores = ['galeria', 'notas', 'diagnostico'];
    setores.forEach(s => {
        document.getElementById(s).style.display = (s === setorId) ? 'block' : 'none';
    });
}

// Acesso Soberano (Biometria Facial/DNA fictícia para controle)
function verificarAcessoSoberano() {
    console.log("Iniciando reconhecimento facial do Arquiteto...");
    alert("Identificação confirmada: Bem-vindo, Arquiteto " + OWNER_NAME);
    document.body.style.border = "2px solid var(--green)";
}

// Salvamento Automático de Notas no DNA (LocalStorage)
function salvarNota(txt) {
    localStorage.setItem('C3X4_DNA_NOTES', txt);
    interacoes++;
    document.getElementById('interacoes').innerText = interacoes;
    monitorarSaude();
}

function carregarDNA() {
    const notasSalvas = localStorage.getItem('C3X4_DNA_NOTES');
    if (notasSalvas) document.getElementById('txtNotas').value = notasSalvas;
}
