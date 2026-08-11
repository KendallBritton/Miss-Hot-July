// Conversation module for youGotAMessage experience
(function () {
  const messages = document.getElementById('messages');
  const responseList = document.getElementById('responseList');
  const usedChoiceIds = new Set();

  function appendBubble(text, type) {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${type}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function typeBubble(text, type, callback) {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${type}`;
    bubble.textContent = '';
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        bubble.textContent = text.slice(0, index + 1);
        messages.scrollTop = messages.scrollHeight;
        index += 1;

        if (index >= text.length) {
          clearInterval(intervalId);
          if (callback) callback();
        }
      }, 35);
    }, 3000);
  }

  function typeIntoElement(element, text, callback, speed = 35) {
    element.textContent = '';
    let index = 0;

    setTimeout(() => {
      const intervalId = setInterval(() => {
        element.textContent = text.slice(0, index + 1);
        index += 1;

        if (index >= text.length) {
          clearInterval(intervalId);
          if (callback) callback();
        }
      }, speed);
    }, 3000);
  }

  const convo = {
    start: {
      incoming: 'Hey Ariona — I’ve been thinking about you all day. Can I say something honest?',
      choices: [
        { id: 'r1a', text: 'Of course', next: 'r2a' }
      ]
    },
    r2a: {
      incoming: 'I really like being around you, and I’d love to take you out sometime.',
      choices: [
        { id: 'r2a1', text: 'That sounds lovely', next: 'r3a' }
      ]
    },
    r3a: {
      incoming: 'Would you let me take you on a real date — somewhere calm, somewhere warm, somewhere just for us?',
      choices: [
        { id: 'r3a1', text: 'Yes, I’d love that', next: 'ask' }
      ]
    },
    ask: {
      incoming: 'Ariona — will you be my girlfriend?',
      choices: [
        {
          id: 'yes',
          text: 'Yes, I’d love that',
          next: 'r4a'
        }
      ]
    },
    r4a: {
      incoming: 'Check out this link :)',
      link: '../love-letter.html'
    }
  };

  function renderChoices(choices) {
    responseList.innerHTML = '';
    if (!choices || choices.length === 0) {
      responseList.style.display = 'none';
      return;
    }
    responseList.style.display = 'grid';
    choices.forEach(choice => {
      if (usedChoiceIds.has(choice.id)) {
        return;
      }

      const btn = document.createElement('button');
      btn.dataset.next = choice.next || '';
      btn.disabled = true;
      btn.addEventListener('click', () => handleChoice(choice));
      responseList.appendChild(btn);

      typeIntoElement(btn, choice.text, () => {
        btn.disabled = false;
      }, 20);
    });
  }

  function handleChoice(choice) {
    if (choice.isTyping) return;

    usedChoiceIds.add(choice.id);
    responseList.innerHTML = '';
    appendBubble(choice.text, 'outgoing');

    setTimeout(() => {
      const next = choice.next;
      const node = convo[next] || { incoming: '...', choices: [] };

      if (node.link) {
        const linkBubble = document.createElement('div');
        linkBubble.className = 'bubble incoming';
        linkBubble.innerHTML = `<a href="${node.link}" style="color: inherit; text-decoration: underline;">${node.incoming}</a>`;
        messages.appendChild(linkBubble);
        messages.scrollTop = messages.scrollHeight;
        return;
      }

      typeBubble(node.incoming, 'incoming', () => {
        renderChoices(node.choices);
      });
    }, 450);
  }

  function init() {
    // Render start choices; keep existing initial bubble if present
    const hasInitial = !!messages.querySelector('.bubble');
    if (!hasInitial) appendBubble(convo.start.incoming, 'incoming');
    renderChoices(convo.start.choices);
  }

  window.Conversation = { init };
})();
