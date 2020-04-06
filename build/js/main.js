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

