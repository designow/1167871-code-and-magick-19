'use strict';

(function () {

  // Константы характеристик волшебников
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
  var COAT_RANK = 2;
  var EYES_RANK = 1;
  var WIZARDS_COUNT = 4;
  var wizards = [];
  var wizardCoat = window.core.getSelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.core.getSelector('.setup-wizard .wizard-eyes');
  var wizardFireball = window.core.getSelector('.setup-fireball-wrap');
  var wizardColors = {};
  // userDialog.classList.remove('hidden');

  // Система рангов магов
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === wizardColors['coat-color']) {
      rank += COAT_RANK;

    }
    if (wizard.colorEyes === wizardColors['eyes-color']) {
      rank += EYES_RANK;
    }
    return rank;
  };
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    }
    if (left < right) {
      return -1;
    }
    return 0;
  };
  // Могучая функция фильтрации массивов с магами
  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var CoatChangeHandler = window.debounce(function () {
    changeWizardColor(wizardCoat, 'fill', window.setup.WIZARDS_COATS, 'coat-color');
  });

  var EyesChangeHandler = window.debounce(function () {
    changeWizardColor(wizardEyes, 'fill', window.setup.WIZARDS_EYES, 'eyes-color');
  });

  var FireballChangeHandler = function () {
    changeWizardColor(wizardFireball, 'background', window.setup.WIZARDS_FIREBALLS, 'fireball-color');
  };

  // Функция смены цвета частей волшебника

  var changeWizardColor = function (part, property, data, inputName) {
    var color = data[window.core.getRandom(data.length)];
    part.style[property] = color;
    window.core.getSelector('input[name=\'' + inputName + '\']').value = color;
    wizardColors[inputName] = color;
    updateWizards();
  };


  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.setup = {
    WIZARDS_FIREBALLS: WIZARDS_FIREBALLS,
    WIZARDS_COATS: WIZARDS_COATS,
    WIZARDS_EYES: WIZARDS_EYES,
    errorHandler: errorHandler,
    WIZARDS_COUNT: WIZARDS_COUNT,
    CoatChangeHandler: CoatChangeHandler,
    EyesChangeHandler: EyesChangeHandler,
    FireballChangeHandler: FireballChangeHandler
  };

})();
