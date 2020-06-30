// const burger = document.querySelector(".burger");
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".modal-menu");
const close = document.querySelector(".close");

hamburger.addEventListener('click', function () {
  menu.classList.add('menu_opened');
});

menu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('menu__item') || e.target.classList.contains('close')) {
    menu.classList.remove('menu_opened');
  }
  
  if (e.target.classList.contains('menu__item')) {
    menu.classList.remove('menu_opened');
  }
  
});