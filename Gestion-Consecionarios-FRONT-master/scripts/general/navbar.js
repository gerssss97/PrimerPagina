let menu = document.querySelector('.nav-bar');
let menuIcon = document.querySelector('.hamburger');
document.querySelector('.hamburger').onclick = () => {
  menu.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('active');
}

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
    menu.classList.remove('active');
  }
});

let subMenu = document.getElementById("subMenu");
function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}