// ---------- ESTADO ----------
let data = JSON.parse(localStorage.getItem("house")) || {
start: Date.now(),
photos: [],
notes: "",
theme: "matrix",
simple: false,
whats: "https://wa.me/55",
link: "https://google.com"
};

function save(){localStorage.setItem("house",JSON.stringify(data));}

// ---------- STATUS ----------
const status=document.getElementById("status");
const days=Math.floor((Date.now()-data.start)/86400000);
status.textContent=`Você vive aqui há ${days} dias.`;

// ---------- GALERIA ----------
const gallery=document.getElementById("gallery");
const input=document.getElementById("photoInput");

function renderGallery(){
gallery.innerHTML="";
data.photos.forEach(p=>{
let img=document.createElement("img");
img.src=p;
gallery.appendChild(img);
});
}
renderGallery();

input.onchange=()=>{
[...input.files].forEach(f=>{
let r=new FileReader();
r.onload=e=>{
data.photos.push(e.target.result);
save();
renderGallery();
};
r.readAsDataURL(f);
});
};

// ---------- NOTAS ----------
const notes=document.getElementById("notes");
notes.value=data.notes;
notes.oninput=()=>{data.notes=notes.value;save();};

// ---------- GRÁFICO ----------
const c=document.getElementById("chart");
const ctx=c.getContext("2d");
ctx.fillStyle="#0f0";
ctx.fillRect(0,0,days*3,20);
ctx.fillRect(0,40,data.photos.length*10,20);
ctx.fillText("Dias",5,15);
ctx.fillText("Fotos",5,55);

// ---------- LINKS ----------
function openWhats(){window.open(data.whats);}
function openLink(){window.open(data.link);}
function openNivel(){window.open("https://x4blaushop.github.io/NIVEL-0/");}

// ---------- MODO SIMPLES ----------
function toggleSimple(){
data.simple=!data.simple;
document.body.classList.toggle("simple",data.simple);
save();
}
if(data.simple)document.body.classList.add("simple");

// ---------- BACKUP ----------
function exportData(){
const a=document.createElement("a");
a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)]));
a.download="casa-digital-backup.json";
a.click();
}

// ---------- TEMA ----------
function toggleTheme(){
data.theme=data.theme==="matrix"?"dark":"matrix";
save();
}

// ---------- MATRIX EFFECT ----------
const canvas=document.getElementById("matrix");
const ctxm=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const letters="01";
const fontSize=14;
const cols=canvas.width/fontSize;
const drops=Array.from({length:cols}).fill(1);

function drawMatrix(){
ctxm.fillStyle="rgba(0,0,0,0.05)";
ctxm.fillRect(0,0,canvas.width,canvas.height);
ctxm.fillStyle="#0f0";
ctxm.font=fontSize+"px monospace";
drops.forEach((y,i)=>{
const text=letters[Math.floor(Math.random()*letters.length)];
ctxm.fillText(text,i*fontSize,y*fontSize);
if(y*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
drops[i]++;
});
}
setInterval(drawMatrix,50);
