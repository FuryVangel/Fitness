/* eslint-disable new-cap */
'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var coachesButtonPrev = document.querySelector('.coaches-slider__button--prev');
  var coachesButtonNext = document.querySelector('.coaches-slider__button--next');
  var commentButtonPrev = document.querySelector('.comment-slider__button--prev');
  var commentButtonNext = document.querySelector('.comment-slider__button--next');
  var coachesList = document.querySelectorAll('.coaches-slider__item');
  var commentsList = document.querySelectorAll('.comment-slider__item');
  var switchesTab = document.querySelector('.gym-memberships__tab-header');
  var switchesTabItems = Array.from(switchesTab.children);
  var tabButtons = document.querySelectorAll('.tab-header__button');
  var tabContent = document.querySelectorAll('.gym-memberships__tab-content');

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

  // Табы
  switchesTab.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('tab-header__button')) {
      tabContent.forEach(function (item) {
        if (!item.classList.contains('hidden')) {
          item.classList.add('hidden');
        }
      });
      tabButtons.forEach(function (item) {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });

      var indexTarget = switchesTabItems.indexOf(target.parentElement);
      tabContent[indexTarget].classList.remove('hidden');
      target.classList.add('active');
    }
  });

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
  // eslint-disable-next-line no-undef
  IMask(document.querySelector('#phone'), {
    mask: '+{7}(000)000-00-00'
  });

  // Слайдер
  var slideImg = function (slider, direction) {
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
    slideImg(comments, 'prev');
  });

  commentButtonNext.addEventListener('click', function () {
    slideImg(comments, 'next');
  });

  coachesButtonPrev.addEventListener('click', function () {
    slideImg(coaches, 'prev');
  });

  coachesButtonNext.addEventListener('click', function () {
    slideImg(coaches, 'next');
  });
});
