'use strict';

// Функция для выбора элемента DOM
var qs = function (selector) {
  return document.querySelector(selector);
};

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

var WIZARDS_COATS = ['rgb(101, 137, 164)',
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

var wizards = [];

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

qs('.setup').classList.remove('hidden');

// Функция рэндомайзер

var randomizer = function (max) {
  return Math.floor(Math.random() * max);
};

// Функция создания параметров волшебника
var wizardDataGenerator = function (names, coats, eyes) {
  var wizard = {};
  wizard.name = names[randomizer(names.length)].name + ' ' + names[randomizer(names.length)].surname;
  wizard.coatColor = coats[randomizer(coats.length)];
  wizard.eyesColor = eyes[randomizer(eyes.length)];
  return wizard;
};

// Создание коллекции из 4 волшебников
for (var i = 0; i < 4; i++) {
  wizards.push(wizardDataGenerator(WIZARDS_NAME, WIZARDS_COATS, WIZARDS_EYES));
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  fragment.appendChild(wizardElement);
}

qs('.setup-similar-list').appendChild(fragment);
qs('.setup-similar').classList.remove('hidden');
