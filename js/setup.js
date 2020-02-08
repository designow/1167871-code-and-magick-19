'use strict';

(function () {

  // Константы характеристик волшебников
  var WIZARDS_NAME = [{
    name: 'Иван',
    surname: 'да Марья'
  },
  {
    name: 'Хуан Себастьян',
    surname: 'Верон'
  },
  {
    name: 'Мария',
    surname: 'Мирабелла'
  },
  {
    name: 'Кристоф',
    surname: 'Вальц'
  },
  {
    name: 'Виктор',
    surname: 'Онопко'
  },
  {
    name: 'Юлия',
    surname: 'Топольницкая'
  },
  {
    name: 'Люпита',
    surname: 'Нионго'
  }, {
    name: 'Вашингтон',
    surname: 'Ирвинг'
  }
  ];

  var WIZARDS_COATS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var WIZARDS_EYES = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var WIZARDS_FIREBALLS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var WIZARDS_COUNT = 4;

  window.setup = {
    WIZARDS_FIREBALLS: WIZARDS_FIREBALLS,
    WIZARDS_COATS: WIZARDS_COATS,
    WIZARDS_EYES: WIZARDS_EYES
  };

  // Функция создания параметров волшебника
  var wizardDataGenerator = function (names, coats, eyes) {
    var wizard = {};
    wizard.name = names[window.core.getRandom(names.length)].name + ' ' + names[window.core.getRandom(names.length)].surname;
    wizard.coatColor = coats[window.core.getRandom(coats.length)];
    wizard.eyesColor = eyes[window.core.getRandom(eyes.length)];
    return wizard;
  };

  // Функция создания коллекции волшебников
  var createCollection = function (count) {
    var fragment = document.createDocumentFragment();
    var wizards = [];
    var similarWizardTemplate = window.core.getSelector('#similar-wizard-template').content;
    for (var i = 0; i < count; i++) {
      wizards.push(wizardDataGenerator(WIZARDS_NAME, WIZARDS_COATS, WIZARDS_EYES));
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
      fragment.appendChild(wizardElement);
    }
    return fragment;
  };

  // Создаем 4х волшебников
  window.core.getSelector('.setup-similar-list').appendChild(createCollection(WIZARDS_COUNT));
  window.core.getSelector('.setup-similar').classList.remove('hidden');
})();
