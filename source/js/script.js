'use strict';

var header = document.querySelector('.header');
var logo = header.querySelector('.logo');
var search = header.querySelector('.search');
var navButton = header.querySelector('.main-nav__toggle');
var mainNav = header.querySelector('.main-nav__list');
var siteNav = header.querySelector('.site-nav');

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
  }
});
