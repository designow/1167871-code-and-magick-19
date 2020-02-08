'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var wizardCoat = window.core.getSelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.core.getSelector('.setup-wizard .wizard-eyes');
  var wizardFireball = window.core.getSelector('.setup-fireball-wrap');
  var setup = window.core.getSelector('.setup');
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
    changeWizardColor(wizardCoat, 'fill', window.setup.WIZARDS_COATS, 'coat-color');
  };

  var EyesChangeHandler = function () {
    changeWizardColor(wizardEyes, 'fill', window.setup.WIZARDS_EYES, 'eyes-color');
  };

  var FireballChangeHandler = function () {
    changeWizardColor(wizardFireball, 'background', window.setup.WIZARDS_FIREBALLS, 'fireball-color');
  };

  var openPopup = function () {

    setup.classList.remove('hidden');
    window.core.getSelector('.setup-close').addEventListener('click', onPopupCloseHandler);
    window.core.getSelector('.setup-close').addEventListener('keydown', onPopupCloseHandler);
    document.addEventListener('keydown', onPopupEscHandler);
    wizardCoat.addEventListener('click', CoatChangeHandler);
    wizardEyes.addEventListener('click', EyesChangeHandler);
    wizardFireball.addEventListener('click', FireballChangeHandler);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    window.core.getSelector('.setup-close').removeEventListener('keydown', onPopupCloseHandler);
    window.core.getSelector('.setup-close').removeEventListener('click', onPopupCloseHandler);
    document.removeEventListener('keydown', onPopupEscHandler);
    wizardCoat.removeEventListener('click', CoatChangeHandler);
    wizardEyes.removeEventListener('click', EyesChangeHandler);
    wizardFireball.removeEventListener('click', FireballChangeHandler);
  };


  window.core.getSelector('.setup-open').addEventListener('click', function () {
    openPopup();
  });

  window.core.getSelector('.setup-open').addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  // Функция смены цвета частей волшебника
  var changeWizardColor = function (part, property, data, inputName) {
    var color = data[window.core.getRandom(data.length)];
    part.style[property] = color;
    window.core.getSelector('input[name=\'' + inputName + '\']').value = color;
  };
})();

// Drag-and-Drop окна настройки персонажа

(function () {

  var setupDialogElement = window.core.getSelector('.setup');
  var dialogHandler = window.core.getSelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

