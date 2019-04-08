'use strict';

var header = document.querySelector('.header');
var logo = header.querySelector('.logo');
var logoTitle = logo.querySelector('.logo__title');
var search = header.querySelector('.search');
var searchFieldWrapper = search.querySelector('.search__field-wrapper');
var searchField = search.querySelector('.search__field');
var searchResults = search.querySelector('.search__results');
var searchRequest = search.querySelector('.search__request');
var navButton = header.querySelector('.main-nav__toggle');
var mainNav = header.querySelector('.main-nav');
var mainNavList = mainNav.querySelector('.main-nav__list');
var siteNav = header.querySelector('.site-nav');
var contacts = header.querySelector('.contacts');
var contactsCallback = contacts.querySelector('.contacts__callback');
var citiesWrapper = contacts.querySelector('.contacts__cities-wrapper');
var activeCity = citiesWrapper.querySelector('.contacts__active');
var citiesList = citiesWrapper.querySelector('.contacts__cities');
var citiesHeader = citiesList.querySelectorAll('.contacts__city');
var main = document.querySelector('.main');
var sidebar = main.querySelector('.sidebar');
var sidebarCatalogLink = sidebar.querySelector('.sidebar__link--catalog');
var catalog = sidebar.querySelector('.catalog');
var catalogHeader = catalog.querySelector('.catalog__header');
var catalogTitle = catalog.querySelector('.catalog__title');
var catalogButton = catalog.querySelector('.catalog__toggle');
var catalogWrapper = catalog.querySelector('.catalog__wrapper');
var catalogItems = catalog.querySelectorAll('.catalog__item');
var catalogLinks = catalog.querySelectorAll('.catalog__link');
var catalogNumbers = catalog.querySelectorAll('.catalog__number');
var catalogSublists = catalog.querySelectorAll('.catalog__sublist');
var feedback = main.querySelector('.feedback');
var footer = document.querySelector('.footer');
var citiesFooter = footer.querySelectorAll('.footer__city');
var addressesFooter = footer.querySelectorAll('.footer__address');
var modalRequest = document.querySelector('.modal--request');
var modalCallback = document.querySelector('.modal--callback');
var searchFieldWidth = 100;
var mainNavWidth = 240;

var getScrollWidth = function () {
  var div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollWidth;
};

var navButtonClickHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    if (navButton.classList.contains('main-nav__toggle--closed')) {
      document.body.classList.add('no-scroll');
      header.classList.add('header--fixed');

      logo.classList.remove('logo--opened');
      logo.classList.add('logo--closed');

      search.classList.remove('search--closed');
      mainNav.style.width = '';
      mainNavList.classList.remove('main-nav__list--closed');
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
      mainNavList.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');

      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');

      sidebar.classList.remove('sidebar--closed');
    }
  }
};

var searchFieldFocusinHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (!header.classList.contains('header--fixed')) {
      mainNav.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
      mainNav.style.width = 0;
      mainNav.classList.add('main-nav--closed');
      searchField.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
      searchField.style.width = searchFieldWidth + 'px';
    }

    searchField.placeholder = 'Поиск';

    searchField.addEventListener('focusout', searchFieldFocusoutHandler, true);
    searchField.addEventListener('input', searchFieldInputHandler);
    searchResults.addEventListener('click', searchResultsClickHandler);
  }
};

var searchFieldFocusoutHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (!header.classList.contains('header--fixed')) {
      searchField.style.width = '';
      mainNav.style.width = mainNavWidth + 'px';
      mainNav.classList.remove('main-nav--closed');
    }

    searchFieldWrapper.classList.remove('search__field-wrapper--input');
    searchField.classList.remove('search__field--input');
    searchField.placeholder = 'Поиск товаров и услуг';

    searchField.removeEventListener('focusout', searchFieldFocusoutHandler);
    searchField.removeEventListener('input', searchFieldInputHandler);
    searchResults.removeEventListener('click', searchResultsClickHandler);
  }
};

var searchResultsClickHandler = function () {
  if (!header.classList.contains('header--fixed')) {
    searchField.style.width = '';
    mainNav.style.width = mainNavWidth + 'px';
    mainNav.classList.remove('main-nav--closed');
  }

  searchFieldWrapper.classList.remove('search__field-wrapper--input');
  searchField.classList.remove('search__field--input');
  searchField.placeholder = 'Поиск товаров и услуг';

  searchField.removeEventListener('focusout', searchFieldFocusoutHandler);
  searchField.removeEventListener('input', searchFieldInputHandler);
  searchResults.removeEventListener('click', searchResultsClickHandler);
};

var searchFieldInputHandler = function () {
  if (searchField.value.trim()) {
    searchFieldWrapper.classList.add('search__field-wrapper--input');
    searchField.classList.add('search__field--input');
  } else {
    searchFieldWrapper.classList.remove('search__field-wrapper--input');
    searchField.classList.remove('search__field--input');
  }
};

var getSearchInputWidth = function () {
  if (pageYOffset === 0) {
    mainNav.style.transition = '';
    mainNav.style.width = '';
    mainNavWidth = mainNav.getBoundingClientRect().width;
    mainNav.style.width = 0;
    searchField.style.transition = '';
    searchField.style.width = '100%';
    searchFieldWidth = searchField.getBoundingClientRect().width;
    searchField.classList.add('search__field--closed');
    searchField.style.width = '';
    mainNav.style.width = mainNavWidth + 'px';
    mainNav.classList.remove('main-nav--closed');
  } else {
    mainNav.style.width = '';
    searchField.style.width = '';
  }
};

var mainNavLinkTimer;
var isSidebarCatalogHovered = false;

var mainNavLinkCatalogMouseenterHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (evt.relatedTarget) {
      if (evt.relatedTarget.classList.contains('catalog__list') ||
          evt.relatedTarget.classList.contains('catalog__link')) {
        return;
      }
    }

    window.removeEventListener('scroll', windowScrollHandler);

    if (!isSidebarCatalogHovered) {
      offsetTop = pageYOffset;

      if (window.matchMedia('(max-width: 1687px)').matches) {
        header.style.left = '';
        header.style.right = getScrollWidth() + 'px';
      } else {
        var pl = 'calc(50% - 1688px / 2 + 64px + ' + getScrollWidth() / -2 + 'px)';
        var pr = 'calc(50% - 1688px / 2 + 64px + ' + getScrollWidth() / 2 + 'px)';
        header.style.paddingLeft = offsetTop > 65 ? pl : '';
        header.style.paddingRight = offsetTop > 65 ? pr : '';
      }

      document.body.style.top = -offsetTop + 'px';
      document.body.style.width = 'calc(100% - ' + getScrollWidth() + 'px)';
      document.body.classList.add('no-scroll');

      var mainNavLinkCatalogOffsetLeft = mainNavLinkCatalog.getBoundingClientRect().left;

      sidebar.style.left = mainNavLinkCatalogOffsetLeft + 'px';

      isSidebarCatalogHovered = true;
    }

    mainNavOverlay.classList.remove('main-nav__overlay--out');
    mainNavOverlay.classList.add('main-nav__overlay--hover');

    sidebar.classList.remove('sidebar--out');
    sidebar.classList.add('sidebar--hover');

    if (mainNavLinkTimer) {
      clearTimeout(mainNavLinkTimer);
      mainNavLinkTimer = null;
    }

    catalogItems.forEach(function (it) {
      it.addEventListener('mouseenter', catalogItemMouseenterHandler);
      it.addEventListener('mouseleave', catalogItemMouseleaveHandler);
    });

    mainNavOverlay.addEventListener('mouseenter', mainNavOverlayMouseenterHandler);
    sidebar.addEventListener('mouseenter', sidebarMouseenterHandler);
  }
};

var catalogItemMouseenterHandler = function () {
  catalogWrapper.classList.add('catalog__wrapper--hovered');
};

var catalogItemMouseleaveHandler = function () {
  catalogWrapper.classList.remove('catalog__wrapper--hovered');
};

var mainNavOverlayMouseenterHandler = function () {
  mainNavOverlay.classList.add('main-nav__overlay--out');
  sidebar.classList.add('sidebar--out');

  clearTimeout(mainNavLinkTimer);
  mainNavLinkTimer = null;

  mainNavLinkTimer = setTimeout(function () {
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('no-scroll');
    header.style.left = '';
    header.style.right = '';
    header.style.paddingLeft = '';
    header.style.paddingRight = '';

    window.scroll(0, offsetTop);

    var mainNavLinkCatalogOffsetLeft = mainNavLinkCatalog.getBoundingClientRect().left;

    sidebar.style.left = mainNavLinkCatalogOffsetLeft + 'px';

    mainNavLinkCatalog.removeEventListener('mouseenter', mainNavOverlayMouseenterHandler);
    window.addEventListener('scroll', windowScrollHandler);


    isSidebarCatalogHovered = false;

    catalogItems.forEach(function (it) {
      it.removeEventListener('mouseenter', catalogItemMouseenterHandler);
      it.removeEventListener('mouseleave', catalogItemMouseleaveHandler);
    });

    mainNavOverlay.classList.remove('main-nav__overlay--hover');
    sidebar.classList.remove('sidebar--hover');
    sidebar.removeEventListener('mouseenter', sidebarMouseenterHandler);

    clearTimeout(mainNavLinkTimer);
    mainNavLinkTimer = null;
  }, 500);
};

var sidebarMouseenterHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    mainNavOverlay.classList.remove('main-nav__overlay--out');
    mainNavOverlay.classList.add('main-nav__overlay--hover');
    sidebar.classList.remove('sidebar--out');
    sidebar.classList.add('sidebar--hover');

    if (mainNavLinkTimer) {
      clearTimeout(mainNavLinkTimer);
      mainNavLinkTimer = null;
    }

    isSidebarCatalogHovered = true;
  }
};

var mainNavLinkCatalog = mainNav.querySelector('.main-nav__link--catalog');
var mainNavOverlay = mainNav.querySelector('.main-nav__overlay');

mainNavLinkCatalog.addEventListener('mouseenter', mainNavLinkCatalogMouseenterHandler);

var activeCityClickHandler = function () {
  activeCity.addEventListener('click', function () {
    citiesList.classList.toggle('contacts__cities--opened');

    for (var i = 0; i < citiesHeader.length; i++) {
      citiesHeader[i].addEventListener('click', citiesHeaderClickHandler, true);
    }

    document.addEventListener('click', citiesListCloseHandler, true);
  });
};

var citiesHeaderClickHandler = function (evt) {
  activeCity.textContent = evt.target.textContent;
  citiesList.classList.remove('contacts__cities--opened');
  citiesHeader.forEach(function (it) {
    it.removeEventListener('click', citiesHeaderClickHandler, true);
  });
};

var citiesListCloseHandler = function (evt) {
  if (!evt.target.classList.contains('contacts__city')) {
    citiesList.classList.remove('contacts__cities--opened');
    evt.stopPropagation();
  }
  document.removeEventListener('click', citiesListCloseHandler, true);
};

var searchRequestClickHandler = function () {
  modalRequest.classList.remove('modal--closed');

  var modalClose = modalRequest.querySelector('.modal--request  .modal__close');
  modalClose.addEventListener('click', modalCloseClickHandler);

  document.addEventListener('click', modalCloseHandler, true);
  mainNavLinkCatalog.removeEventListener('mouseenter', mainNavLinkCatalogMouseenterHandler);
};

var contactsCallbackClickHandler = function () {
  modalCallback.classList.remove('modal--closed');

  var modalClose = modalCallback.querySelector('.modal--callback  .modal__close');
  modalClose.addEventListener('click', modalCloseClickHandler);

  document.addEventListener('click', modalCloseHandler, true);
  mainNavLinkCatalog.removeEventListener('mouseenter', mainNavLinkCatalogMouseenterHandler);
};

var modalCloseClickHandler = function (evt) {
  evt.preventDefault();
  evt.target.parentElement.classList.add('modal--closed');
  evt.target.removeEventListener('click', modalCloseClickHandler);
  document.removeEventListener('click', modalCloseHandler, true);
  mainNavLinkCatalog.addEventListener('mouseenter', mainNavLinkCatalogMouseenterHandler);
};

var modalCloseHandler = function (evt) {
  var isOnModalClick = getAncestor(evt.target, 'modal');
  if (isOnModalClick) {
    return;
  }

  if (evt.target === searchRequest ||
      evt.target === contactsCallback) {
    evt.stopPropagation();
  }

  modalRequest.classList.add('modal--closed');
  modalCallback.classList.add('modal--closed');
  evt.target.removeEventListener('click', modalCloseClickHandler);
  document.removeEventListener('click', modalCloseHandler, true);
  mainNavLinkCatalog.addEventListener('mouseenter', mainNavLinkCatalogMouseenterHandler);
};

var getAncestor = function (target, className) {
  var element = target;

  while (!element.classList.contains(className)) {
    element = element.parentElement;

    if (!element) {
      return false;
    }
  }

  return true;
};

var offsetTop = 0;

var sidebarCatalogLinkClickHandler = function (evt) {
  evt.preventDefault();

  offsetTop = pageYOffset;

  document.body.style.top = -offsetTop + 'px';
  document.body.classList.add('no-scroll');

  catalog.classList.add('catalog--opened');

  for (var i = 0; i < catalogLinks.length; i++) {
    if (catalogLinks[i].parentElement.childElementCount > 1) {
      catalogLinks[i].addEventListener('click', catalogLinkClickHandler, true);
    }
  }

  catalogButton.addEventListener('click', catalogButtonClickHandler);
};

var targetLink;
var targetCatalogSublist;

var catalogLinkClickHandler = function (evt) {
  evt.preventDefault();

  catalogTitle.classList.add('catalog__title--opened');
  catalogTitle.textContent = evt.currentTarget.firstChild.textContent;

  catalogItems.forEach(function (it) {
    if (it !== evt.currentTarget.parentElement) {
      it.classList.add('catalog__item--closed');
    }
  });

  targetLink = evt.currentTarget;
  targetLink.classList.add('catalog__link--closed');

  targetCatalogSublist = evt.currentTarget.parentElement.querySelector('.catalog__sublist');
  targetCatalogSublist.classList.add('catalog__sublist--opened');

  catalogTitle.addEventListener('click', catalogTitleClickHandler);
};

var catalogTitleClickHandler = function () {
  catalogTitle.classList.remove('catalog__title--opened');
  catalogTitle.textContent = 'Каталог';

  catalogItems.forEach(function (it) {
    it.classList.remove('catalog__item--closed');
  });

  if (targetLink || targetCatalogSublist) {
    targetLink.classList.remove('catalog__link--closed');
    targetCatalogSublist.classList.remove('catalog__sublist--opened');
  }

  catalogTitle.removeEventListener('click', catalogTitleClickHandler);
};

var catalogButtonClickHandler = function () {
  catalog.classList.remove('catalog--opened');
  catalogButton.removeEventListener('click', catalogButtonClickHandler);
  catalogTitle.removeEventListener('click', catalogTitleClickHandler);

  document.body.style.top = '';
  document.body.classList.remove('no-scroll');

  window.scroll(0, offsetTop);

  for (var i = 0; i < catalogLinks.length; i++) {
    if (catalogLinks[i].parentElement.childElementCount > 1) {
      catalogLinks[i].removeEventListener('click', catalogLinkClickHandler, true);
    }
  }

  catalogTitle.classList.remove('catalog__title--opened');
  catalogTitle.textContent = 'Каталог';

  catalogItems.forEach(function (it) {
    it.classList.remove('catalog__item--closed');
  });

  if (targetLink || targetCatalogSublist) {
    targetLink.classList.remove('catalog__link--closed');
    targetCatalogSublist.classList.remove('catalog__sublist--opened');
  }
};

var setCatalogNumbersValue = function () {
  catalogItems.forEach(function (it, i) {
    var sublist = it.querySelector('.catalog__sublist');
    var number = sublist === null ? '' : sublist.childElementCount;

    catalogNumbers[i].textContent = number;
  });
};

var citiesFooterClickHandler = function (city, address) {
  city.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!city.classList.contains('footer__city--active')) {
      citiesFooter.forEach(function (it) {
        it.classList.remove('footer__city--active');
      });
      addressesFooter.forEach(function (it) {
        it.classList.remove('footer__address--active');
      });

      city.classList.add('footer__city--active');
      address.classList.add('footer__address--active');
    }
  });
};

var windowScrollHandler = function () {
  var sidebarHeight = sidebar.getBoundingClientRect().height;

  if (!window.matchMedia('(max-width: 1023px)').matches) {
    searchField.blur();
    searchField.style.transition = 'border-bottom 0.5s cubic-bezier(0.77, 0, 0.175, 1), background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)';

    var mainNavLinkCatalogOffsetLeft = mainNavLinkCatalog.getBoundingClientRect().left;

    sidebar.style.left = mainNavLinkCatalogOffsetLeft + 'px';

    var mainOffsetTop = main.getBoundingClientRect().top;

    if (mainOffsetTop > 115) {
      header.classList.remove('header--fixed');
      main.classList.remove('main--full');

      logoTitle.classList.remove('logo__title--closed');
      mainNavList.classList.remove('main-nav__list--closed');
      siteNav.classList.remove('site-nav--closed');
      contacts.classList.remove('contacts--closed');
      searchField.classList.add('search__field--closed');
    } else {
      header.classList.add('header--fixed');
      main.classList.add('main--full');

      logoTitle.classList.add('logo__title--closed');
      mainNavList.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');
      contacts.classList.add('contacts--closed');
      searchField.classList.remove('search__field--closed');
    }

    getSearchInputWidth();

    sidebarHeight = 0;
  }
  setTimeout(function () {
    var feedbackTop = feedback.offsetTop - innerHeight + sidebarHeight;
    var feedbackBottom = feedbackTop + feedback.getBoundingClientRect().height;

    if (pageYOffset > feedbackTop && pageYOffset < feedbackBottom) {
      if (pageYOffset <= feedbackBottom) {
        var currentPosition = (pageYOffset - feedbackTop) / (feedbackBottom - feedbackTop);
        var colors = [
          [256, 256, 256], // #ffffff
          [251, 192, 45] // #fbc02d
        ];

        var currentColor = [];

        for (var i = 0; i < colors[0].length; i++) {
          // Проверяю, какое значение цвета больше
          if (colors[0][i] < colors[1][i]) {
            // Высчитываю текущее значение цвета
            var val = ((colors[1][i] - colors[0][i]) * currentPosition) + colors[0][i];
            // Устанавливаю текущее значение цвета
            currentColor[i] = Math.round(val);
          } else {
            // Высчитываю текущее значение цвета
            val = colors[0][i] - ((colors[0][i] - colors[1][i]) * currentPosition);
            // Устанавливаю текущее значение цвета
            currentColor[i] = Math.round(val);
          }
        }

        feedback.style['background-color'] = 'rgb(' + currentColor.join(',') + ')';
      } else if (pageYOffset >= feedbackBottom) {
        // currentPosition = (pageYOffset - feedbackBottom) / (feedbackOffsetBottom - feedbackBottom);
        // colors = [
        //   [251, 192, 45], // #fbc02d
        //   [21, 38, 46] // #15262e
        // ];

        // currentColor = [];

        // for (i = 0; i < colors[0].length; i++) {
        //   // Проверяю, какое значение цвета больше
        //   if (colors[0][i] < colors[1][i]) {
        //     // Высчитываю текущее значение цвета
        //     val = ((colors[1][i] - colors[0][i]) * currentPosition) + colors[0][i];
        //     // Устанавливаю текущее значение цвета
        //     currentColor[i] = Math.round(val);
        //   } else {
        //     // Высчитываю текущее значение цвета
        //     val = colors[0][i] - ((colors[0][i] - colors[1][i]) * currentPosition);
        //     // Устанавливаю текущее значение цвета
        //     currentColor[i] = Math.round(val);
        //   }
        // }

        // feedback.style['background-color'] = 'rgb(' + currentColor.join(',') + ')';
      } else {
        feedback.style['background-color'] = 'rgb(251, 192, 45)';
      }
    } else if (pageYOffset < feedbackTop) {
      feedback.style['background-color'] = 'rgb(255, 255, 255)';
    } else if (pageYOffset > feedbackBottom) {
      feedback.style['background-color'] = 'rgb(251, 192, 45)';
    }
  }, 100);
};

var windowResizeHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    document.body.classList.remove('dark');
    document.body.style.overflow = '';
    document.body.style.width = '';
    header.style.zIndex = '';
    header.style.right = '';
    setTimeout(function () {
      header.style.transition = '';
    }, 500);

    logoTitle.classList.remove('logo__title--closed');
    searchField.placeholder = 'Поиск';

    if (navButton.classList.contains('main-nav__toggle--opened') && logo.classList.contains('logo--opened')) {
      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');
    }

    if (mainNavList.classList.contains('main-nav__list--fixed')) {
      mainNavList.classList.remove('main-nav__list--fixed');
      mainNavList.classList.add('main-nav__list--closed');
      navButton.classList.add('main-nav__toggle--closed');
      siteNav.classList.add('site-nav--closed');
      search.classList.add('search--closed');
    } else if (navButton.classList.contains('main-nav__toggle--closed')) {
      mainNavList.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');
      search.classList.add('search--closed');
    }

    sidebarCatalogLink.addEventListener('click', sidebarCatalogLinkClickHandler);
    catalog.classList.remove('catalog--opened');
    catalogHeader.classList.remove('catalog__header--opened');
    catalogButton.removeEventListener('click', catalogButtonClickHandler);
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogTitleClickHandler();

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  } else {
    windowScrollHandler();

    document.body.classList.remove('no-scroll');
    document.body.classList.remove('dark');
    document.body.style.overflow = '';
    document.body.style.width = '';
    header.style.zIndex = '';
    header.style.right = '';
    setTimeout(function () {
      header.style.transition = '';
    }, 500);

    header.classList.remove('header--fixed');
    main.classList.remove('main--full');

    logo.classList.remove('logo--closed');
    logo.classList.add('logo--opened');
    logoTitle.classList.remove('logo__title--closed');

    navButton.classList.remove('main-nav__toggle--opened');
    navButton.classList.add('main-nav__toggle--closed');

    mainNavList.classList.remove('main-nav__list--closed');
    siteNav.classList.remove('site-nav--closed');

    search.classList.add('search--closed');
    searchField.placeholder = 'Поиск товаров и услуг';

    contacts.classList.remove('contacts--closed');

    searchField.addEventListener('focusin', searchFieldFocusinHandler);

    sidebar.classList.remove('sidebar--closed');
    sidebarCatalogLink.removeEventListener('click', sidebarCatalogLinkClickHandler);
    catalog.classList.remove('catalog--opened');
    catalogHeader.classList.remove('catalog__header--opened');
    catalogButton.removeEventListener('click', catalogButtonClickHandler);
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogTitleClickHandler();

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', windowScrollHandler);
  window.addEventListener('resize', windowResizeHandler);

  windowResizeHandler();
  activeCityClickHandler();

  navButton.addEventListener('click', navButtonClickHandler);

  contactsCallback.addEventListener('click', contactsCallbackClickHandler);
  searchRequest.addEventListener('click', searchRequestClickHandler);

  for (var i = 0; i < citiesFooter.length; i++) {
    citiesFooterClickHandler(citiesFooter[i], addressesFooter[i]);
  }

  setCatalogNumbersValue();
});

$(document).ready(function () {

  $(window).on('load resize', function () {

  });
});
