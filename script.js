// Sistema de Presença Insubstituível
let timerPresenca;
function resetSombra() {
    document.querySelector('main').style.opacity = "1";
    document.querySelector('header').style.opacity = "1";
    clearTimeout(timerPresenca);
    timerPresenca = setTimeout(() => {
        // A casa entra em "Estado Invisível" - Nível Soberano
        document.querySelector('main').style.opacity = "0.05";
        document.querySelector('header').style.opacity = "0.2";
    }, 10000); // 10 segundos de inatividade
}

document.onmousemove = resetSombra;
document.onclick = resetSombra;
document.onkeypress = resetSombra;
