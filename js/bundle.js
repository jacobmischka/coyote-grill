/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(2);
	
	__webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var picture = document.querySelector('#coyote-grill-external');
	var pictureSwitch = document.querySelector('#coyote-grill-external-switch');
	
	var dayWide = '/assets/coyote-grill-wide.jpg';
	var day = '/assets/coyote-grill.jpg';
	var nightWide = '/assets/coyote-grill-wide-night.jpg';
	var night = '/assets/coyote-grill-night.jpg';
	
	var now = new Date();
	if (now.getHours() < 6 || now.getHours() > 17) {
		picture.classList.remove('day-picture');
		picture.classList.add('night-picture');
		picture.querySelector('source').setAttribute('srcset', nightWide);
		picture.querySelector('img').setAttribute('src', night);
	
		pictureSwitch.querySelector('#external-night').checked = true;
	}
	
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
		for (var _iterator = Array.from(pictureSwitch.querySelectorAll('input[name="coyote-grill-external-switch"]'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var option = _step.value;
	
			option.addEventListener('change', function (event) {
				if (event.target.checked) {
					picture.style.opacity = 0;
	
					switch (event.target.value) {
						case 'night':
							picture.querySelector('source').setAttribute('srcset', nightWide);
							picture.querySelector('img').setAttribute('src', night);
							break;
						case 'day':
						default:
							picture.querySelector('source').setAttribute('srcset', dayWide);
							picture.querySelector('img').setAttribute('src', day);
							break;
					}
	
					picture.style.opacity = null;
				}
			});
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var imageMenuItemListsSection = document.querySelector('#image-menu-item-lists');
	var tabs = imageMenuItemListsSection.querySelector('.tabs');
	var content = imageMenuItemListsSection.querySelector('.content');
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
		for (var _iterator = Array.from(tabs.querySelectorAll('.tab-link'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var tabLink = _step.value;
	
			tabLink.addEventListener('click', function (event) {
				event.preventDefault();
	
				Array.from(content.querySelectorAll('.active')).map(function (activeGroup) {
					activeGroup.classList.remove('active');
				});
				Array.from(tabs.querySelectorAll('.tab-link.active')).map(function (activeLink) {
					if (activeLink !== event.target) activeLink.classList.remove('active');
				});
	
				event.target.classList.toggle('active');
				if (event.target.classList.contains('active')) {
					var group = event.target.getAttribute('href');
					content.querySelector(group).classList.add('active');
				}
			});
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map