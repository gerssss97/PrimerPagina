const carrusel = document.querySelector(".carrusel");
const arrowBtns = document.querySelectorAll(".wrapper-carrusel .icon-flecha");
const firstCardWidth = carrusel.querySelector(".card-carrusel").offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carrusel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    carrusel.classList.add("dragging");
    startX = e.pageX;
}

const dragging = (e) => {
    if (!isDragging) return;
    carrusel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrusel.classList.remove("dragging");
}

carrusel.addEventListener("mousedown", dragStart);
carrusel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);