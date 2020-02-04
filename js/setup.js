'use strict';

// Функция для выбора элемента DOM
var getSelector = function (selector) {
  return document.querySelector(selector);
};

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

// Функция рэндомайзер
var getRandom = function (max) {
  return Math.floor(Math.random() * max);
};

// Функция создания параметров волшебника
var wizardDataGenerator = function (names, coats, eyes) {
  var wizard = {};
  wizard.name = names[getRandom(names.length)].name + ' ' + names[getRandom(names.length)].surname;
  wizard.coatColor = coats[getRandom(coats.length)];
  wizard.eyesColor = eyes[getRandom(eyes.length)];
  return wizard;
};

// Функция создания коллекции волшебников
var createCollection = function (count) {
  var fragment = document.createDocumentFragment();
  var wizards = [];
  var similarWizardTemplate = getSelector('#similar-wizard-template').content;
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
getSelector('.setup-similar-list').appendChild(createCollection(WIZARDS_COUNT));
// getSelector('.setup-similar').classList.remove('hidden');

var wizardCoat = getSelector('.setup-wizard .wizard-coat');
var wizardEyes = getSelector('.setup-wizard .wizard-eyes');
var wizardFireball = getSelector('.setup-fireball-wrap');

// Открытие и закрытие формы

var onPopupEscHandler = function (evt) {
  if (evt.key === ESC_KEY && evt.target.classList.value !== 'setup-user-name') {
    closePopup();
  }
};

var onPopupCloseHandler = function (evt) {
  if (evt.type === 'keydown' && evt.key === ENTER_KEY || evt.type === 'click') {
    closePopup();
  }
};

var CoatChangeHandler = function () {
  changeWizardColor(wizardCoat, 'fill', WIZARDS_COATS, 'coat-color');
};

var EyesChangeHandler = function () {
  changeWizardColor(wizardEyes, 'fill', WIZARDS_EYES, 'eyes-color');
};

var FireballChangeHandler = function () {
  changeWizardColor(wizardFireball, 'background', WIZARDS_FIREBALLS, 'fireball-color');
};

var openPopup = function () {

  getSelector('.setup').classList.remove('hidden');
  getSelector('.setup-close').addEventListener('click', onPopupCloseHandler);
  getSelector('.setup-close').addEventListener('keydown', onPopupCloseHandler);
  document.addEventListener('keydown', onPopupEscHandler);
  wizardCoat.addEventListener('click', CoatChangeHandler);
  wizardEyes.addEventListener('click', EyesChangeHandler);
  wizardFireball.addEventListener('click', FireballChangeHandler);
};

var closePopup = function () {
  getSelector('.setup').classList.add('hidden');
  getSelector('.setup-close').removeEventListener('keydown', onPopupCloseHandler);
  getSelector('.setup-close').removeEventListener('click', onPopupCloseHandler);
  document.removeEventListener('keydown', onPopupEscHandler);
  wizardCoat.removeEventListener('click', CoatChangeHandler);
  wizardEyes.removeEventListener('click', EyesChangeHandler);
  wizardFireball.removeEventListener('click', FireballChangeHandler);
};


getSelector('.setup-open').addEventListener('click', function () {
  openPopup();
});

getSelector('.setup-open').addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// Функция смены цвета частей волшебника
var changeWizardColor = function (part, property, data, inputName) {
  var color = data[getRandom(data.length)];
  part.style[property] = color;
  getSelector('input[name=\'' + inputName + '\']').value = color;
};
