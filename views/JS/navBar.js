const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');
const activeClass = 'active';
const closeMenu = document.querySelector(".mobile-menu-fechar")

const headerNav = document.querySelector(".remove-nav-header")
const main = document.querySelector("main");
const footer = document.querySelector("footer");

mobileMenu.addEventListener("click", () => {
    nav.classList.add(activeClass);
});

closeMenu.addEventListener("click", () => nav.classList.remove('active'));

headerNav.addEventListener("click", () => nav.classList.remove('active'));
main.addEventListener("click", () => nav.classList.remove('active'));
footer.addEventListener("click", () => nav.classList.remove('active'));