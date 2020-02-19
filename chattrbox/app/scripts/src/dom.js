export class ChatForm {
    constructor(formSel, inputSel) {
        this.form = document.querySelector(formSel);
        this.input = document.querySelector(inputSel);
    }

    init(submitCallback) {
        this.form.onsubmit = (event) => {
            event.preventDefault();
            let val = this.input.value;
            submitCallback(val);
            this.input.value = '';
        }

    this.form.querySelector('button').onClick = (event) => this.form.onsubmit(event);
    }
}

export class ChatList {
    constructor(listSel, username) {
        this.list = document.querySelector(listSel);
        this.username = username;
    }

    drawMessage({user: u, timestamp: t, message: m}) {
        let messageRow = document.createElement('li');
        messageRow.setAttribute('class', 'message-row');

        if (this.username === u) {
          messageRow.classList.add('me');
        }

        let message = document.createElement('p');

        let messageUsername = document.createElement('span');
        messageUsername.setAttribute('class', 'message-username');
        messageUsername.textContent = u;

        message.appendChild(messageUsername);

        let messageTimestamp = document.createElement('span');
        messageTimestamp.setAttribute('class', 'timestamp');
        messageTimestamp.setAttribute('data-time', t);
        messageTimestamp.textContent = (new Date(t)).getTime();

        message.appendChild(messageTimestamp);

        let messageText = document.createElement('span');
        messageText.setAttribute('class', 'message-message');
        messageText.textContent = m;

        message.appendChild(messageText);

        messageRow.appendChild(message);
        this.list.appendChild(messageRow);
        messageRow.scrollIntoView();
    }
}
