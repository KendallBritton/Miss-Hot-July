// Conversation module for youGotAMessage experience
(function () {
  const messages = document.getElementById('messages');
  const responseList = document.getElementById('responseList');

  function appendBubble(text, type) {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${type}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  const convo = {
    start: {
      incoming: 'Hey! You free tonight?',
      choices: [
        { id: 'r1a', text: 'Sure, what time?', next: 'r2a' },
        { id: 'r1b', text: 'Maybe, who is this again?', next: 'dead1' },
        { id: 'r1c', text: 'I’m busy, sorry!', next: 'end_busy' }
      ]
    },
    r2a: {
      incoming: 'How about 7? There is a new rooftop spot.',
      choices: [
        { id: 'r2a1', text: 'Sounds perfect', next: 'r3a' },
        { id: 'r2a2', text: 'I don’t do rooftop bars', next: 'dead_rooftop' },
        { id: 'r2a3', text: 'Who else is going?', next: 'r3b' }
      ]
    },
    r3a: {
      incoming: 'Great — I’ll grab us a table. You into live music?',
      choices: [
        { id: 'r3a1', text: 'Love live music', next: 'r4a' },
        { id: 'r3a2', text: 'Not really', next: 'r4b' },
        { id: 'r3a3', text: 'Depends who’s playing', next: 'dead_band' }
      ]
    },
    r3b: {
      incoming: 'Just a small group of friends — mostly chill.',
      choices: [
        { id: 'r3b1', text: 'Alright, count me in', next: 'r4a' },
        { id: 'r3b2', text: 'Maybe another time', next: 'end_cancel' },
        { id: 'r3b3', text: 'Send me the address', next: 'r4c' }
      ]
    },
    r4a: {
      incoming: 'Perfect. Also, I was thinking we could grab coffee sometime this week?',
      choices: [
        { id: 'r4a1', text: 'Yes, let’s set it up', next: 'r5a' },
        { id: 'r4a2', text: 'Let’s keep it casual', next: 'r5b' },
        { id: 'r4a3', text: 'Weird question, why?', next: 'dead_weird' }
      ]
    },
    r4b: {
      incoming: 'No worries — we can do something low-key instead.',
      choices: [
        { id: 'r4b1', text: 'I like that idea', next: 'r5a' },
        { id: 'r4b2', text: 'I’m still busy', next: 'end_busy' },
        { id: 'r4b3', text: 'Surprise me', next: 'r5c' }
      ]
    },
    r4c: {
      incoming: 'Sending it now. Also — have you thought about us lately?',
      choices: [
        { id: 'r4c1', text: 'Hmm... yes, actually', next: 'r5a' },
        { id: 'r4c2', text: 'What do you mean?', next: 'r5b' },
        { id: 'r4c3', text: 'You’re being mysterious', next: 'dead_mystery' }
      ]
    },
    r5a: {
      incoming: 'I’ve been thinking about you a lot — in a good way.',
      choices: [
        { id: 'r5a1', text: 'Me too', next: 'ask' },
        { id: 'r5a2', text: 'That’s sweet', next: 'ask' },
        { id: 'r5a3', text: 'Glad to hear it', next: 'ask' }
      ]
    },
    r5b: {
      incoming: 'I just like hanging out with you — feels easy.',
      choices: [
        { id: 'r5b1', text: 'Same here', next: 'ask' },
        { id: 'r5b2', text: 'I enjoy it too', next: 'ask' },
        { id: 'r5b3', text: 'Okay, tell me more', next: 'ask' }
      ]
    },
    r5c: {
      incoming: 'Surprises are my specialty — maybe let me show you?',
      choices: [
        { id: 'r5c1', text: 'I’m intrigued', next: 'ask' },
        { id: 'r5c2', text: 'You’ve got my curiosity', next: 'ask' },
        { id: 'r5c3', text: 'Do you always plan surprises?', next: 'ask' }
      ]
    },
    ask: {
      incoming: 'Ariona — will you be my girlfriend?',
      choices: [
        { id: 'yes', text: 'Yes!', next: null },
        { id: 'no', text: 'I need more time', next: null },
        { id: 'maybe', text: 'Let’s see how it goes', next: null }
      ]
    },

    /* Previously dead-ends are converted into short, unique bridge paths that
       each lead back into one of the r5 nodes, ensuring every branch reaches the end */
    dead1: {
      incoming: 'Haha, classic. I’ll text my name — Alex.',
      choices: [ { id: 'd1_1', text: 'Oh hey Alex', next: 'bridge1' } ]
    },
    bridge1: {
      incoming: 'Alex: I’ve actually been meaning to tell you something a bit personal.',
      choices: [ { id: 'b1_1', text: 'Go on', next: 'r5a' }, { id: 'b1_2', text: 'Now?', next: 'r5b' } ]
    },

    dead_rooftop: {
      incoming: 'No worries — we’ll find somewhere else.',
      choices: [ { id: 'dr_1', text: 'Where to then?', next: 'bridge2' } ]
    },
    bridge2: {
      incoming: 'How about a little cafe by the river? Cozy vibes.',
      choices: [ { id: 'b2_1', text: 'That sounds nice', next: 'r5b' }, { id: 'b2_2', text: 'I’m curious', next: 'r5c' } ]
    },

    dead_band: {
      incoming: 'Okay, maybe not tonight then.',
      choices: [ { id: 'db_1', text: 'Maybe another night', next: 'bridge3' } ]
    },
    bridge3: {
      incoming: 'No rush — I like spending time with you even on quiet nights.',
      choices: [ { id: 'b3_1', text: 'That’s sweet', next: 'r5a' }, { id: 'b3_2', text: 'Same here', next: 'r5b' } ]
    },

    dead_weird: {
      incoming: 'Just being honest — no pressure!',
      choices: [ { id: 'dw_1', text: 'I appreciate honesty', next: 'bridge4' } ]
    },
    bridge4: {
      incoming: 'Sometimes honesty leads to surprises — like this question.',
      choices: [ { id: 'b4_1', text: 'I’m listening', next: 'r5c' }, { id: 'b4_2', text: 'Okay, tell me', next: 'r5a' } ]
    },

    dead_mystery: {
      incoming: 'All in good fun 😄',
      choices: [ { id: 'dm_1', text: 'You’re mysterious indeed', next: 'bridge5' } ]
    },
    bridge5: {
      incoming: 'Mysterious can mean thoughtful plans — want to hear mine?',
      choices: [ { id: 'b5_1', text: 'Yes, tell me', next: 'r5c' }, { id: 'b5_2', text: 'Surprise me', next: 'r5a' } ]
    },

    end_busy: {
      incoming: 'Totally understand. Catch you later!',
      choices: [ { id: 'eb_1', text: 'Let’s reschedule', next: 'bridge6' } ]
    },
    bridge6: {
      incoming: 'Whenever you’re free, I’d love to hang — maybe coffee?',
      choices: [ { id: 'b6_1', text: 'Works for me', next: 'r5b' }, { id: 'b6_2', text: 'I’ll check my week', next: 'r5a' } ]
    },

    end_cancel: {
      incoming: 'Alright, maybe next time. Take care!',
      choices: [ { id: 'ec_1', text: 'Take care too', next: 'bridge7' } ]
    },
    bridge7: {
      incoming: 'If you change your mind I’ll be around — also, real question soon.',
      choices: [ { id: 'b7_1', text: 'I’ll think about it', next: 'r5c' }, { id: 'b7_2', text: 'Okay, see you', next: 'r5a' } ]
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
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.dataset.next = choice.next || '';
      btn.addEventListener('click', () => handleChoice(choice));
      responseList.appendChild(btn);
    });
  }

  function handleChoice(choice) {
    // enforce single-choice: clear list immediately
    responseList.innerHTML = '';
    appendBubble(choice.text, 'outgoing');
    setTimeout(() => {
      const next = choice.next;
      const node = convo[next] || { incoming: '...', choices: [] };
      appendBubble(node.incoming, 'incoming');
      renderChoices(node.choices);
    }, 700);
  }

  function init() {
    // Render start choices; keep existing initial bubble if present
    const hasInitial = !!messages.querySelector('.bubble');
    if (!hasInitial) appendBubble(convo.start.incoming, 'incoming');
    renderChoices(convo.start.choices);
  }

  window.Conversation = { init };
})();
