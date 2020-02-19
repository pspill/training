import md5 from "crypto-js/md5";
import moment from 'moment';

function createGravatarUrl(username) {
  let userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

export function promptForUsername() {
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formSel, inputSel) {
    this.form = document.querySelector(formSel);
    this.input = document.querySelector(inputSel);
  }

  init(submitCallback) {
    this.form.onsubmit = event => {
      event.preventDefault();
      let val = this.input.value;
      submitCallback(val);
      this.input.value = "";
    };

    this.form.querySelector("button").onClick = event =>
      this.form.onsubmit(event);
  }
}

export class ChatList {
  constructor(listSel, username) {
    this.list = document.querySelector(listSel);
    this.username = username;
  }

  init() {
    this.timer = setInterval(() => {
      document.querySelectorAll('[data-time]').forEach((element) => {
        let timestamp = new Date().setTime(element.getAttribute('data-time'));
        let ago = moment(timestamp).fromNow();
        element.textContent = ago;
      })
    }, 1000);
  }

  drawMessage({ user: u, timestamp: t, message: m }) {
    let messageRow = document.createElement("li");
    messageRow.setAttribute("class", "message-row");

    if (this.username === u) {
      messageRow.classList.add("me");
    }

    let message = document.createElement("p");

    let messageUsername = document.createElement("span");
    messageUsername.setAttribute("class", "message-username");
    messageUsername.textContent = u;

    message.appendChild(messageUsername);

    let messageTimestamp = document.createElement("span");
    messageTimestamp.setAttribute("class", "timestamp");
    messageTimestamp.setAttribute("data-time", t);
    messageTimestamp.textContent = moment(t).fromNow();

    message.appendChild(messageTimestamp);

    let messageText = document.createElement("span");
    messageText.setAttribute("class", "message-message");
    messageText.textContent = m;

    message.appendChild(messageText);

    let img = document.createElement('img');
    img.src = createGravatarUrl(u);
    img.title = u;

    messageRow.appendChild(img);
    messageRow.appendChild(message);
    this.list.appendChild(messageRow);
    messageRow.scrollIntoView();
  }
}
