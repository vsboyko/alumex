import IMask from 'imask';

export default class PhoneMask {
  constructor(selector) {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    elements.forEach((element) => {
      const maskOptions = {
        mask: '+{7} (000) 000 00 00',
        lazy: true,
      };

      const mask = IMask(element, maskOptions);

      element.addEventListener('focus', () => {
        mask.updateOptions({
          lazy: false
        });
      });

      element.addEventListener('blur', () => {
        mask.updateOptions({
          lazy: true
        });
      });
    });
  }
}