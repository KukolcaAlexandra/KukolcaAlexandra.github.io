(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([[0],{

/***/ "./node_modules/css-loader/index.js!./src/css/newsBlockStyle.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader!./src/css/newsBlockStyle.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".news-container {\\r\\n    width: 100%;\\r\\n    display: inline-block;\\r\\n    display: flex;\\r\\n    flex-wrap: wrap;\\r\\n  }\\r\\n  \\r\\n  .news-block {\\r\\n    width: 100%;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    padding: 10px;\\r\\n    margin: 10px 15px;\\r\\n    background-color: #fff;;\\r\\n  }\\r\\n\\r\\n  .title-block {\\r\\n    display: flex;\\r\\n    align-items: flex-start;\\r\\n    flex-grow: 1;\\r\\n  }\\r\\n  \\r\\n  .image {\\r\\n    width: 100px;\\r\\n  }\\r\\n  \\r\\n  .title {\\r\\n    display: inline-block;\\r\\n    margin-top: 0px;\\r\\n    margin-left: 10px;\\r\\n  }\\r\\n  \\r\\n  .date-block {\\r\\n    font-size: 12px;\\r\\n    font-weight: 700;\\r\\n    margin-left: 10px;\\r\\n  }\\r\\n  \\r\\n  .description-block {\\r\\n    flex-grow: 10;\\r\\n  }\\r\\n  \\r\\n  .description {\\r\\n    margin-top: 5px;\\r\\n    margin-bottom: 5px;\\r\\n  }\\r\\n  \\r\\n  .link-block {\\r\\n    color: DodgerBlue;\\r\\n    flex-grow: 1;\\r\\n  }\\r\\n  \\r\\n  .link-block a {\\r\\n    color: DodgerBlue;\\r\\n  }\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/css/newsBlockStyle.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/consts/months.js":
/*!******************************!*\
  !*** ./src/consts/months.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconsole.log('hello');\nvar months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];\n/* harmony default export */ __webpack_exports__[\"default\"] = (months);\n\n//# sourceURL=webpack://%5Bname%5D/./src/consts/months.js?");

/***/ }),

/***/ "./src/css/newsBlockStyle.css":
/*!************************************!*\
  !*** ./src/css/newsBlockStyle.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./newsBlockStyle.css */ \"./node_modules/css-loader/index.js!./src/css/newsBlockStyle.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack://%5Bname%5D/./src/css/newsBlockStyle.css?");

/***/ }),

/***/ "./src/services/renderNewsBlock.js":
/*!*****************************************!*\
  !*** ./src/services/renderNewsBlock.js ***!
  \*****************************************/
/*! exports provided: renderNewsBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderNewsBlock\", function() { return renderNewsBlock; });\n/* harmony import */ var _consts_months__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts/months */ \"./src/consts/months.js\");\n/* harmony import */ var _css_newsBlockStyle_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/newsBlockStyle.css */ \"./src/css/newsBlockStyle.css\");\n/* harmony import */ var _css_newsBlockStyle_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_newsBlockStyle_css__WEBPACK_IMPORTED_MODULE_1__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n\n\nvar removeNewsBlocks = function removeNewsBlocks() {\n  var newsContainer = document.querySelector('.news-container');\n\n  var childs = _toConsumableArray(newsContainer.children);\n\n  childs.forEach(function (elem) {\n    newsContainer.removeChild(elem);\n  });\n};\n\nvar renderNewsBlock = function renderNewsBlock(news) {\n  var newsContainer = document.querySelector('.news-container');\n  var items = [];\n  removeNewsBlocks();\n\n  if (news && news.length) {\n    news.forEach(function (item) {\n      var newsBlock = document.createElement('div');\n      var title = item.title,\n          urlToImage = item.urlToImage,\n          description = item.description,\n          url = item.url;\n      var date = new Date(item.publishedAt);\n      var displayDate = \"\".concat(date.getDate(), \" \").concat(_consts_months__WEBPACK_IMPORTED_MODULE_0__[\"default\"][date.getMonth()], \" \").concat(date.getFullYear());\n      newsBlock.classList.add('news-block');\n      newsBlock.innerHTML = \"\\n          <div class=\\\"title-block\\\">\\n            <img class=\\\"image\\\" src=\\\"\".concat(urlToImage, \"\\\">\\n            <div class=\\\"title-date\\\">\\n              <h3 class=\\\"title\\\">\").concat(title, \"</h3>\\n              <div class=\\\"date-block\\\">\").concat(displayDate, \"</div>\\n            </div>\\n          </div>\\n          <div class=\\\"description-block\\\">\\n            <p class=\\\"description\\\">\").concat(description, \"</p>\\n          </div>\\n          <div class=\\\"link-block\\\">\\n            <a href=\\\"\").concat(url, \"\\\" target=\\\"_blank\\\">read more</a>\\n          </div>\");\n      items.push(newsBlock);\n    });\n    items.forEach(function (newsBlock) {\n      newsContainer.appendChild(newsBlock);\n    });\n  }\n};\n\n//# sourceURL=webpack://%5Bname%5D/./src/services/renderNewsBlock.js?");

/***/ })

}]);