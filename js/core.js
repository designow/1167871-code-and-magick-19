'use strict';
(function () {
  // Функция для выбора элемента DOM
  var getSelector = function (selector) {
    return document.querySelector(selector);
  };

  // Функция рэндомайзер
  var getRandom = function (max) {
    return Math.floor(Math.random() * max);
  };

  window.core = {
    getSelector: getSelector,
    getRandom: getRandom
  };

})();
