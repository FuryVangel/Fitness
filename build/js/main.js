'use strict';

// Табы
var jsTriggers = document.querySelectorAll('.js-tab-trigger');

jsTriggers.forEach(function (trigger) {
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
});

// Скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// // Валидация для телефона
// IMask(document.querySelector('#phone'), {
//   mask: '+{7}(000)000-00-00'
// });
