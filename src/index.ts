type Answer = 'LEFT' | 'RIGHT' | 'waiting-for-answer';

type State = {
  prompt: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;
  result: HTMLElement;
  phase: 'get-ready' | 'prompt' | 'result' | 'debug';
  phaseChangeTimestamp: number;
  answer: Answer;
};

const init = () => {
  const state: State = {
    prompt: document.getElementById('prompt') as HTMLElement,
    left: document.getElementById('left') as HTMLElement,
    right: document.getElementById('right') as HTMLElement,
    result: document.getElementById('result') as HTMLElement,

    phase: 'get-ready',
    phaseChangeTimestamp: 0,
    answer: 'waiting-for-answer',
  };

  state.prompt.innerText = 'Get ready!';

  state.left.addEventListener('click', () => {
    if (state.answer === 'waiting-for-answer' && state.phase === 'prompt') {
      state.answer = 'LEFT';
    }
  });

  state.right.addEventListener('click', () => {
    if (state.answer === 'waiting-for-answer' && state.phase === 'prompt') {
      state.answer = 'RIGHT';
    }
  });

  window.requestAnimationFrame(mainLoop(state));
};

const getReady = (state: State, secondsSincePhaseChange: number): State => {
  if (secondsSincePhaseChange >= 5) {
    const prompts = ['LEFT', 'RIGHT'];
    state.prompt.innerText = prompts[Math.floor(Math.random() * prompts.length)];
    state.phase = 'prompt';
    return state;
  }

  if (secondsSincePhaseChange >= 2) {
    state.prompt.innerText = Math.ceil(5 - secondsSincePhaseChange).toString();
    return state;
  }

  if (secondsSincePhaseChange < 2) {
    state.prompt.innerText = 'Get ready!';
    return state;
  }

  return state;
};

const promptController = (state: State, secondsSincePhaseChange: number): State => {
  if (state.answer === state.prompt.innerText) {
    displayReward(state.result);
    state.phase = 'result';
  }

  if (state.answer !== state.prompt.innerText && state.answer !== 'waiting-for-answer') {
    state.result.innerHTML = `
      <img src="https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" alt="">
    `;
    state.phase = 'result';
  }

  if (secondsSincePhaseChange > 3) {
    state.result.innerHTML = `
      <img src="https://media.giphy.com/media/znqw31I9dBDI4QJtxP/giphy.gif" alt="">
    `;

    state.phase = 'result';
  }

  return state;
};

const resultController = (state: State, secondsSincePhaseChange: number): State => {
  if (secondsSincePhaseChange > 5) {
    state.result.innerHTML = '';
    state.phase = 'get-ready';
    state.answer = 'waiting-for-answer';
  }
  return state;
};

const mainLoop = (state: State) => (timestamp: DOMHighResTimeStamp) => {
  const secondsSincePhaseChange = (timestamp - state.phaseChangeTimestamp) / 1000;
  const oldPhase = state.phase;

  switch (state.phase) {
    case 'get-ready':
      state = getReady(state, secondsSincePhaseChange);
      break;
    case 'prompt':
      state = promptController(state, secondsSincePhaseChange);
      break;
    case 'result':
      state = resultController(state, secondsSincePhaseChange);
      break;
  }

  if (oldPhase !== state.phase) {
    state.phaseChangeTimestamp = timestamp;
  }

  window.requestAnimationFrame(mainLoop(state));
};

const displayReward = (result: HTMLElement) => {
  const puppies = [
    'https://media.giphy.com/media/ZFFVNwIbjsKtP3lHYK/giphy.gif',
    'https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif',
    'https://media.giphy.com/media/xwMxmx6cTsElW/giphy.gif',
    'https://media.giphy.com/media/gZLl9szOpgbpS/giphy.gif',
    'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
    'https://media.giphy.com/media/jsMoSSozkPUBWodejV/giphy.gif',
    'https://media.giphy.com/media/eeLD68y0yAzl12KUDH/giphy.gif',
    'https://media.giphy.com/media/5sHg1xQjMV8iI/giphy.gif',
    'https://media.giphy.com/media/gVYk3rI8YjtAI/giphy.gif',
  ];
  result.innerHTML = `
    <img src="${puppies[Math.floor(Math.random() * puppies.length)]}" alt="">
  `;
};

window.onload = init;
