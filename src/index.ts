type Answer = 'left' | 'right' | 'waiting-for-answer';

type State = {
  prompt: HTMLElement
  left: HTMLElement
  right: HTMLElement
  result: HTMLElement
  answer: Answer
}

const init = () => {
  const state: State = {
    prompt: document.getElementById('prompt') as HTMLElement,
    left: document.getElementById('left') as HTMLElement,
    right: document.getElementById('right') as HTMLElement,
    result: document.getElementById('result') as HTMLElement,

    answer: 'waiting-for-answer',
  };

  state.left.addEventListener('click', () => {
    if (state.answer === 'waiting-for-answer') {
      state.answer = 'left';
    }
  });

  window.requestAnimationFrame(mainLoop(state));
};

const mainLoop = (state: State) => () => {
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
