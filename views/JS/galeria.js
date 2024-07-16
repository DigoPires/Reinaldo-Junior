const gA = document.querySelector(".galeria-abrir");
const img = document.querySelector(".galeria-abrir img");

function fecharGaleria(){
    gA.style.visibility = "hidden";
}

function abrirGaleria(src){
    gA.style.visibility = "visible";
    img.style.transform = "scale(1)";
    img.src = src
}
