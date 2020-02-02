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

var wizards = [];
var WIZARDS_COUNT = 4;
var similarWizardTemplate = getSelector('#similar-wizard-template');
similarWizardTemplate = similarWizardTemplate.content;

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
  for (var i = 0; i < count; i++) {
    wizards.push(wizardDataGenerator(WIZARDS_NAME, WIZARDS_COATS, WIZARDS_EYES));
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
};

var fragment = document.createDocumentFragment();

// Создаем 4х волшебников
createCollection(WIZARDS_COUNT);

getSelector('.setup-similar-list').appendChild(fragment);
// getSelector('.setup-similar').classList.remove('hidden');

// Открытие и закрытие формы

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target.classList.value !== 'setup-user-name') {
    closePopup();
  }
};

var openPopup = function () {
  getSelector('.setup').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  getSelector('.setup').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

getSelector('.setup-open').addEventListener('click', function () {
  openPopup();
});

getSelector('.setup-open').addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

getSelector('.setup-close').addEventListener('click', function () {
  closePopup();
});

getSelector('.setup-close').addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var wizardCoat = getSelector('.setup-wizard .wizard-coat');
var wizardEyes = getSelector('.setup-wizard .wizard-eyes');
var wizardFireball = getSelector('.setup-fireball-wrap');

// Функция смены цвета частей волшебника
var changeWizardColor = function (part, property, data, inputName) {
  var color = data[getRandom(data.length)];
  part.style[property] = color;
  getSelector('input[name=\'' + inputName + '\']').value = color;
};

wizardCoat.addEventListener('click', function () {
  changeWizardColor(wizardCoat, 'fill', WIZARDS_COATS, 'coat-color');
});

wizardEyes.addEventListener('click', function () {
  changeWizardColor(wizardEyes, 'fill', WIZARDS_EYES, 'eyes-color');
});

wizardFireball.addEventListener('click', function () {
  changeWizardColor(wizardFireball, 'background', WIZARDS_FIREBALLS, 'fireball-color');
});
