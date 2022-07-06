type Answer = 'left' | 'right' | 'waiting-for-answer';

type State = {
  prompt: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;
  result: HTMLElement;
  phase: 'get-ready';
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
    if (state.answer === 'waiting-for-answer') {
      state.answer = 'left';
    }
  });

  window.requestAnimationFrame(mainLoop(state));
};

const mainLoop = (state: State) => (timestamp: DOMHighResTimeStamp) => {
  const secondsSincePhaseChange = (timestamp - state.phaseChangeTimestamp) / 1000

  if (secondsSincePhaseChange < 2) {
    state.prompt.innerText = 'Get ready!'
  }

  if (secondsSincePhaseChange >= 2) {
    state.prompt.innerText = Math.ceil(7 - secondsSincePhaseChange).toString()
  }

  if (secondsSincePhaseChange >= 7) {
    state.prompt.innerText = 'LEFT'
  }

  if (state.answer === 'left') {
    displayReward(state.result);
  }

  window.requestAnimationFrame(mainLoop(state));
};

const displayReward = (result: HTMLElement) => {
  result.innerHTML = `
    <img src="https://www.akc.org/wp-content/uploads/2018/03/Two-Newfoundland-puppies-running-outside-header.jpg" alt="">
  `;
};

window.onload = init;
