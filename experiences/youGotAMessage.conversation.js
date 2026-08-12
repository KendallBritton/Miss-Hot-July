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
        { id: 'r1a', text: 'Well who else would it be?', next: 'r2a' }
      ]
    },
    r2a: {
      incoming: 'You never know smh! Anyways, I really like being around you, and I was curious if you’d perhaps like to go on a date with me at some point?',
      choices: [
        { id: 'r2a1', text: 'Mmmmmm it depends where you’re trying to take me Kendall', next: 'r3a' }
      ]
    },
    r3a: {
      incoming: 'I was thinking maybe we could go to that Italian place in Uptown, and then maybe laugh over a sweet treat afterwards. If not we could always play a game of pool??',
      choices: [
        { id: 'r3a1', text: 'Don’t play with me Kendall... but I’m always down for some good food! Just make sure to buy me a margarita too ;)', next: 'ask' }
      ]
    },
    ask: {
      incoming: 'Perfect! I’ll head over in a little bit to pick you up! Take all the time you need to get ready.',
      choices: [
        {
          id: 'yes',
          text: 'Okay, sounds good! I’ll be ready in a few minutes.',
          next: 'r4a'
        }
      ]
    },
    r4a: {
      incoming: 'In the meantime, whenever you get a chance, check out this link I sent you. I think you’ll like it. :)',
      next: 'r5a'
    },
    r5a: {
      incoming: 'Check out this link',
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

      const renderNode = (currentNode) => {
        if (currentNode.link) {
          const linkBubble = document.createElement('div');
          linkBubble.className = 'bubble incoming';
          linkBubble.innerHTML = `<a href="${currentNode.link}" style="color: inherit; text-decoration: underline;">${currentNode.incoming}</a>`;
          messages.appendChild(linkBubble);
          messages.scrollTop = messages.scrollHeight;
          return;
        }

        typeBubble(currentNode.incoming, 'incoming', () => {
          if (currentNode.next && (!currentNode.choices || currentNode.choices.length === 0)) {
            renderNode(convo[currentNode.next] || { incoming: '...', choices: [] });
          } else {
            renderChoices(currentNode.choices);
          }
        });
      };

      renderNode(node);
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
