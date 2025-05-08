/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

import { SetVH } from './modules/SetVH.js';
import BaseHelpers from './helpers/BaseHelpers.js';
import { SmoothScroll } from './modules/SmoothScroll.js';
import { InitCatalogDropdown } from './modules/InitCatalogDropdown.js';
import PhoneMask from './modules/PhoneMask.js';
import SliderInit from './modules/SliderInit.js';

// set vh
SetVH();

// check webp/loaded page/device type
BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  // nav active anchor
  const smoothScroll = new SmoothScroll('.js-anchor', 650);

  // header toggle catalog
  InitCatalogDropdown();

  // mask phone
  new PhoneMask('.js-phone-mask');

  // swiper slider init
  SliderInit('.js-slider-goods-init', {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    autoplay: false,
    breakpoints: {
      0: {
        centeredSlides: true,
        slidesPerView: 'auto',
      },
      992: {
        centeredSlides: false,
        slidesPerView: 3,
      }
    }
  });

  SliderInit('.js-slider-services-init', {
    slidesPerView: 5,
    spaceBetween: 0,
    loop: true,
    autoplay: false,
    breakpoints: {
      0: {
        centeredSlides: true,
        slidesPerView: 'auto',
      },
      992: {
        centeredSlides: false,
        slidesPerView: 5,
      }
    }
  });

  // form send
  document.querySelectorAll('.js-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const response = await fetch('send-form.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        form.classList.add('is-send');
      }
    });
  });
});