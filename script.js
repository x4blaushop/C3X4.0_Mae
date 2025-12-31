// Mostrar cômodos
function mostrarComodo(id) {
  document.querySelectorAll('.comodo').forEach(sec => {
    if (sec.id) sec.classList.add('oculto');
  });

  const alvo = document.getElementById(id);
  if (alvo) alvo.classList.remove('oculto');
}

// Pesquisa externa (fora da casa)
function pesquisar() {
  const termo = document.getElementById('campoPesquisa').value;
  if (!termo) return;
  const url = 'https://www.google.com/search?q=' + encodeURIComponent(termo);
  window.open(url, '_blank');
}

// Bloco de notas
function salvarNotas() {
  const texto = document.getElementById('notas').value;
  localStorage.setItem('notasCasa', texto);
  alert('Anotações salvas.');
}

// Carregar notas ao abrir
window.onload = () => {
  const notas = localStorage.getItem('notasCasa');
  if (notas) {
    const campo = document.getElementById('notas');
    if (campo) campo.value = notas;
  }
};
