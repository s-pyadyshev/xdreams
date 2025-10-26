/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/accordion.js":
/*!****************************************!*\
  !*** ./src/js/components/accordion.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   accordion: function() { return /* binding */ accordion; }\n/* harmony export */ });\nconst accordion = (() => {\n  const init = () => {\n    const accordionList = document.querySelectorAll(\".accordion-list\");\n    if (!accordionList.length) {\n      return;\n    }\n    const toggleAccordion = event => {\n      event.stopPropagation();\n      const accordionItem = event.target.closest(\".accordion\");\n      const accordionContent = accordionItem.querySelector(\".accordion__content\");\n      accordionItem.classList.toggle(\"active\");\n      if (accordionItem.classList.contains(\"active\")) {\n        accordionContent.style.maxHeight = accordionContent.scrollHeight + \"px\";\n      } else {\n        accordionContent.style.maxHeight = \"0\";\n      }\n    };\n    accordionList.forEach(accordion => {\n      accordion.addEventListener(\"click\", toggleAccordion);\n    });\n  };\n  return {\n    init\n  };\n})();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/accordion.js?");

/***/ }),

/***/ "./src/js/components/mobile-menu.js":
/*!******************************************!*\
  !*** ./src/js/components/mobile-menu.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mobileMenu: function() { return /* binding */ mobileMenu; }\n/* harmony export */ });\n/* harmony import */ var _sliderMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliderMenu.js */ \"./src/js/components/sliderMenu.js\");\n\nconst mobileMenu = (() => {\n  const init = () => {\n    const mobileMenuToggle = document.querySelector(\".js-toggle-menu\");\n    if (!mobileMenuToggle) {\n      return;\n    }\n    const menu = document.querySelector(\".menu\");\n    const body = document.querySelector(\"body\");\n    const menuItems = document.querySelectorAll(\".menu__item\");\n    const menuLinks = document.querySelectorAll(\".menu__link\");\n    const menuContents = document.querySelectorAll(\".menu__content > li[data-collapse-content\");\n    const sliderMenu = (0,_sliderMenu_js__WEBPACK_IMPORTED_MODULE_0__.createSliderManager)(\"[class*='slider-menu']\");\n    const openMenu = () => {\n      mobileMenuToggle.classList.add(\"active\");\n      body.classList.toggle(\"menu-active\");\n      menu.classList.add(\"menu--open\");\n      menuItems[0].classList.add(\"active\");\n      menuLinks[0].classList.add(\"active\");\n      menuContents[0].classList.add(\"active\");\n      sliderMenu.init();\n    };\n    const closeMenu = () => {\n      mobileMenuToggle.classList.remove(\"active\");\n      body.classList.toggle(\"menu-active\");\n      menu.classList.remove(\"menu--open\");\n      menuItems.forEach(item => item.classList.remove(\"active\"));\n      menuLinks.forEach(item => item.classList.remove(\"active\"));\n      menuContents.forEach(item => item.classList.remove(\"active\"));\n      sliderMenu.destroy();\n    };\n    mobileMenuToggle.addEventListener(\"click\", function () {\n      if (!mobileMenuToggle.classList.contains(\"active\")) {\n        openMenu();\n      } else {\n        closeMenu();\n      }\n    });\n  };\n  return {\n    init\n  };\n})();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/mobile-menu.js?");

/***/ }),

/***/ "./src/js/components/quiz.js":
/*!***********************************!*\
  !*** ./src/js/components/quiz.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   quiz: function() { return /* binding */ quiz; }\n/* harmony export */ });\nconst quiz = function () {\n  const init = function () {\n    const quizForm = document.getElementById(\"quiz-form\");\n    if (quizForm === null) {\n      return;\n    }\n    const quizStart = document.querySelector(\".js-quiz-start\");\n    const quizQuestionIntro = document.querySelector(\".quiz__intro\");\n    const quizQuestionWrap = document.querySelector(\".quiz__question-wrap\");\n    const quizQuestions = document.querySelectorAll(\".quiz__question\");\n    const nextQuestions = document.querySelectorAll(\".quiz__next\");\n    const prevQuestions = document.querySelectorAll(\".quiz__prev\");\n    const quizSubmitButton = document.querySelector(\".quiz__submit\");\n    const quizResult = document.querySelector(\".quiz__result\");\n    const quizProgressLine = document.querySelector(\".progress__line\");\n    const quizProgressDividers = document.querySelector(\".progress__dividers\");\n    let quizProgressDividersDividers;\n    const quizProgressCurrent = document.querySelector(\".progress__questions-current\");\n    const quizProgressTotal = document.querySelector(\".progress__questions-total\");\n    const quizProgressStats = document.querySelector(\".progress__questions\");\n    let currentQuestionNumber = 1;\n    const questionsAmount = quizQuestions.length;\n    const progressLineRatio = 100 / questionsAmount;\n    quizProgressTotal.textContent = questionsAmount;\n    quizStart.addEventListener(\"click\", () => {\n      quizQuestionWrap.classList.toggle(\"active\");\n      quizQuestionIntro.classList.toggle(\"hidden\");\n      quizQuestions[0].classList.add(\"active\");\n      quizProgressStats.classList.add(\"active\");\n      quizProgressLine.setAttribute(\"value\", currentQuestionNumber * progressLineRatio);\n      quizProgressCurrent.textContent = currentQuestionNumber;\n      quizQuestions[0].querySelectorAll(\".quiz__question-number\")[0].textContent = `${currentQuestionNumber}. `;\n      for (let i = 0; i < quizQuestions.length; i += 1) {\n        const dividerDiv = document.createElement(\"div\");\n        quizProgressDividers.insertAdjacentElement(\"beforeend\", dividerDiv);\n      }\n      quizProgressDividersDividers = document.querySelectorAll(\".progress__dividers div\");\n      quizProgressDividersDividers[currentQuestionNumber - 1].style.opacity = 0;\n    });\n    nextQuestions.forEach((button, index) => {\n      button.addEventListener(\"click\", () => {\n        quizQuestions.forEach(() => {\n          quizQuestions[index].classList.remove(\"active\");\n          quizQuestions[index + 1].classList.add(\"active\");\n        });\n        currentQuestionNumber += 1;\n        quizProgressLine.setAttribute(\"value\", currentQuestionNumber * progressLineRatio);\n        quizProgressCurrent.textContent = currentQuestionNumber;\n        quizQuestions[index + 1].querySelectorAll(\".quiz__question-number\")[0].textContent = `${currentQuestionNumber}. `;\n        quizProgressDividersDividers[currentQuestionNumber - 2].style.opacity = 1;\n        quizProgressDividersDividers[currentQuestionNumber - 1].style.opacity = 0;\n      });\n    });\n    prevQuestions.forEach((button, index) => {\n      let prevIndex = index + 1;\n      button.addEventListener(\"click\", () => {\n        quizQuestions.forEach(() => {\n          quizQuestions[prevIndex].classList.remove(\"active\");\n          quizQuestions[prevIndex - 1].classList.add(\"active\");\n        });\n        currentQuestionNumber -= 1;\n        quizProgressLine.setAttribute(\"value\", currentQuestionNumber * progressLineRatio);\n        quizProgressCurrent.textContent = currentQuestionNumber;\n        quizQuestions[prevIndex - 1].querySelectorAll(\".quiz__question-number\")[0].textContent = `${currentQuestionNumber}. `;\n        quizProgressDividersDividers[currentQuestionNumber - 1].style.opacity = 0;\n        quizProgressDividersDividers[currentQuestionNumber].style.opacity = 1;\n      });\n    });\n    quizSubmitButton.addEventListener(\"click\", event => {\n      event.preventDefault();\n      const formData = new FormData(quizForm);\n      // getFormData to send to server\n      for (let [key, value] of formData) {\n        // console.log(`${key} - ${value}`);\n      }\n      quizQuestionWrap.classList.remove(\"active\");\n      quizResult.classList.add(\"active\");\n      quizProgressStats.innerText = \"Complete\";\n    });\n  };\n  return {\n    init\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/quiz.js?");

/***/ }),

/***/ "./src/js/components/scrollspy.js":
/*!****************************************!*\
  !*** ./src/js/components/scrollspy.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scrollspy: function() { return /* binding */ scrollspy; }\n/* harmony export */ });\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ \"./src/js/helpers.js\");\n\nconst applyScrollspyClasses = elements => {\n  elements.forEach(element => {\n    if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isElementInViewport)(element)) {\n      const animationClass = element.dataset.scrollspy;\n      const animationDurationTime = element.dataset.durationtime;\n      const animationDelayTime = element.dataset.delaytime;\n      element.classList.add(\"animate__animated\");\n      if (animationClass) {\n        element.classList.add(animationClass);\n      }\n      let style = \"\";\n      if (animationDurationTime) {\n        style += `animation-duration: ${animationDurationTime}ms;`;\n      }\n      if (animationDelayTime) {\n        style += `animation-delay: ${animationDelayTime}ms;`;\n      }\n      if (style) {\n        element.style.cssText += style;\n      }\n    }\n  });\n};\nconst scrollspy = function () {\n  const init = function () {\n    const scrollspyElements = document.querySelectorAll(\"[data-scrollspy]\");\n    if (!scrollspyElements.length) {\n      return;\n    }\n    applyScrollspyClasses(scrollspyElements);\n    document.addEventListener(\"scroll\", (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(() => {\n      applyScrollspyClasses(scrollspyElements);\n    }, 500));\n  };\n  return {\n    init\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/scrollspy.js?");

/***/ }),

/***/ "./src/js/components/sliderFeatures.js":
/*!*********************************************!*\
  !*** ./src/js/components/sliderFeatures.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sliderFeatures: function() { return /* binding */ sliderFeatures; }\n/* harmony export */ });\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.mjs\");\n/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ \"./node_modules/swiper/modules/index.mjs\");\n\n\nconst sliderFeatures = function () {\n  let thumbsSwiper = null;\n  let mainSwiper = null;\n  const updateProgressBar = function (swiper) {\n    const progressFill = document.querySelector(\".slider-features__progress-fill\");\n    if (!progressFill) return;\n    const totalSlides = swiper.slides.length;\n    const currentIndex = swiper.activeIndex;\n    const segmentWidth = 100 / totalSlides;\n    progressFill.style.width = `${segmentWidth}%`;\n    progressFill.style.transform = `translateX(${currentIndex * 100}%)`;\n  };\n  const init = function () {\n    const thumbsElement = document.querySelector(\".slider-features__thumbs\");\n    const mainElement = document.querySelector(\".slider-features__main\");\n    if (!thumbsElement || !mainElement) return;\n    thumbsSwiper = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".slider-features__thumbs\", {\n      modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Thumbs],\n      direction: \"vertical\",\n      slidesPerView: 4,\n      spaceBetween: 0,\n      watchSlidesProgress: true,\n      slideToClickedSlide: true,\n      slideThumbActiveClass: \"swiper-slide-thumb-active\",\n      multipleActiveThumbs: false\n    });\n    mainSwiper = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".slider-features__main\", {\n      modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Thumbs, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.EffectFade],\n      spaceBetween: 0,\n      speed: 600,\n      effect: \"fade\",\n      navigation: {\n        nextEl: \".slider-features__nav-btn--next\",\n        prevEl: \".slider-features__nav-btn--prev\"\n      },\n      thumbs: {\n        swiper: thumbsSwiper,\n        slideThumbActiveClass: \"swiper-slide-thumb-active\",\n        multipleActiveThumbs: false,\n        slidesPerView: 1\n      },\n      on: {\n        init: function (swiper) {\n          updateProgressBar(swiper);\n        },\n        slideChange: function (swiper) {\n          updateProgressBar(swiper);\n        }\n      }\n    });\n  };\n  const destroy = function () {\n    if (mainSwiper) {\n      mainSwiper.destroy(true, true);\n      mainSwiper = null;\n    }\n    if (thumbsSwiper) {\n      thumbsSwiper.destroy(true, true);\n      thumbsSwiper = null;\n    }\n  };\n  return {\n    init,\n    destroy\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/sliderFeatures.js?");

/***/ }),

/***/ "./src/js/components/sliderJobs.js":
/*!*****************************************!*\
  !*** ./src/js/components/sliderJobs.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sliderJobs: function() { return /* binding */ sliderJobs; }\n/* harmony export */ });\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.mjs\");\n\n\nconst sliderJobs = function () {\n  const init = function () {\n    const sliderJobs = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".slider-jobs\", {\n      slidesPerView: 1.2,\n      spaceBetween: 16,\n      spaceBetween: 20,\n      breakpoints: {\n        768: {\n          slidesPerView: 2.2\n        },\n        1200: {\n          slidesPerView: 3.2\n        },\n        1800: {\n          slidesPerView: 4.5\n        },\n        2300: {\n          slidesPerView: 5.5\n        }\n      }\n    });\n  };\n  return {\n    init\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/sliderJobs.js?");

/***/ }),

/***/ "./src/js/components/sliderMenu.js":
/*!*****************************************!*\
  !*** ./src/js/components/sliderMenu.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSliderManager: function() { return /* binding */ createSliderManager; }\n/* harmony export */ });\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.mjs\");\n/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ \"./node_modules/swiper/modules/index.mjs\");\n\n\nconst createSliderManager = selectorPattern => {\n  let swiperInstances = [];\n  const init = function () {\n    destroy();\n    if (window.innerWidth < 1200) {\n      const sliders = document.querySelectorAll(selectorPattern);\n      sliders.forEach(sliderElement => {\n        const swiperInstance = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](sliderElement, {\n          modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Pagination],\n          navigation: {\n            nextEl: sliderElement.querySelector(\".swiper-button-next\"),\n            prevEl: sliderElement.querySelector(\".swiper-button-prev\")\n          },\n          pagination: {\n            el: sliderElement.querySelector(\".swiper-pagination\"),\n            clickable: true,\n            type: \"bullets\",\n            bulletElement: \"button\"\n          },\n          slidesPerView: 1.2,\n          spaceBetween: 16\n        });\n        swiperInstances.push(swiperInstance);\n      });\n    }\n  };\n  const destroy = function () {\n    swiperInstances.forEach(instance => {\n      if (instance) {\n        instance.destroy(true, true);\n      }\n    });\n    swiperInstances = [];\n  };\n  const handleResize = function () {\n    const needSwiper = window.innerWidth < 1200;\n    if (needSwiper && swiperInstances.length === 0) {\n      init();\n    } else if (!needSwiper && swiperInstances.length > 0) {\n      destroy();\n    }\n  };\n  return {\n    init: function () {\n      init();\n      window.addEventListener(\"resize\", handleResize);\n    },\n    destroy: function () {\n      destroy();\n      window.removeEventListener(\"resize\", handleResize);\n    }\n  };\n};\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/sliderMenu.js?");

/***/ }),

/***/ "./src/js/components/sliderSpotlight.js":
/*!**********************************************!*\
  !*** ./src/js/components/sliderSpotlight.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sliderSpotlight: function() { return /* binding */ sliderSpotlight; }\n/* harmony export */ });\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.mjs\");\n/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ \"./node_modules/swiper/modules/index.mjs\");\n\n\nconst sliderSpotlight = function () {\n  let thumbsSwiper = null;\n  let mainSwiper = null;\n  const getSlideDelay = (swiper, index) => {\n    const slide = swiper.slides[index];\n    if (slide?.dataset?.swiperAutoplay) {\n      const delay = parseInt(slide.dataset.swiperAutoplay, 10);\n      if (!isNaN(delay) && delay > 0) return delay;\n    }\n    return swiper.params.autoplay.delay || 5000;\n  };\n  const resetAllProgress = () => {\n    const fills = document.querySelectorAll(\".slider-spotlight__progress-fill\");\n    fills.forEach(fill => {\n      fill.style.transition = \"none\";\n      fill.style.width = \"0%\";\n    });\n  };\n  const startProgress = (swiper, index) => {\n    resetAllProgress();\n    const delay = getSlideDelay(swiper, index);\n    const thumbSlides = document.querySelectorAll(\".slider-spotlight__thumb-slide\");\n    const activeThumb = thumbSlides[index];\n    if (!activeThumb) return;\n    const fill = activeThumb.querySelector(\".slider-spotlight__progress-fill\");\n    if (!fill) return;\n    fill.style.transition = \"none\";\n    fill.style.width = \"0%\";\n    void fill.offsetWidth;\n    fill.style.transition = `width ${delay}ms linear`;\n    fill.style.width = \"100%\";\n  };\n  const init = () => {\n    const thumbsEl = document.querySelector(\".slider-spotlight__thumbs\");\n    const mainEl = document.querySelector(\".slider-spotlight__main\");\n    if (!thumbsEl || !mainEl) return;\n    if (mainSwiper) {\n      mainSwiper.destroy(true, true);\n      mainSwiper = null;\n    }\n    if (thumbsSwiper) {\n      thumbsSwiper.destroy(true, true);\n      thumbsSwiper = null;\n    }\n    thumbsSwiper = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](thumbsEl, {\n      modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Thumbs],\n      slidesPerView: 4,\n      spaceBetween: 12,\n      watchSlidesProgress: true,\n      slideToClickedSlide: true\n    });\n    mainSwiper = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](mainEl, {\n      modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Thumbs, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.EffectFade, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Autoplay],\n      spaceBetween: 0,\n      speed: 600,\n      effect: \"fade\",\n      autoplay: {\n        delay: 5000,\n        disableOnInteraction: false\n      },\n      navigation: {\n        nextEl: \".slider-spotlight__nav-btn--next\",\n        prevEl: \".slider-spotlight__nav-btn--prev\"\n      },\n      thumbs: {\n        swiper: thumbsSwiper\n      },\n      on: {\n        init(swiper) {\n          startProgress(swiper, swiper.activeIndex);\n        },\n        slideChange(swiper) {\n          startProgress(swiper, swiper.activeIndex);\n        }\n      }\n    });\n  };\n  const destroy = () => {\n    if (mainSwiper) {\n      mainSwiper.destroy(true, true);\n      mainSwiper = null;\n    }\n    if (thumbsSwiper) {\n      thumbsSwiper.destroy(true, true);\n      thumbsSwiper = null;\n    }\n  };\n  return {\n    init,\n    destroy\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/sliderSpotlight.js?");

/***/ }),

/***/ "./src/js/components/sliderSteps.js":
/*!******************************************!*\
  !*** ./src/js/components/sliderSteps.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sliderSteps: function() { return /* binding */ sliderSteps; }\n/* harmony export */ });\nconst sliderSteps = function () {\n  let state = {\n    activeIndex: 0,\n    totalSlides: 0,\n    isDesktop: false,\n    elements: {\n      wrapper: null,\n      container: null,\n      slides: null,\n      progressFill: null,\n      navPrev: null,\n      navNext: null\n    }\n  };\n  const updateMobileLayout = function () {\n    state.elements.slides.forEach((slide, i) => {\n      if (i === state.activeIndex) {\n        slide.classList.add(\"steps-slider__slide-inner--active\");\n      } else {\n        slide.classList.remove(\"steps-slider__slide-inner--active\");\n      }\n    });\n  };\n  const updateDesktopLayout = function () {\n    if (!state.isDesktop) return;\n    state.elements.container.className = \"steps-slider\";\n    state.elements.container.classList.add(`steps-slider--active-${state.activeIndex}`);\n  };\n  const updateSharedState = function () {\n    document.querySelectorAll(\".steps-slider-slide\").forEach((slide, i) => {\n      slide.classList.toggle(\"slide-active\", i === state.activeIndex);\n    });\n    const translateX = state.activeIndex * 100;\n    state.elements.progressFill.style.transform = `translateX(${translateX}%)`;\n  };\n  const normalizeIndex = function (index) {\n    if (index < 0) return state.totalSlides - 1;\n    if (index >= state.totalSlides) return 0;\n    return index;\n  };\n  const setActiveSlide = function (index) {\n    state.activeIndex = normalizeIndex(index);\n    updateMobileLayout();\n    if (state.isDesktop) {\n      updateDesktopLayout();\n    }\n    updateSharedState();\n  };\n  const checkLayout = function () {\n    const isNowDesktop = window.innerWidth > 1199;\n    if (isNowDesktop !== state.isDesktop) {\n      state.isDesktop = isNowDesktop;\n      if (state.isDesktop) {\n        updateDesktopLayout();\n      } else {\n        state.elements.container.className = \"steps-slider\";\n      }\n    }\n  };\n  const init = function () {\n    const wrapper = document.querySelector(\"[data-steps-slider]\");\n    if (!wrapper) return;\n    state.elements.wrapper = wrapper;\n    state.elements.container = wrapper.querySelector(\"[data-slider-container]\");\n    state.elements.slides = wrapper.querySelectorAll(\".steps-slider__slide-inner\");\n    state.elements.progressFill = wrapper.querySelector(\"[data-progress-fill]\");\n    state.elements.navPrev = wrapper.querySelector(\"[data-nav-prev]\");\n    state.elements.navNext = wrapper.querySelector(\"[data-nav-next]\");\n    state.totalSlides = state.elements.slides.length;\n    checkLayout();\n    setActiveSlide(0);\n    state.elements.slides.forEach(slide => {\n      slide.addEventListener(\"click\", () => {\n        const index = parseInt(slide.getAttribute(\"data-slide-index\"), 10);\n        if (index !== state.activeIndex) {\n          setActiveSlide(index);\n        }\n      });\n    });\n    state.elements.navPrev.addEventListener(\"click\", () => {\n      setActiveSlide(state.activeIndex - 1);\n    });\n    state.elements.navNext.addEventListener(\"click\", () => {\n      setActiveSlide(state.activeIndex + 1);\n    });\n    window.addEventListener(\"resize\", checkLayout);\n  };\n  return {\n    init\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/sliderSteps.js?");

/***/ }),

/***/ "./src/js/components/sliderValues.js":
/*!*******************************************!*\
  !*** ./src/js/components/sliderValues.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sliderValues: function() { return /* binding */ sliderValues; }\n/* harmony export */ });\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.mjs\");\n/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ \"./node_modules/swiper/modules/index.mjs\");\n\n\nconst sliderValues = function () {\n  const updateProgressBar = function (swiper) {\n    const progressFill = document.querySelector(\".slider-values__progress-fill\");\n    if (!progressFill) return;\n    const totalSlides = swiper.slides.length;\n    const currentIndex = swiper.activeIndex;\n    const segmentWidth = 100 / totalSlides;\n    progressFill.style.width = `${segmentWidth}%`;\n    progressFill.style.transform = `translateX(${currentIndex * 100}%)`;\n  };\n  const init = function () {\n    const slider = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".slider-values\", {\n      modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Pagination],\n      navigation: {\n        nextEl: \".swiper-button-next\",\n        prevEl: \".swiper-button-prev\"\n      },\n      pagination: {\n        el: \".slider-values__pagination\",\n        clickable: \"true\",\n        type: \"bullets\",\n        bulletElement: \"button\"\n      },\n      slidesPerView: 1,\n      breakpoints: {\n        768: {\n          slidesPerView: 2,\n          spaceBetween: 20\n        },\n        1025: {\n          slidesPerView: 3,\n          spaceBetween: 80\n        },\n        1600: {\n          slidesPerView: 4,\n          spaceBetween: 40\n        }\n      },\n      on: {\n        init: function (swiper) {\n          updateProgressBar(swiper);\n        },\n        slideChange: function (swiper) {\n          updateProgressBar(swiper);\n        }\n      }\n    });\n  };\n  return {\n    init\n  };\n}();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/sliderValues.js?");

/***/ }),

/***/ "./src/js/components/tabs.js":
/*!***********************************!*\
  !*** ./src/js/components/tabs.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   tabs: function() { return /* binding */ tabs; }\n/* harmony export */ });\nconst tabs = (() => {\n  const init = () => {\n    const tabContainers = document.querySelectorAll(\"[data-tabs]\");\n    if (!tabContainers.length) {\n      return;\n    }\n    const dataTabsContent = document.querySelectorAll(`[data-tabs-content] > [data-tab-content]`);\n    dataTabsContent.forEach(item => {\n      if (!item.classList.contains(\"is-active\")) {\n        item.classList.add(\"visually-hidden\");\n      }\n    });\n    tabContainers.forEach(tabContainer => {\n      const currentTab = tabContainer.getAttribute(\"data-tabs\");\n      tabContainer.addEventListener(\"click\", event => {\n        const target = event.target;\n        if (!target.hasAttribute(\"data-tab\")) {\n          return;\n        }\n        const tabButton = target;\n        const tabId = tabButton.getAttribute(\"data-tab\");\n        const matchingTabDataAll = document.querySelectorAll(`[data-tabs-content=\"${currentTab}\"] > [data-tab-content]`);\n        const matchingTabData = document.querySelector(`[data-tabs-content=\"${currentTab}\"] > [data-tab-content=\"${tabId}\"]`);\n        const activeTabContent = document.querySelector(`[data-tabs-content=\"${currentTab}\"] > [data-tab-content].is-active`);\n        const activeTabButton = document.querySelector(`[data-tabs=${currentTab}] > button.is-active`);\n        const tabButtonAll = document.querySelectorAll(`[data-tabs=${currentTab}] > button`);\n        matchingTabDataAll.forEach(item => {\n          item.classList.add(\"visually-hidden\");\n          item.classList.remove(\"is-active\");\n        });\n        activeTabContent.classList.remove(\"is-active\");\n        activeTabButton.classList.remove(\"is-active\");\n        tabButtonAll.forEach(item => item.classList.remove(\"is-active\"));\n        matchingTabData.classList.add(\"is-active\");\n        matchingTabData.classList.remove(\"visually-hidden\");\n        tabButton.classList.add(\"is-active\");\n      });\n    });\n  };\n  return {\n    init\n  };\n})();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/tabs.js?");

/***/ }),

/***/ "./src/js/components/toggle.js":
/*!*************************************!*\
  !*** ./src/js/components/toggle.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toggle: function() { return /* binding */ toggle; }\n/* harmony export */ });\nconst toggle = (() => {\n  const init = () => {\n    const collapseLinks = document.querySelectorAll(\"[data-collapse-target]\");\n    if (!collapseLinks.length) {\n      return;\n    }\n    collapseLinks.forEach(link => {\n      link.addEventListener(\"click\", event => {\n        const collapseTarget = event.target.dataset.collapseTarget;\n        const collapseGroup = event.target.dataset.collapseGroup;\n        const target = document.querySelector(`[data-collapse-content=\"${collapseTarget}\"]`);\n        const associatedLinks = document.querySelectorAll(`[data-collapse-target=\"${collapseTarget}\"]`);\n        target.classList.toggle(\"active\");\n        associatedLinks.forEach(el => el.classList.toggle(\"active\"));\n        if (collapseGroup) {\n          const otherGroupToggles = document.querySelectorAll(`[data-collapse-group=\"${collapseGroup}\"]`);\n          otherGroupToggles.forEach(toggle => {\n            if (toggle.dataset.collapseTarget !== collapseTarget) {\n              toggle.classList.remove(\"active\");\n              const otherContent = document.querySelector(`[data-collapse-content=\"${toggle.dataset.collapseTarget}\"]`);\n              if (otherContent) {\n                otherContent.classList.remove(\"active\");\n              }\n            }\n          });\n        }\n      });\n    });\n  };\n  return {\n    init\n  };\n})();\n\n//# sourceURL=webpack://ninelines-template/./src/js/components/toggle.js?");

/***/ }),

/***/ "./src/js/helpers.js":
/*!***************************!*\
  !*** ./src/js/helpers.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   debounce: function() { return /* binding */ debounce; },\n/* harmony export */   isElementCompletelyInViewport: function() { return /* binding */ isElementCompletelyInViewport; },\n/* harmony export */   isElementInViewport: function() { return /* binding */ isElementInViewport; },\n/* harmony export */   throttle: function() { return /* binding */ throttle; }\n/* harmony export */ });\nfunction debounce(func, wait) {\n  let timeout;\n  return function () {\n    if (timeout) {\n      clearTimeout(timeout);\n    }\n    timeout = setTimeout(() => {\n      func.apply(this, arguments);\n    }, wait);\n  };\n}\n\n// const onType = debounce(() => {\n//   // send request\n// }, 500);\n\n// const searchField = document.querySelector(\"#searchField\");\n\n// searchField.addEventListener(\"keydown\", onType);\n\nfunction throttle(func, wait) {\n  let waiting = false;\n  return function () {\n    if (waiting) {\n      return;\n    }\n    waiting = true;\n    setTimeout(() => {\n      func.apply(this, arguments);\n      waiting = false;\n    }, wait);\n  };\n}\n\n// Usage\n// const onScroll = throttle(() => {}, 100);\n\n// document.addEventListener(\"scroll\", onScroll);\n\nfunction isElementInViewport(element) {\n  const rect = element.getBoundingClientRect();\n  const windowHeight = window.innerHeight || document.documentElement.clientHeight;\n  const windowWidth = window.innerWidth || document.documentElement.clientWidth;\n  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;\n  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;\n  return vertInView && horInView;\n}\nfunction isElementCompletelyInViewport(element) {\n  const rect = element.getBoundingClientRect();\n  const html = document.documentElement;\n  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);\n}\n\n//# sourceURL=webpack://ninelines-template/./src/js/helpers.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/accordion.js */ \"./src/js/components/accordion.js\");\n/* harmony import */ var _components_mobile_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/mobile-menu.js */ \"./src/js/components/mobile-menu.js\");\n/* harmony import */ var _components_sliderJobs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sliderJobs.js */ \"./src/js/components/sliderJobs.js\");\n/* harmony import */ var _components_sliderFeatures_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sliderFeatures.js */ \"./src/js/components/sliderFeatures.js\");\n/* harmony import */ var _components_sliderSpotlight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sliderSpotlight.js */ \"./src/js/components/sliderSpotlight.js\");\n/* harmony import */ var _components_sliderValues_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sliderValues.js */ \"./src/js/components/sliderValues.js\");\n/* harmony import */ var _components_sliderSteps_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sliderSteps.js */ \"./src/js/components/sliderSteps.js\");\n/* harmony import */ var _components_toggle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/toggle.js */ \"./src/js/components/toggle.js\");\n/* harmony import */ var _components_quiz_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/quiz.js */ \"./src/js/components/quiz.js\");\n/* harmony import */ var _components_tabs_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/tabs.js */ \"./src/js/components/tabs.js\");\n/* harmony import */ var _components_scrollspy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/scrollspy.js */ \"./src/js/components/scrollspy.js\");\n\n\n\n\n\n\n\n\n\n\n// import { imageScroll } from \"./components/imageScroll.js\";\n\n// import { slider } from \"./components/slider.js\";\n\nwindow.addEventListener(\"load\", () => {\n  _components_mobile_menu_js__WEBPACK_IMPORTED_MODULE_1__.mobileMenu.init();\n  _components_accordion_js__WEBPACK_IMPORTED_MODULE_0__.accordion.init();\n  _components_sliderJobs_js__WEBPACK_IMPORTED_MODULE_2__.sliderJobs.init();\n  _components_sliderFeatures_js__WEBPACK_IMPORTED_MODULE_3__.sliderFeatures.init();\n  _components_sliderSpotlight_js__WEBPACK_IMPORTED_MODULE_4__.sliderSpotlight.init();\n  _components_sliderSteps_js__WEBPACK_IMPORTED_MODULE_6__.sliderSteps.init();\n  _components_sliderValues_js__WEBPACK_IMPORTED_MODULE_5__.sliderValues.init();\n  _components_toggle_js__WEBPACK_IMPORTED_MODULE_7__.toggle.init();\n  _components_quiz_js__WEBPACK_IMPORTED_MODULE_8__.quiz.init();\n  _components_scrollspy_js__WEBPACK_IMPORTED_MODULE_10__.scrollspy.init();\n  _components_tabs_js__WEBPACK_IMPORTED_MODULE_9__.tabs.init();\n  const loaderContainer = document.querySelector(\".image-sequence-loading\");\n  if (loaderContainer) {\n    gsap.registerPlugin(ScrollTrigger);\n    const sections = gsap.utils.toArray(\".pin-section\");\n    let lastScrollTop = window.scrollY;\n    let isSnapping = false;\n    // let lastSectionActivated = false;\n\n    loaderContainer.classList.add(\"show\");\n    let totalImages = 0;\n    let loadedImages = 0;\n    const allImagesLoaded = new Promise(resolve => {\n      const checkComplete = () => {\n        if (loadedImages >= totalImages && totalImages > 0) {\n          resolve();\n        }\n      };\n      const originalImage = window.Image;\n      window.Image = function () {\n        const img = new originalImage();\n        const originalOnload = img.onload;\n        img.onload = function (...args) {\n          loadedImages++;\n          checkComplete();\n          if (originalOnload) originalOnload.apply(this, args);\n        };\n        const originalOnerror = img.onerror;\n        img.onerror = function (...args) {\n          loadedImages++;\n          checkComplete();\n          if (originalOnerror) originalOnerror.apply(this, args);\n        };\n        return img;\n      };\n    });\n    sections.forEach(section => {\n      const frameCount = parseInt(section.dataset.frameCount, 10) || 0;\n      totalImages += frameCount;\n    });\n    window.addEventListener(\"scroll\", () => {\n      if (!isSnapping) {\n        lastScrollTop = window.scrollY;\n      }\n    });\n    ScrollTrigger.addEventListener(\"scrollEnd\", () => {\n      if (isSnapping) return;\n      const currentScroll = window.scrollY;\n      const direction = currentScroll > lastScrollTop ? \"down\" : \"up\";\n      if (direction === \"up\") {\n        for (let i = sections.length - 1; i >= 0; i--) {\n          const section = sections[i];\n          const sectionTop = section.offsetTop;\n          if (sectionTop <= currentScroll) {\n            if (i > 0) {\n              const prevSection = sections[i - 1];\n              const currentSection = sections[i];\n              const sectionHeight = section.offsetHeight;\n              const distanceFromTop = currentScroll - sectionTop;\n              if (distanceFromTop < sectionHeight * 0.3) {\n                currentSection.classList.add(\"pin-section-in-transition\");\n                isSnapping = true;\n                window.scrollTo({\n                  top: prevSection.offsetTop,\n                  behavior: \"auto\"\n                });\n                requestAnimationFrame(() => {\n                  currentSection.classList.remove(\"pin-section-in-transition\");\n                  isSnapping = false;\n                });\n              }\n            }\n            break;\n          }\n        }\n      }\n    });\n    function resizeCanvas(canvas) {\n      const rect = canvas.parentElement.getBoundingClientRect();\n      const displayWidth = rect.width;\n      const displayHeight = rect.height;\n      if (displayWidth > 0 && displayHeight > 0) {\n        canvas.width = displayWidth;\n        canvas.height = displayHeight;\n      } else {\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n      }\n    }\n    function drawImageCover(ctx, img, canvasW, canvasH) {\n      if (canvasW <= 0 || canvasH <= 0 || img.width <= 0 || img.height <= 0) return;\n      const imgRatio = img.width / img.height;\n      const canvasRatio = canvasW / canvasH;\n      let drawW, drawH, drawX, drawY;\n      if (imgRatio > canvasRatio) {\n        drawH = canvasH;\n        drawW = canvasH * imgRatio;\n      } else {\n        drawW = canvasW;\n        drawH = canvasW / imgRatio;\n      }\n      drawX = (canvasW - drawW) / 2;\n      drawY = (canvasH - drawH) / 2;\n      ctx.clearRect(0, 0, canvasW, canvasH);\n      ctx.drawImage(img, drawX, drawY, drawW, drawH);\n    }\n    function imageSequence({\n      urls,\n      canvas,\n      scrollTrigger,\n      onComplete,\n      effectiveFps = 15\n    }) {\n      const ctx = canvas.getContext(\"2d\");\n      let curFrame = -1;\n      let playhead = {\n        frame: 0\n      };\n      const images = urls.map(url => {\n        const img = new Image();\n        img.src = url;\n        return img;\n      });\n      const updateImage = () => {\n        const frame = Math.round(playhead.frame);\n        if (frame !== curFrame && images[frame]?.complete) {\n          drawImageCover(ctx, images[frame], canvas.width, canvas.height);\n          curFrame = frame;\n        }\n      };\n      const duration = images.length / effectiveFps;\n      return gsap.to(playhead, {\n        frame: images.length - 1,\n        ease: \"none\",\n        duration: duration,\n        onUpdate: updateImage,\n        onComplete: onComplete,\n        scrollTrigger: scrollTrigger\n      });\n    }\n    allImagesLoaded.then(() => {\n      requestAnimationFrame(() => {\n        sections.forEach((section, index) => {\n          const canvas = section.querySelector(\".image-sequence-canvas\");\n          if (!canvas) return;\n          resizeCanvas(canvas);\n          const imagePath = section.dataset.imagePath;\n          const firstImageUrl = `${imagePath}-001.jpg`;\n          const img = new Image();\n          img.src = firstImageUrl;\n          const drawFirst = () => {\n            const ctx = canvas.getContext(\"2d\");\n            drawImageCover(ctx, img, canvas.width, canvas.height);\n          };\n          if (img.complete) {\n            drawFirst();\n          } else {\n            img.onload = drawFirst;\n          }\n        });\n        loaderContainer.classList.add(\"fade-out\");\n        setTimeout(() => {\n          loaderContainer.style.display = \"none\";\n        }, 500);\n      });\n    });\n    sections.forEach((section, index) => {\n      const frameCount = parseInt(section.dataset.frameCount, 10);\n      const imagePath = section.dataset.imagePath;\n      const urls = Array.from({\n        length: frameCount\n      }, (_, i) => `${imagePath}-${(i + 1).toString().padStart(3, \"0\")}.jpg`);\n      const canvas = section.querySelector(\".image-sequence-canvas\");\n      if (!canvas) return;\n      const nextSection = sections[index + 1];\n      const isLastSection = index + 1 === sections.length - 1;\n      const handleComplete = () => {\n        if (nextSection) {\n          nextSection.classList.add(\"pin-section-in-transition\");\n          gsap.to(window, {\n            duration: 1,\n            scrollTo: nextSection,\n            overwrite: \"auto\",\n            onComplete: () => {\n              // TODO (if desktop)\n              nextSection.classList.remove(\"pin-section-in-transition\");\n              console.log(isLastSection);\n              if (isLastSection) {\n                setTimeout(() => {\n                  const menuLinkFirst = document.querySelectorAll(\".menu__item\")[0]?.querySelector(\".menu__link\");\n                  const menuContentFirst = menuLinkFirst?.nextElementSibling?.querySelector(\"li\");\n                  menuLinkFirst?.classList.toggle(\"active\");\n                  menuContentFirst?.classList.toggle(\"active\");\n                }, 2000);\n              }\n            }\n          });\n        }\n      };\n      const scrollTriggerConfig = {\n        trigger: section,\n        pin: true,\n        start: \"top top\",\n        end: \"bottom top\",\n        scrub: true,\n        snap: 0.7\n      };\n\n      // if (isLastSection) {\n      //   scrollTriggerConfig.onEnter = (self) => {\n      //     if (self.direction > 0) {\n      //       lastSectionActivated = true;\n      //     }\n      //   };\n      // }\n\n      imageSequence({\n        urls,\n        canvas,\n        scrollTrigger: scrollTriggerConfig,\n        onComplete: handleComplete,\n        effectiveFps: 15\n      });\n    });\n    window.addEventListener(\"resize\", () => {\n      sections.forEach(section => {\n        const canvas = section.querySelector(\".image-sequence-canvas\");\n        if (canvas) {\n          resizeCanvas(canvas);\n        }\n      });\n    });\n  }\n  document.querySelector(\"body\").classList.add(\"page-loaded\");\n}, false);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const openBtn = document.getElementById(\"openVideoBtn\");\n  const modal = document.getElementById(\"videoModal\");\n  const closeModalBtn = document.getElementById(\"closeModalBtn\");\n  const modalVideoContainer = document.querySelector(\".modal-video-container\");\n  const vimeoId = openBtn?.dataset.vimeoId;\n  if (!vimeoId) {\n    return;\n  }\n  const baseVimeoUrl = `https://player.vimeo.com/video/${vimeoId}`;\n  openBtn.addEventListener(\"click\", () => {\n    openModal(vimeoId);\n  });\n  function openModal() {\n    modalVideoContainer.classList.add(\"loading\");\n    const iframe = document.createElement(\"iframe\");\n    iframe.src = `${baseVimeoUrl}?autoplay=1&loop=0&byline=0&title=0&muted=0`;\n    iframe.setAttribute(\"frameborder\", \"0\");\n    iframe.setAttribute(\"allow\", \"autoplay; fullscreen\");\n    iframe.setAttribute(\"allowfullscreen\", \"\");\n    iframe.addEventListener(\"load\", () => {\n      modalVideoContainer.classList.remove(\"loading\");\n    });\n    modalVideoContainer.innerHTML = '<div class=\"loader\"></div>';\n    modalVideoContainer.appendChild(iframe);\n    if (typeof modal.showModal === \"function\") {\n      modal.showModal();\n    } else {\n      modal.style.display = \"block\";\n    }\n  }\n  function closeModal() {\n    modalVideoContainer.innerHTML = \"\";\n    if (typeof modal.close === \"function\") {\n      modal.close();\n    } else {\n      modal.style.display = \"none\";\n    }\n  }\n  if (closeModalBtn) {\n    closeModalBtn.addEventListener(\"click\", closeModal);\n  }\n  modal?.addEventListener(\"click\", e => {\n    const rect = modal.getBoundingClientRect();\n    const isInDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;\n    if (!isInDialog) {\n      closeModal();\n    }\n  });\n});\n\n//# sourceURL=webpack://ninelines-template/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkninelines_template"] = self["webpackChunkninelines_template"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/main.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;