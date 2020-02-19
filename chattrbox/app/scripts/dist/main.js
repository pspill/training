(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wsClient = _interopRequireDefault(require("./ws-client"));

var _dom = require("./dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FORM_SELECTOR = '[data-chat="chat-form"]';
var INPUT_SELECTOR = '[data-chat="message-input"]';
var LIST_SELECTOR = '[data-chat="message-list"]';

var ChatApp = function ChatApp() {
  var _this = this;

  _classCallCheck(this, ChatApp);

  this.chatForm = new _dom.ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
  this.chatList = new _dom.ChatList(LIST_SELECTOR, 'wonderwoman');

  _wsClient["default"].init("ws://localhost:3001");

  _wsClient["default"].registerOpenHandler(function () {
    _this.chatForm.init(function (text) {
      var message = new ChatMessage({
        message: text
      });

      _wsClient["default"].sendMessage(message.serialize());
    });
  });

  _wsClient["default"].registerMessageHandler(function (data) {
    var message = new ChatMessage(data);

    _this.chatList.drawMessage(message.serialize());
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

},{"./dom":2,"./ws-client":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatList = exports.ChatForm = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChatForm =
/*#__PURE__*/
function () {
  function ChatForm(formSel, inputSel) {
    _classCallCheck(this, ChatForm);

    this.form = document.querySelector(formSel);
    this.input = document.querySelector(inputSel);
  }

  _createClass(ChatForm, [{
    key: "init",
    value: function init(submitCallback) {
      var _this = this;

      this.form.onsubmit = function (event) {
        event.preventDefault();
        var val = _this.input.value;
        submitCallback(val);
        _this.input.value = '';
      };

      this.form.querySelector('button').onClick = function (event) {
        return _this.form.onsubmit(event);
      };
    }
  }]);

  return ChatForm;
}();

exports.ChatForm = ChatForm;

var ChatList =
/*#__PURE__*/
function () {
  function ChatList(listSel, username) {
    _classCallCheck(this, ChatList);

    this.list = document.querySelector(listSel);
    this.username = username;
  }

  _createClass(ChatList, [{
    key: "drawMessage",
    value: function drawMessage(_ref) {
      var u = _ref.user,
          t = _ref.timestamp,
          m = _ref.message;
      var messageRow = document.createElement('li');
      messageRow.setAttribute('class', 'message-row');

      if (this.username === u) {
        messageRow.classList.add('me');
      }

      var message = document.createElement('p');
      var messageUsername = document.createElement('span');
      messageUsername.setAttribute('class', 'message-username');
      messageUsername.textContent = u;
      message.appendChild(messageUsername);
      var messageTimestamp = document.createElement('span');
      messageTimestamp.setAttribute('class', 'timestamp');
      messageTimestamp.setAttribute('data-time', t);
      messageTimestamp.textContent = new Date(t).getTime();
      message.appendChild(messageTimestamp);
      var messageText = document.createElement('span');
      messageText.setAttribute('class', 'message-message');
      messageText.textContent = m;
      message.appendChild(messageText);
      messageRow.appendChild(message);
      this.list.appendChild(messageRow);
      messageRow.scrollIntoView();
    }
  }]);

  return ChatList;
}();

exports.ChatList = ChatList;

},{}],3:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _app["default"]();

},{"./app":1}],4:[function(require,module,exports){
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

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL2RvbS5qcyIsImFwcC9zY3JpcHRzL3NyYy9tYWluLmpzIiwiYXBwL3NjcmlwdHMvc3JjL3dzLWNsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU0sYUFBYSxHQUFHLHlCQUF0QjtBQUNBLElBQU0sY0FBYyxHQUFHLDZCQUF2QjtBQUNBLElBQU0sYUFBYSxHQUFHLDRCQUF0Qjs7SUFFTSxPLEdBQ0osbUJBQWM7QUFBQTs7QUFBQTs7QUFDWixPQUFLLFFBQUwsR0FBZ0IsSUFBSSxhQUFKLENBQWEsYUFBYixFQUE0QixjQUE1QixDQUFoQjtBQUNBLE9BQUssUUFBTCxHQUFnQixJQUFJLGFBQUosQ0FBYSxhQUFiLEVBQTRCLGFBQTVCLENBQWhCOztBQUVBLHVCQUFPLElBQVAsQ0FBWSxxQkFBWjs7QUFDQSx1QkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQy9CLElBQUEsS0FBSSxDQUFDLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFVBQUMsSUFBRCxFQUFVO0FBQzNCLFVBQUksT0FBTyxHQUFHLElBQUksV0FBSixDQUFnQjtBQUFDLFFBQUEsT0FBTyxFQUFFO0FBQVYsT0FBaEIsQ0FBZDs7QUFDQSwyQkFBTyxXQUFQLENBQW1CLE9BQU8sQ0FBQyxTQUFSLEVBQW5CO0FBQ0QsS0FIRDtBQUlELEdBTEQ7O0FBTUEsdUJBQU8sc0JBQVAsQ0FBOEIsVUFBQSxJQUFJLEVBQUk7QUFDcEMsUUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFKLENBQWdCLElBQWhCLENBQWQ7O0FBQ0EsSUFBQSxLQUFJLENBQUMsUUFBTCxDQUFjLFdBQWQsQ0FBMEIsT0FBTyxDQUFDLFNBQVIsRUFBMUI7QUFDQyxHQUhIO0FBSUQsQzs7SUFHRyxXOzs7QUFDSiw2QkFJRztBQUFB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QUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNIOztlQUVjO0FBQ1gsRUFBQSxJQUFJLEVBQUosSUFEVztBQUVYLEVBQUEsbUJBQW1CLEVBQW5CLG1CQUZXO0FBR1gsRUFBQSxzQkFBc0IsRUFBdEIsc0JBSFc7QUFJWCxFQUFBLFdBQVcsRUFBWDtBQUpXLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gXCIuL3dzLWNsaWVudFwiO1xuaW1wb3J0IHsgQ2hhdEZvcm0sIENoYXRMaXN0IH0gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBGT1JNX1NFTEVDVE9SID0gJ1tkYXRhLWNoYXQ9XCJjaGF0LWZvcm1cIl0nO1xuY29uc3QgSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtY2hhdD1cIm1lc3NhZ2UtaW5wdXRcIl0nO1xuY29uc3QgTElTVF9TRUxFQ1RPUiA9ICdbZGF0YS1jaGF0PVwibWVzc2FnZS1saXN0XCJdJztcblxuY2xhc3MgQ2hhdEFwcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2hhdEZvcm0gPSBuZXcgQ2hhdEZvcm0oRk9STV9TRUxFQ1RPUiwgSU5QVVRfU0VMRUNUT1IpO1xuICAgIHRoaXMuY2hhdExpc3QgPSBuZXcgQ2hhdExpc3QoTElTVF9TRUxFQ1RPUiwgJ3dvbmRlcndvbWFuJyk7XG5cbiAgICBzb2NrZXQuaW5pdChcIndzOi8vbG9jYWxob3N0OjMwMDFcIik7XG4gICAgc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xuICAgICAgdGhpcy5jaGF0Rm9ybS5pbml0KCh0ZXh0KSA9PiB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gbmV3IENoYXRNZXNzYWdlKHttZXNzYWdlOiB0ZXh0fSk7XG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZShtZXNzYWdlLnNlcmlhbGl6ZSgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGRhdGEgPT4ge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgQ2hhdE1lc3NhZ2UoZGF0YSk7XG4gICAgICB0aGlzLmNoYXRMaXN0LmRyYXdNZXNzYWdlKG1lc3NhZ2Uuc2VyaWFsaXplKCkpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgQ2hhdE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgbWVzc2FnZTogbSxcbiAgICB1c2VyOiB1ID0gXCJ3b25kZXJ3b21hblwiLFxuICAgIHRpbWVzdGFtcDogdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gIH0pIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtO1xuICAgIHRoaXMudXNlciA9IHU7XG4gICAgdGhpcy50aW1lc3RhbXAgPSB0O1xuICB9XG5cbiAgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyOiB0aGlzLnVzZXIsXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0QXBwO1xuIiwiZXhwb3J0IGNsYXNzIENoYXRGb3JtIHtcbiAgICBjb25zdHJ1Y3Rvcihmb3JtU2VsLCBpbnB1dFNlbCkge1xuICAgICAgICB0aGlzLmZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm1TZWwpO1xuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbnB1dFNlbCk7XG4gICAgfVxuXG4gICAgaW5pdChzdWJtaXRDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmZvcm0ub25zdWJtaXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIHN1Ym1pdENhbGxiYWNrKHZhbCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgIHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5vbkNsaWNrID0gKGV2ZW50KSA9PiB0aGlzLmZvcm0ub25zdWJtaXQoZXZlbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoYXRMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0U2VsLCB1c2VybmFtZSkge1xuICAgICAgICB0aGlzLmxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxpc3RTZWwpO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgfVxuXG4gICAgZHJhd01lc3NhZ2Uoe3VzZXI6IHUsIHRpbWVzdGFtcDogdCwgbWVzc2FnZTogbX0pIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBtZXNzYWdlUm93LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWVzc2FnZS1yb3cnKTtcblxuICAgICAgICBpZiAodGhpcy51c2VybmFtZSA9PT0gdSkge1xuICAgICAgICAgIG1lc3NhZ2VSb3cuY2xhc3NMaXN0LmFkZCgnbWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgICAgIGxldCBtZXNzYWdlVXNlcm5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIG1lc3NhZ2VVc2VybmFtZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lc3NhZ2UtdXNlcm5hbWUnKTtcbiAgICAgICAgbWVzc2FnZVVzZXJuYW1lLnRleHRDb250ZW50ID0gdTtcblxuICAgICAgICBtZXNzYWdlLmFwcGVuZENoaWxkKG1lc3NhZ2VVc2VybmFtZSk7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VUaW1lc3RhbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIG1lc3NhZ2VUaW1lc3RhbXAuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aW1lc3RhbXAnKTtcbiAgICAgICAgbWVzc2FnZVRpbWVzdGFtcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZScsIHQpO1xuICAgICAgICBtZXNzYWdlVGltZXN0YW1wLnRleHRDb250ZW50ID0gKG5ldyBEYXRlKHQpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChtZXNzYWdlVGltZXN0YW1wKTtcblxuICAgICAgICBsZXQgbWVzc2FnZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIG1lc3NhZ2VUZXh0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWVzc2FnZS1tZXNzYWdlJyk7XG4gICAgICAgIG1lc3NhZ2VUZXh0LnRleHRDb250ZW50ID0gbTtcblxuICAgICAgICBtZXNzYWdlLmFwcGVuZENoaWxkKG1lc3NhZ2VUZXh0KTtcblxuICAgICAgICBtZXNzYWdlUm93LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQobWVzc2FnZVJvdyk7XG4gICAgICAgIG1lc3NhZ2VSb3cuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2hhdEFwcCBmcm9tICcuL2FwcCc7XG5uZXcgQ2hhdEFwcCgpOyIsImxldCBzb2NrZXQ7XG5cbmZ1bmN0aW9uIGluaXQodXJsKSB7XG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdjb25uZWN0aW5nLi4uJyk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XG4gICAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgaGFuZGxlckZ1bmN0aW9uKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIGUuZGF0YSk7XG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgICAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQsXG4gICAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxuICAgIHNlbmRNZXNzYWdlLFxufVxuXG4iXX0=
