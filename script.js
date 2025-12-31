// STATUS DE USO
const status = document.getElementById("status");
const now = Date.now();

let firstVisit = localStorage.getItem("firstVisit");
if (!firstVisit) {
  localStorage.setItem("firstVisit", now);
  status.textContent = "Primeira vez nesta casa.";
} else {
  const days = Math.floor((now - firstVisit) / (1000 * 60 * 60 * 24));
  status.textContent = `Você vive aqui há ${days} dias.`;
}

// GALERIA
const photoInput = document.getElementById("photoInput");
const gallery = document.getElementById("gallery");

let photos = JSON.parse(localStorage.getItem("photos")) || [];

function renderGallery() {
  gallery.innerHTML = "";
  photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    gallery.appendChild(img);
  });
}

photoInput.addEventListener("change", () => {
  [...photoInput.files].forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      photos.push(e.target.result);
      localStorage.setItem("photos", JSON.stringify(photos));
      renderGallery();
    };
    reader.readAsDataURL(file);
  });
});

renderGallery();

// NOTAS
const notes = document.getElementById("notes");
notes.value = localStorage.getItem("notes") || "";

notes.addEventListener("input", () => {
  localStorage.setItem("notes", notes.value);
});
