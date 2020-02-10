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

  var WIZARDS_COUNT = 4;
  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = window.core.getSelector('#similar-wizard-template').content;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    window.core.getSelector('.setup-similar').classList.remove('hidden');
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
    errorHandler: errorHandler
  };

})();
