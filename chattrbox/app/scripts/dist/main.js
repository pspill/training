(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wsClient = _interopRequireDefault(require("./ws-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  _wsClient["default"].init("ws://localhost:3001");

  _wsClient["default"].registerOpenHandler(function () {
    var message = new ChatMessage({
      message: "pow!"
    });

    _wsClient["default"].sendMessage(message.serialize());
  });

  _wsClient["default"].registerMessageHandler(function (data) {
    console.log(data);
  });
};

var ChatMessage =
/*#__PURE__*/
function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === void 0 ? "wonderwoman" : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === void 0 ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  _createClass(ChatMessage, [{
    key: "serialize",
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

var _default = ChatApp;
exports["default"] = _default;

},{"./ws-client":3}],2:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _app["default"]();

},{"./app":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = function (e) {
    console.log('message', e.data);
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

var _default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};
exports["default"] = _default;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0lBRU0sTyxHQUNKLG1CQUFjO0FBQUE7O0FBQ1osdUJBQU8sSUFBUCxDQUFZLHFCQUFaOztBQUNBLHVCQUFPLG1CQUFQLENBQTJCLFlBQU07QUFDL0IsUUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFKLENBQWdCO0FBQUUsTUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFoQixDQUFkOztBQUNBLHlCQUFPLFdBQVAsQ0FBbUIsT0FBTyxDQUFDLFNBQVIsRUFBbkI7QUFDRCxHQUhEOztBQUlBLHVCQUFPLHNCQUFQLENBQThCLFVBQUEsSUFBSSxFQUFJO0FBQ3BDLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0QsR0FGRDtBQUdELEM7O0lBR0csVzs7O0FBQ0osNkJBSUc7QUFBQSxRQUhRLENBR1IsUUFIRCxPQUdDO0FBQUEseUJBRkQsSUFFQztBQUFBLFFBRkssQ0FFTCwwQkFGUyxhQUVUO0FBQUEsOEJBREQsU0FDQztBQUFBLFFBRFUsQ0FDViwrQkFEYyxJQUFJLElBQUosR0FBVyxPQUFYLEVBQ2Q7O0FBQUE7O0FBQ0QsU0FBSyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFNBQUssSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDRDs7OztnQ0FFVztBQUNWLGFBQU87QUFDTCxRQUFBLElBQUksRUFBRSxLQUFLLElBRE47QUFFTCxRQUFBLE9BQU8sRUFBRSxLQUFLLE9BRlQ7QUFHTCxRQUFBLFNBQVMsRUFBRSxLQUFLO0FBSFgsT0FBUDtBQUtEOzs7Ozs7ZUFHWSxPOzs7Ozs7QUNuQ2Y7Ozs7QUFDQSxJQUFJLGVBQUo7Ozs7Ozs7OztBQ0RBLElBQUksTUFBSjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2YsRUFBQSxNQUFNLEdBQUcsSUFBSSxTQUFKLENBQWMsR0FBZCxDQUFUO0FBQ0EsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7QUFDSDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzFDLEVBQUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsWUFBTTtBQUNsQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtBQUNBLElBQUEsZUFBZTtBQUNsQixHQUhEO0FBSUg7O0FBRUQsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxFQUFpRDtBQUM3QyxFQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3RCLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLENBQUMsQ0FBQyxJQUF6QjtBQUNBLFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQyxDQUFDLElBQWIsQ0FBWDtBQUNBLElBQUEsZUFBZSxDQUFDLElBQUQsQ0FBZjtBQUNILEdBSkQ7QUFLSDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDMUIsRUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0g7O2VBRWM7QUFDWCxFQUFBLElBQUksRUFBSixJQURXO0FBRVgsRUFBQSxtQkFBbUIsRUFBbkIsbUJBRlc7QUFHWCxFQUFBLHNCQUFzQixFQUF0QixzQkFIVztBQUlYLEVBQUEsV0FBVyxFQUFYO0FBSlcsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSBcIi4vd3MtY2xpZW50XCI7XG5cbmNsYXNzIENoYXRBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzb2NrZXQuaW5pdChcIndzOi8vbG9jYWxob3N0OjMwMDFcIik7XG4gICAgc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgQ2hhdE1lc3NhZ2UoeyBtZXNzYWdlOiBcInBvdyFcIiB9KTtcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZShtZXNzYWdlLnNlcmlhbGl6ZSgpKTtcbiAgICB9KTtcbiAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihkYXRhID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIENoYXRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIG1lc3NhZ2U6IG0sXG4gICAgdXNlcjogdSA9IFwid29uZGVyd29tYW5cIixcbiAgICB0aW1lc3RhbXA6IHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICB9KSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbTtcbiAgICB0aGlzLnVzZXIgPSB1O1xuICAgIHRoaXMudGltZXN0YW1wID0gdDtcbiAgfVxuXG4gIHNlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFwcDtcbiIsImltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJztcbm5ldyBDaGF0QXBwKCk7IiwibGV0IHNvY2tldDtcblxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLi4nKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJPcGVuSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcbiAgICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnb3BlbicpO1xuICAgICAgICBoYW5kbGVyRnVuY3Rpb24oKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlJywgZS5kYXRhKTtcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdCxcbiAgICByZWdpc3Rlck9wZW5IYW5kbGVyLFxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXG4gICAgc2VuZE1lc3NhZ2UsXG59XG5cbiJdfQ==
