'use strict';
(function () {
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var similarWizardTemplate = window.core.getSelector('#similar-wizard-template').content;
  var similarListElement = document.querySelector('.setup').querySelector('.setup-similar-list');
  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    window.core.getSelector('.setup-similar-list').innerHTML = '';
    for (var i = 0; i < window.setup.WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    window.core.getSelector('.setup-similar').classList.remove('hidden');
  };
})();
