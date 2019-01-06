'use strict';

var header = document.querySelector('.header');
var logo = header.querySelector('.logo');
var search = header.querySelector('.search');
var navButton = header.querySelector('.main-nav__toggle');
var mainNav = header.querySelector('.main-nav__list');
var siteNav = header.querySelector('.site-nav');
var sidebar = document.querySelector('.sidebar');

navButton.addEventListener('click', function () {
  if (navButton.classList.contains('main-nav__toggle--closed')) {
    document.body.classList.add('no-scroll');
    header.classList.add('header--fixed');

    logo.classList.remove('logo--opened');
    logo.classList.add('logo--closed');

    search.classList.remove('search--closed');
    mainNav.classList.remove('main-nav__list--closed');
    siteNav.classList.remove('site-nav--closed');

    navButton.classList.remove('main-nav__toggle--closed');
    navButton.classList.add('main-nav__toggle--opened');

    sidebar.classList.add('sidebar--closed');
  } else {
    document.body.classList.remove('no-scroll');
    header.classList.remove('header--fixed');

    logo.classList.remove('logo--closed');
    logo.classList.add('logo--opened');

    search.classList.add('search--closed');
    mainNav.classList.add('main-nav__list--closed');
    siteNav.classList.add('site-nav--closed');

    navButton.classList.remove('main-nav__toggle--opened');
    navButton.classList.add('main-nav__toggle--closed');

    sidebar.classList.remove('sidebar--closed');
  }
});

var searchField = search.querySelector('.search__field');
var categoryCompressor = document.querySelector('.categories__item--compressor  .categories__link');
var categoryDehydrator = document.querySelector('.categories__item--dehydrator  .categories__link');
var categoryPump = document.querySelector('.categories__item--pump  .categories__link');
var categoryPowerstation = document.querySelector('.categories__item--powerstation  .categories__link');

document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(max-width: 767px)').matches) {
    searchField.placeholder = 'Поиск';
    categoryCompressor.textContent = 'Компрессоры';
    categoryDehydrator.textContent = 'Осушители';
    categoryPump.textContent = 'Насосы';
    categoryPowerstation.textContent = 'Электростанции';
  }
});

var bannerToggles = document.querySelectorAll('.banner__switchers  .switchers__toggle');
var bannerSlides = document.querySelectorAll('.banner__slide');

var bannerTogglesHandler = function (toggle, slide) {
  toggle.addEventListener('click', function () {
    if (!toggle.classList.contains('switchers__toggle--active')) {
      bannerToggles.forEach(function (it) {
        it.classList.remove('switchers__toggle--active');
      });
      bannerSlides.forEach(function (it) {
        it.classList.remove('banner__slide--active');
      });

      toggle.classList.add('switchers__toggle--active');
      slide.classList.add('banner__slide--active');
    }
  });
};

for (var i = 0; i < bannerToggles.length; i++) {
  bannerTogglesHandler(bannerToggles[i], bannerSlides[i]);
}

var cities = document.querySelectorAll('.footer__city');
var addresses = document.querySelectorAll('.footer__address');

var citiesClickHandler = function (city, address) {
  city.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!city.classList.contains('footer__city--active')) {
      cities.forEach(function (it) {
        it.classList.remove('footer__city--active');
      });
      addresses.forEach(function (it) {
        it.classList.remove('footer__address--active');
      });

      city.classList.add('footer__city--active');
      address.classList.add('footer__address--active');
    }
  });
};

for (i = 0; i < cities.length; i++) {
  citiesClickHandler(cities[i], addresses[i]);
}
