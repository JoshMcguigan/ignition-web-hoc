module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function Request(successCallback, errorCallback, requestMethod, url, payloadKeyName) {
    var _this = this;

    _classCallCheck(this, Request);

    this.setPollConfig = function (pollConfig) {
        Object.assign(_this.config.poll, pollConfig);
    };

    this.setBody = function (body) {
        _this._body = body;
        _this.trigger();
    };

    this.trigger = function () {
        // cancel existing executions and currently scheduled future executions
        _this.xhr.abort();
        clearTimeout(_this.futureTrigger);

        _this.xhr.open(_this.requestMethod, _this.url);
        var body = {};
        body[_this.payloadKeyName] = _this._body;
        _this.xhr.send(JSON.stringify(body));
    };

    this.requestMethod = requestMethod;
    this.url = url;
    this.payloadKeyName = payloadKeyName;

    this.config = {
        poll: {
            enable: false,
            successRate: 5000,
            errorRate: 60000
        }
    };

    this.xhr = new XMLHttpRequest();
    this.xhr.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;
        var CANCELLED = 0;
        if (_this.xhr.readyState === DONE) {
            if (_this.xhr.status === OK) {
                var response = JSON.parse(_this.xhr.responseText);
                successCallback(response);
                if (_this.config.poll.enable) {
                    _this.futureTrigger = setTimeout(function () {
                        return _this.trigger();
                    }, _this.config.poll.successRate);
                }
            } else if (_this.xhr.status !== CANCELLED) {
                errorCallback(_this.xhr.status);
                if (_this.config.poll.enable) {
                    _this.futureTrigger = setTimeout(function () {
                        return _this.trigger();
                    }, _this.config.poll.errorRate);
                }
            }
        }
    };
};

exports.default = Request;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request = __webpack_require__(0);

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagBrowser = function TagBrowser(successCallback, errorCallback) {
    var requestMethod = 'POST';
    // Ensure package.json is configured to proxy requests to the Ignition server
    var url = '/main/system/webdev/api/tagBrowse';
    var payloadKeyName = 'rootPath';

    var request = new _Request2.default(successCallback, errorCallback, requestMethod, url, payloadKeyName);
    request.setRootPath = request.setBody;
    return request;
};

exports.default = TagBrowser;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request = __webpack_require__(0);

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagReader = function TagReader(successCallback, errorCallback) {
    var requestMethod = 'POST';
    // Ensure package.json is configured to proxy requests to the Ignition server
    var url = '/main/system/webdev/api/tagRead';
    var payloadKeyName = 'tagPaths';

    var pollConfig = {
        enable: true
    };

    var request = new _Request2.default(successCallback, errorCallback, requestMethod, url, payloadKeyName);
    request.setPollConfig(pollConfig);
    request.setTagPaths = request.setBody;
    return request;
};

exports.default = TagReader;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _TagReader = __webpack_require__(2);

var _TagReader2 = _interopRequireDefault(_TagReader);

var _TagBrowser = __webpack_require__(1);

var _TagBrowser2 = _interopRequireDefault(_TagBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function IgnWeb(WrappedComponent) {
    var IgnWeb = function (_React$Component) {
        _inherits(IgnWeb, _React$Component);

        function IgnWeb(props) {
            _classCallCheck(this, IgnWeb);

            var _this = _possibleConstructorReturn(this, (IgnWeb.__proto__ || Object.getPrototypeOf(IgnWeb)).call(this, props));

            _this.tagReaderSuccessCallback = function (response) {
                var newState = {
                    tagReader: {
                        loading: false,
                        error: false,
                        data: response
                    }
                };
                _this.setState(newState, function () {
                    if (typeof _this._tagReaderSuccessCallback === 'function') {
                        _this._tagReaderSuccessCallback();
                    }
                });
            };

            _this.tagReaderSetSuccessCallback = function (callback) {
                _this._tagReaderSuccessCallback = callback;
            };

            _this.tagReaderErrorCallback = function (status) {
                var newState = {
                    tagReader: {
                        error: true
                    }
                };
                _this.setState(newState);
            };

            _this.tagBrowserSuccessCallback = function (response) {
                var newState = {
                    tagBrowser: {
                        loading: false,
                        error: false,
                        data: response
                    }
                };
                _this.setState(newState, function () {
                    if (typeof _this._tagBrowserSuccessCallback === 'function') {
                        _this._tagBrowserSuccessCallback();
                    }
                });
            };

            _this.tagBrowserSetSuccessCallback = function (callback) {
                _this._tagBrowserSuccessCallback = callback;
            };

            _this.tagBrowserErrorCallback = function (status) {
                var newState = {
                    tagBrowser: {
                        error: true
                    }
                };
                _this.setState(newState);
            };

            _this.state = {
                tagReader: {
                    loading: true,
                    error: false,
                    data: {}
                },
                tagBrowser: {
                    loading: true,
                    error: false,
                    data: {}
                }

            };

            _this.tagReader = new _TagReader2.default(_this.tagReaderSuccessCallback, _this.tagReaderErrorCallback);

            _this.tagBrowser = new _TagBrowser2.default(_this.tagBrowserSuccessCallback, _this.tagBrowserErrorCallback);
            return _this;
        }

        _createClass(IgnWeb, [{
            key: 'render',
            value: function render() {
                var tagReader = this.state.tagReader;
                tagReader.trigger = this.tagReader.trigger;
                tagReader.setTagPaths = this.tagReader.setTagPaths;
                tagReader.setSuccessCallback = this.tagReader.setSuccessCallback;
                tagReader.setPollConfig = this.tagReader.setPollConfig;

                var tagBrowser = this.state.tagBrowser;
                tagBrowser.trigger = this.tagBrowser.trigger;
                tagBrowser.setRootPath = this.tagBrowser.setRootPath;
                tagBrowser.setSuccessCallback = this.tagBrowserSetSuccessCallback;
                tagBrowser.setPollConfig = this.tagReader.setPollConfig;

                return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
                    tagReader: tagReader,
                    tagBrowser: tagBrowser
                }));
            }
        }]);

        return IgnWeb;
    }(_react2.default.Component);

    IgnWeb.displayName = 'IgnWeb(' + getDisplayName(WrappedComponent) + ')';
    return IgnWeb;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

exports.default = IgnWeb;

/***/ })
/******/ ]);