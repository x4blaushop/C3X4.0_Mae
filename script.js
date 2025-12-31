// Pesquisa
function pesquisar() {
  const q = document.getElementById("busca").value;
  if (q) window.open("https://www.google.com/search?q=" + encodeURIComponent(q));
}

// Notas
const notas = document.getElementById("notasTexto");
notas.value = localStorage.getItem("notas") || "";

notas.addEventListener("input", () => {
  localStorage.setItem("notas", notas.value);
});

function limparNotas() {
  notas.value = "";
  localStorage.removeItem("notas");
}

function exportarNotas() {
  const blob = new Blob([notas.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "anotacoes.txt";
  a.click();
}

// Links
const listaLinks = document.getElementById("listaLinks");
const linksSalvos = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks() {
  listaLinks.innerHTML = "";
  linksSalvos.forEach(l => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = l.url;
    a.textContent = l.nome;
    a.target = "_blank";
    a.style.color = "#62ff8a";
    li.appendChild(a);
    listaLinks.appendChild(li);
  });
}

function adicionarLink() {
  const nome = document.getElementById("linkNome").value;
  const url = document.getElementById("linkURL").value;
  if (!nome || !url) return;
  linksSalvos.push({ nome, url });
  localStorage.setItem("links", JSON.stringify(linksSalvos));
  renderLinks();
}

renderLinks();

// Galeria
const inputFoto = document.getElementById("fotoInput");
const galeria = document.getElementById("galeriaFotos");
const fotos = JSON.parse(localStorage.getItem("fotos")) || [];

function renderFotos() {
  galeria.innerHTML = "";
  fotos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    galeria.appendChild(img);
  });
}

inputFoto.addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    fotos.push(reader.result);
    localStorage.setItem("fotos", JSON.stringify(fotos));
    renderFotos();
  };
  reader.readAsDataURL(file);
});

renderFotos();
