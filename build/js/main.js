'use strict';

// Табы
var jsTriggers = document.querySelectorAll('.js-tab-trigger');

var tabTrigger = function (trigger) {
  trigger.addEventListener('click', function () {
    var id = this.getAttribute('data-tab');
    var content = document.querySelector('.js-tab-content[data-tab="' + id + '"]');
    var activeTrigger = document.querySelector('.js-tab-trigger.active');
    var activeContent = document.querySelector('.js-tab-content.active');

    activeTrigger.classList.remove('active');
    trigger.classList.add('active');

    activeContent.classList.remove('active');
    content.classList.add('active');
  });
};

for (var i = 0; i < jsTriggers.length; i++) {
  tabTrigger(jsTriggers[i]);
}

// Скролл
var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
var animationTime = 400;
var framesCount = 20;

var anchorTrigger = function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    var coordY = document.querySelector(anchor.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    var scroller = setInterval(function () {
      var scrollBy = coordY / framesCount;

      if (window.pageYOffset < coordY) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  });
};

for (var j = 0; j < anchors.length; j++) {
  anchorTrigger(anchors[j]);
}

// Валидация для телефона
IMask(document.querySelector('#phone'), {
  mask: '+{7}(000)000-00-00'
});

// Слайдер
var coachesButtonPrev = document.querySelector('.coaches-slider__button--prev');
var coachesButtonNext = document.querySelector('.coaches-slider__button--next');
var commentButtonPrev = document.querySelector('.comment-slider__button--prev');
var commentButtonNext = document.querySelector('.comment-slider__button--next');
var coachesList = document.querySelectorAll('.coaches-slider__item');
var commentsList = document.querySelectorAll('.comment-slider__item');

var coaches = {
  slider: document.querySelector('.coaches-slider__list'),
  position: 0,
  cards: coachesList,
  cardWidth: coachesList[0].clientWidth,
  breakpoints: {
    320: 1,
    768: 2,
    1200: 4,
  },
};

var comments = {
  slider: document.querySelector('.comment-slider__list'),
  position: 0,
  cards: commentsList,
  cardWidth: commentsList[0].clientWidth,
  breakpoints: {
    320: 1,
    768: 1,
    1200: 1,
  },
};

var slider = function (slider, direction) {
  var visibleCount = 1;
  var cardWidth = slider.cardWidth;

  var width = document.documentElement.clientWidth;

  if (width >= 320 && width < 768) {
    visibleCount = slider.breakpoints[320];
  }

  if (width >= 768 && width < 1200) {
    visibleCount = slider.breakpoints[768];
    cardWidth += 25;
  }

  if (width >= 1200) {
    visibleCount = slider.breakpoints[1200];
    cardWidth += 30;
  }

  if (direction === 'prev') {
    slider.position += cardWidth * visibleCount;
    slider.position = Math.min(slider.position, 0);
  } else {
    slider.position -= cardWidth * visibleCount;
    slider.position = Math.max(slider.position, -cardWidth * (slider.cards.length - visibleCount));
  }
  slider.slider.style.marginLeft = slider.position + 'px';
};

commentButtonPrev.addEventListener('click', function () {
  slider(comments, 'prev');
});

commentButtonNext.addEventListener('click', function () {
  slider(comments, 'next');
});

coachesButtonPrev.addEventListener('click', function () {
  slider(coaches, 'prev');
});

coachesButtonNext.addEventListener('click', function () {
  slider(coaches, 'next');
});

