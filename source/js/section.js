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
var productsButton = main.querySelector('.products__button');
var productsItems = main.querySelector('.products__items');
var filter = main.querySelector('.filter');
var filterButton = filter.querySelector('.filter__toggle');
var filterHeadings = filter.querySelectorAll('.filter__heading');
var filterBlocks = filter.querySelectorAll('.filter__block');
var filterCaptions = filter.querySelectorAll('.filter__caption');
var filterSelects = filter.querySelectorAll('.filter__select');
var filterButtonsView = filter.querySelectorAll('.filter__view  .filter__button');
var filterButtonsSort = filter.querySelectorAll('.filter__sort  .filter__button');
var filterElements = filter.querySelectorAll('.filter__element');
var filterLinksMore = filter.querySelectorAll('.filter__more');
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
var recentlyViewed = main.querySelector('.recently-viewed');
var recentlyViewedProducts = recentlyViewed.querySelector('.recently-viewed__products');
var recentlyViewedItems = recentlyViewed.querySelectorAll('.recently-viewed  .item');
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

var productsButtonClickHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    document.body.classList.add('no-scroll');
    filter.classList.add('filter--opened');

    sidebar.classList.add('sidebar--closed');

    filterButton.addEventListener('click', filterButtonClickHandler);
  }
};

var filterButtonClickHandler = function () {
  document.body.classList.remove('no-scroll');
  filter.classList.remove('filter--opened');

  sidebar.classList.remove('sidebar--closed');

  filterButton.removeEventListener('click', filterButtonClickHandler);
};

var blockHeights = [];
var blockFullHeights = [];
var filterElementsHeights = [];

var getFilterElementsHeight = function (block) {
  var element = block.querySelector('.filter__elements');
  var link = block.querySelector('.filter__more');

  element.style.transition = 'none';
  element.style.maxHeight = 'none';
  filterElementsHeights.push(element.getBoundingClientRect().height);
  if (element.getBoundingClientRect().height < 240) {
    link.style.display = 'none';
  } else {
    link.style.display = '';
    link.textContent = 'Показать все';
  }
  blockFullHeights.push(block.getBoundingClientRect().height);
  element.style.maxHeight = '';
  element.style.transition = '';
};

var getFilterBlockHeight = function () {
  filter.classList.add('filter--opened');

  if (window.matchMedia('(max-width: 1023px)').matches) {
    var headings = filter.querySelectorAll('.filter__heading');
    var blocks = filter.querySelectorAll('.filter__block');
  } else {
    headings = filter.querySelectorAll('.filter__main  .filter__heading');
    blocks = filter.querySelectorAll('.filter__main  .filter__block');
  }

  filterHeadings.forEach(function (it) {
    it.style.height = '';
    it.removeEventListener('click', filterHeadingsClickHandler);
  });

  filterBlocks.forEach(function (it) {
    it.style.height = '';
  });

  for (var i = 0; i < headings.length; i++) {
    headings[i].classList.remove('filter__heading--opened');

    blocks[i].style.transition = 'none';
    blocks[i].style.height = '';
    blocks[i].classList.add('filter__block--opened');
    if (blocks[i].classList.contains('filter__block--elements')) {
      getFilterElementsHeight(blocks[i]);
    }
    blockHeights[i] = blocks[i].getBoundingClientRect().height;
    blocks[i].classList.remove('filter__block--opened');
    blocks[i].style.transition = '';

    headings[i].addEventListener('click', filterHeadingsClickHandler);
  }

  headings[0].classList.add('filter__heading--opened');
  blocks[0].style.transition = 'none';
  blocks[0].classList.add('filter__block--opened');
  blocks[0].style.height = blockHeights[0] + 'px';
  blocks[0].style.transition = '';

  var headingBrands = filter.querySelector('.filter__heading--brands');
  var blockBrands = filter.querySelector('.filter__block--brands');
  var brandsNumber;
  blocks.forEach(function (it, number) {
    if (it === blockBrands) {
      brandsNumber = number;
    }
  });
  headingBrands.classList.add('filter__heading--opened');
  blockBrands.style.transition = 'none';
  blockBrands.classList.add('filter__block--opened');
  blockBrands.style.height = blockHeights[brandsNumber] + 'px';
  blockBrands.style.transition = '';

  var filterMain = filter.querySelector('.filter__main');
  var selects = filterMain.querySelectorAll('.filter__select--inner');
  var checkboxes = filterMain.querySelectorAll('.filter__checkboxes');

  checkboxes.forEach(function (it, j) {
    if (!window.matchMedia('(max-width: 1023px)').matches) {
      filter.classList.remove('filter--opened');
    }

    filterMain.style.transition = 'none';

    var filterMainOffsetBottom = filterMain.getBoundingClientRect().bottom;

    filterMain.style.transition = '';

    it.style.transition = 'none';
    it.classList.remove('filter__checkboxes--top');
    selects[j].classList.add('filter__select--opened');
    var filterCheckboxesOffsetBottom = it.getBoundingClientRect().bottom;
    selects[j].classList.remove('filter__select--opened');
    it.style.transition = '';

    if (filterCheckboxesOffsetBottom > filterMainOffsetBottom) {
      it.classList.add('filter__checkboxes--top');
    } else {
      it.classList.remove('filter__checkboxes--top');
    }
  });

  filter.classList.remove('filter--opened');
};

var filterHeadingsClickHandler = function (evt) {
  var heading = evt.target;
  var block = evt.target.nextElementSibling;
  var element = block.querySelector('.filter__elements');
  var link = block.querySelector('.filter__more');
  var elements = filter.querySelectorAll('.filter__elements');
  var links = filter.querySelectorAll('.filter__more');

  var number;

  if (window.matchMedia('(max-width: 1023px)').matches) {
    var headings = filter.querySelectorAll('.filter__heading');
    var blocks = filter.querySelectorAll('.filter__block');
  } else {
    headings = filter.querySelectorAll('.filter__main  .filter__heading');
    blocks = filter.querySelectorAll('.filter__main  .filter__block');
  }

  headings.forEach(function (it, i) {
    if (it === heading) {
      number = i;
    }
  });

  if (block.classList.contains('filter__block--opened')) {
    heading.classList.remove('filter__heading--opened');
    block.classList.remove('filter__block--opened');
    block.style.height = 0;
  } else {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      headings.forEach(function (it) {
        it.classList.remove('filter__heading--opened');
      });
      blocks.forEach(function (it) {
        it.classList.remove('filter__block--opened');
        it.style.height = 0;
      });
    }

    heading.classList.add('filter__heading--opened');
    block.classList.add('filter__block--opened');
    block.style.height = blockHeights[number] + 'px';
  }

  if (window.matchMedia('(max-width: 1023px)').matches) {
    links.forEach(function (it) {
      it.textContent = 'Показать все';
    });

    elements.forEach(function (it) {
      it.style.maxHeight = '';
      it.classList.remove('filter__elements--full');
    });
  } else {
    if (element) {
      link.textContent = 'Показать все';
      element.style.maxHeight = '';
      element.classList.remove('filter__elements--full');
    }
  }
};

var filterCapionsClickHandler = function (caption, select) {
  caption.addEventListener('click', function (evt) {
    if (select.classList.contains('filter__select--opened')) {
      select.classList.remove('filter__select--opened');
      document.removeEventListener('click', filterSelectsCloseHandler);
    } else {
      filterSelects.forEach(function (it) {
        it.classList.remove('filter__select--opened');
      });

      select.classList.add('filter__select--opened');

      document.addEventListener('click', filterSelectsCloseHandler);

      var dropDownItems = evt.target.parentElement.querySelectorAll('.filter__drop-down  .filter__label');
      dropDownItems.forEach(function (it) {
        it.addEventListener('click', dropDownItemClickHandler);
      });
    }
  });
};

var filterSelectsCloseHandler = function (evt) {
  if (!evt.target.classList.contains('filter__caption') &&
      !evt.target.classList.contains('filter__label') &&
      !evt.target.classList.contains('filter__checkbox')) {
    var openedSelect = main.querySelector('.filter__select--opened');
    openedSelect.classList.remove('filter__select--opened');
    document.removeEventListener('click', filterSelectsCloseHandler);
  }
};

var dropDownItemClickHandler = function (evt) {
  evt.preventDefault();
  var dropDownList = evt.target.parentElement.parentElement;
  var dropDownItems = dropDownList.querySelectorAll('.filter__drop-down  .filter__label');
  dropDownItems.forEach(function (it) {
    it.removeEventListener('click', dropDownItemClickHandler);
  });
  var select = filter.querySelector('.filter__select--opened');
  var choice = select.querySelector('.filter__choice');

  select.classList.remove('filter__select--opened');
  choice.textContent = evt.target.textContent;

  document.removeEventListener('click', filterSelectsCloseHandler);
};

var filterButtonViewClickHandler = function (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('filter__button--active')) {
      filterButtonsView.forEach(function (it) {
        it.classList.remove('filter__button--active');
      });
      evt.target.classList.add('filter__button--active');
    }
    if (button.classList.contains('filter__button--grid')) {
      productsItems.classList.add('products__items--grid');
      productsItems.classList.remove('products__items--row');
    } else if (button.classList.contains('filter__button--row')) {
      productsItems.classList.remove('products__items--grid');
      productsItems.classList.add('products__items--row');
    }
  });
};

var filterButtonSortClickHandler = function (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('filter__button--active')) {
      filterButtonsSort.forEach(function (it) {
        it.classList.remove('filter__button--active');
      });
      evt.target.classList.add('filter__button--active');
    }
  });
};

var filterElementClickHandler = function (element) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    element.classList.toggle('filter__element--selected');
  });
};

var filterLinkMoreClickHandler = function (link) {
  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (window.matchMedia('(max-width: 1023px)').matches) {
      var blocks = filter.querySelectorAll('.filter__block');
    } else {
      blocks = filter.querySelectorAll('.filter__main  .filter__block');
    }

    var block = evt.target.parentElement;
    var element = evt.target.previousElementSibling;
    var elements = filter.querySelectorAll('.filter__elements');
    var blockNumber;
    var elementNumber;

    blocks.forEach(function (it, i) {
      if (it === block) {
        blockNumber = i;
      }
    });

    elements.forEach(function (it, i) {
      if (it === element) {
        elementNumber = i;
      }
    });

    if (element.classList.contains('filter__elements--full')) {
      link.textContent = 'Показать все';
      block.style.height = blockHeights[blockNumber] + 'px';
      element.style.maxHeight = '';
      element.classList.remove('filter__elements--full');
    } else {
      link.textContent = 'Скрыть';
      block.style.height = blockFullHeights[elementNumber] + 'px';
      element.style.maxHeight = filterElementsHeights[elementNumber] + 'px';
      element.classList.add('filter__elements--full');
    }
  });
};

var filterBlockChoice = filter.querySelector('.filter__block--choice');
var filterSlider = filter.querySelector('.filter__slider');

var filterBlockChoiceWidth = filterBlockChoice.getBoundingClientRect().width;
var filterSliderWidth = filterSlider.getBoundingClientRect().width;

var filterBlockChoiceRight = filterBlockChoice.getBoundingClientRect().right;
var filterSliderRight = filterSlider.getBoundingClientRect().right;

var animateFilterSlider = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (filterSliderRight > filterBlockChoiceRight) {
      filterSlider.addEventListener('click', filterSliderClickHandler);
      filterSlider.addEventListener('mousedown', filterSliderMousedownHandler);
      filterSlider.addEventListener('wheel', filterSliderWheelHandler);
    }
  }
};

var isClick = true;

var filterSliderClickHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (!isClick) {
      evt.preventDefault();
    }
  }
};

var x = 0;

var filterSliderMousedownHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    filterBlockChoiceWidth = filterBlockChoice.getBoundingClientRect().width;
    filterSliderWidth = filterSlider.getBoundingClientRect().width;

    filterSlider.style.transition = 'none';

    var startCoords = {
      x: evt.clientX
    };

    isClick = true;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      filterSliderRight = filterSlider.getBoundingClientRect().right;
      filterBlockChoiceRight = filterBlockChoice.getBoundingClientRect().right;

      if (x > 0) {
        x -= (startCoords.x - moveEvt.x) * 0.3;
      } else if (filterSliderRight < filterBlockChoiceRight) {
        x -= (startCoords.x - moveEvt.x) * 0.3;
        filter.classList.add('filter--full');
      } else {
        x -= startCoords.x - moveEvt.x;
        filter.classList.remove('filter--full');
      }

      filterSlider.style.transform = 'translateX(' + x + 'px)';

      startCoords = {
        x: moveEvt.clientX
      };
    };

    isClick = false;

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (x > 0) {
        x = 0;
      } else if (filterSliderRight < filterBlockChoiceRight) {
        x = -filterSliderWidth + filterBlockChoiceWidth;
      }

      filterSlider.style.transition = 'all 0.2s cubic-bezier(0.77, 0, 0.175, 1)';
      filterSlider.style.transform = 'translateX(' + x + 'px)';

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler, true);
    };

    filterSlider.addEventListener('click', filterSliderClickHandler);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, true);
  }
};

var filterSliderWheelHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    filterBlockChoiceWidth = filterBlockChoice.getBoundingClientRect().width;
    filterSliderWidth = filterSlider.getBoundingClientRect().width;

    filterSliderRight = filterSlider.getBoundingClientRect().right;
    filterBlockChoiceRight = filter.getBoundingClientRect().right;

    if (evt.deltaY < 0) {
      x -= 40;
    } else {
      x += 40;
    }

    if (x > 0) {
      x = 0;
    } else if (x <= -filterSliderWidth + filterBlockChoiceWidth) {
      x = -filterSliderWidth + filterBlockChoiceWidth;
      filter.classList.add('filter--full');
    } else {
      filter.classList.remove('filter--full');
    }


    filterSlider.style.transition = 'none';
    filterSlider.style.transform = 'translateX(' + x + 'px)';
  }
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

var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var coord = 0;

var isMoved = false;

var recentlyViewedItemClickHandler = function (evt) {
  if (!isClick) {
    evt.preventDefault();
  }
};

var recentlyViewedProductsMouseDownHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    var recentlyViewedWidth = recentlyViewed.getBoundingClientRect().width;
    var recentlyViewedProductsWidth = recentlyViewedProducts.getBoundingClientRect().width;

    recentlyViewedProducts.style.transition = '';

    var startCoords = {
      x: evt.clientX
    };

    isClick = true;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      if (coord > 0) {
        coord -= (startCoords.x - moveEvt.x) * 0.3;
      } else if (coord < -recentlyViewedProductsWidth + recentlyViewedWidth - 50) {
        coord -= (startCoords.x - moveEvt.x) * 0.3;
      } else {
        coord -= startCoords.x - moveEvt.x;
      }

      recentlyViewedProducts.style.transform = 'translateX(' + coord + 'px)';

      startCoords = {
        x: moveEvt.clientX
      };

      isMoved = true;
      isClick = false;
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (isMoved) {
        isMoved = false;
      }

      if (coord > 0) {
        coord = 0;
      } else if (coord < -recentlyViewedProductsWidth + recentlyViewedWidth) {
        coord = -recentlyViewedProductsWidth + recentlyViewedWidth;
      }

      recentlyViewedProducts.style.transition = 'all 0.2s cubic-bezier(0.77, 0, 0.175, 1)';
      recentlyViewedProducts.style.transform = 'translateX(' + coord + 'px)';

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    for (var i = 0; i < recentlyViewedItems.length; i++) {
      recentlyViewedItems[i].addEventListener('click', recentlyViewedItemClickHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }
};

var recentlyViewedProductsWheelHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    var recentlyViewedProductsWidth = recentlyViewedProducts.getBoundingClientRect().width;
    var recentlyViewedWidth = recentlyViewed.getBoundingClientRect().width;

    if (evt.deltaY < 0) {
      coord -= 40;
    } else {
      coord += 40;
    }

    if (coord > 0) {
      coord = 0;
    } else if (coord <= -recentlyViewedProductsWidth + recentlyViewedWidth) {
      coord = -recentlyViewedProductsWidth + recentlyViewedWidth;
    }

    recentlyViewedProducts.style.transition = '';
    recentlyViewedProducts.style.transform = 'translateX(' + coord + 'px)';
  }
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
  }
};

var filterBlockTimer;

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

    filterButtonClickHandler();

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

    setTimeout(function () {
      $('.recently-viewed__products.slick-initialized').not('.recently-viewed__products--copy').slick('unslick');
    }, 50);
  }

  if (filterBlockTimer) {
    clearTimeout(filterBlockTimer);
    filterBlockTimer = null;
  }

  filterBlockTimer = setTimeout(function () {
    blockHeights = [];
    blockFullHeights = [];
    filterElementsHeights = [];

    getFilterBlockHeight();
  }, 500);

  document.removeEventListener('click', filterSelectsCloseHandler);
};

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', windowScrollHandler);
  window.addEventListener('resize', windowResizeHandler);

  windowResizeHandler();
  activeCityClickHandler();

  navButton.addEventListener('click', navButtonClickHandler);

  contactsCallback.addEventListener('click', contactsCallbackClickHandler);
  searchRequest.addEventListener('click', searchRequestClickHandler);

  animateFilterSlider();

  for (var i = 0; i < filterCaptions.length; i++) {
    filterCapionsClickHandler(filterCaptions[i], filterSelects[i]);
  }

  for (i = 0; i < filterButtonsView.length; i++) {
    filterButtonViewClickHandler(filterButtonsView[i]);
  }

  for (i = 0; i < filterButtonsView.length; i++) {
    filterButtonSortClickHandler(filterButtonsSort[i]);
  }

  for (i = 0; i < filterElements.length; i++) {
    filterElementClickHandler(filterElements[i]);
  }

  for (i = 0; i < filterLinksMore.length; i++) {
    filterLinkMoreClickHandler(filterLinksMore[i]);
  }

  for (i = 0; i < citiesFooter.length; i++) {
    citiesFooterClickHandler(citiesFooter[i], addressesFooter[i]);
  }

  productsButton.addEventListener('click', productsButtonClickHandler);

  setCatalogNumbersValue();

  recentlyViewedProducts.addEventListener('mousedown', recentlyViewedProductsMouseDownHandler);
  recentlyViewedProducts.addEventListener('wheel', recentlyViewedProductsWheelHandler);
});

$(document).ready(function () {
  $(window).on('load resize', function () {
    if (innerWidth >= 1024) {
      $('.recently-viewed__products.slick-initialized').slick('slickUnfilter');
      $('.recently-viewed__products.slick-initialized').slick('unslick');
    } else {
      if (!document.querySelector('.recently-viewed__products').classList.contains('slick-initialized')) {
        $('.recently-viewed__products').not('.recently-viewed__products--copy').slick({
          dots: true,
          arrows: true,
          infinite: true,
          appendArrows: $('.controls'),
          prevArrow: $('.recently-viewed  .controls__button--previous'),
          nextArrow: $('.recently-viewed  .controls__button--next'),
        });
      }
    }
  });

  var filterRange = $('.filter__range');
  filterRange.slider({
    range: true,
    min: 9000,
    max: 90000,
    step: 1000,
    values: [20000, 80000],
    slide: function (event, ui) {
      var min = filterRange.slider('option', 'min');
      var max = filterRange.slider('option', 'max');
      var step = filterRange.slider('option', 'step');
      var minValue = $('.filter__block--opened  .filter__value--min');
      var maxValue = $('.filter__block--opened  .filter__value--max');
      var minInput = $('.filter__block--opened  .filter__cost--min');
      var maxInput = $('.filter__block--opened  .filter__cost--max');

      minValue.text(Math.floor(ui.values[0] / step) + 'K');
      minValue.css({left: ((ui.values[0] - min) / (max - min) * 100 - 1) + '%'});
      minInput[0].value = ui.values[0];

      maxValue.text(Math.floor(ui.values[1] / step) + 'K');
      maxValue.css({left: ((ui.values[1] - min) / (max - min) * 100 - 1) + '%'});
      maxInput[0].value = ui.values[1];
    }
  });

  var min = filterRange.slider('option', 'min');
  var max = filterRange.slider('option', 'max');
  var step = filterRange.slider('option', 'step');
  var values = filterRange.slider('option', 'values');
  var minValue = $('.filter__value--min');
  var maxValue = $('.filter__value--max');


  minValue.text(Math.floor(values[0] / step) + 'K');
  minValue.css({left: ((values[0] - min) / (max - min) * 100 - 1) + '%'});

  maxValue.text(Math.floor(values[1] / step) + 'K');
  maxValue.css({left: ((values[1] - min) / (max - min) * 100 - 1) + '%'});
});
