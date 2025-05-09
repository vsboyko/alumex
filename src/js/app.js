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

// form quiz
document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.querySelector(".js-quiz");
  const quizSteps = document.querySelectorAll(".js-quiz-step");
  const quizProgressCurrent = document.querySelector(".js-quiz-progress-current");
  const quizProgressCount = document.querySelector(".js-quiz-progress-count");
  const nextButton = document.querySelector(".js-quiz-btn-router");
  const prevButton = document.querySelector(".js-quiz-btn-router-prev");
  const totalSteps = quizSteps.length;
  let currentStep = 0;

  const updateProgress = () => {
    quizProgressCurrent.textContent = currentStep + 1;
    quizProgressCount.textContent = totalSteps;
  };

  const checkStepValidity = () => {
    const currentStepEl = quizSteps[currentStep];
    const requiredFields = currentStepEl.querySelectorAll("[required], input[type='radio'], input[type='checkbox']");
    let allValid = true;

    const checkedGroups = new Set();

    requiredFields.forEach(field => {
      const name = field.name;

      if ((field.type === "radio" || field.type === "checkbox")) {
        if (checkedGroups.has(name)) return;
        checkedGroups.add(name);

        const checked = currentStepEl.querySelectorAll(`input[name="${name}"]:checked`);
        if (checked.length === 0) {
          allValid = false;
        }
      } else {
        if (!field.value.trim()) {
          allValid = false;
        }
      }
    });

    nextButton.disabled = !allValid;
  };

  const showStep = (stepIndex) => {
    quizSteps.forEach((step, index) => {
      step.classList.toggle("is-show", index === stepIndex);
    });
    currentStep = stepIndex;
    updateProgress();
    checkStepValidity();

    if (currentStep === 0) {
      prevButton.classList.add("is-hide");
    } else {
      prevButton.classList.remove("is-hide");
    }
  };

  nextButton.addEventListener("click", () => {
    if (currentStep < totalSteps - 1) {
      showStep(currentStep + 1);
    } else {
      quizForm.classList.add("is-send");
      const formData = new FormData(quizForm);
      fetch(quizForm.action, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          quizForm.classList.add("is-send");
        })
        .catch(error => {
          console.error("Ошибка отправки формы:", error);
        });
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });

  quizForm.addEventListener("change", checkStepValidity);

  quizForm.addEventListener("input", checkStepValidity);

  showStep(currentStep);
});