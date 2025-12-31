// ---------- CONTROLE DE PERSONALIZAÇÃO ----------
function mudarCor(cor) {
    document.documentElement.style.setProperty('--green', cor);
    save();
}

// ---------- GALERIA FUNCIONAL ----------
const gallery = document.getElementById("gallery-grid"); // Certifique-se que o ID existe no HTML
const input = document.getElementById("photoInput");

function renderGallery() {
    gallery.innerHTML = "";
    data.photos.forEach((p, index) => {
        let container = document.createElement("div");
        container.className = "photo-item";
        container.innerHTML = `
            <img src="${p}" style="width:100%; border-radius:8px;">
            <button onclick="removerFoto(${index})" class="del-btn">X</button>
        `;
        gallery.appendChild(container);
    });
}

input.onchange = () => {
    [...input.files].forEach(f => {
        let r = new FileReader();
        r.onload = e => {
            data.photos.push(e.target.result);
            save();
            renderGallery();
        };
        r.readAsDataURL(f);
    });
};

function removerFoto(index) {
    data.photos.splice(index, 1);
    save();
    renderGallery();
}

// ---------- DEFINIR NOVOS COMANDOS ----------
function definirComando(nome, acao) {
    console.log(`[DNA]: Novo comando '${nome}' registrado.`);
    // Aqui você pode expandir para criar botões dinamicamente
}
