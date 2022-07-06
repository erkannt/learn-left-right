import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { sequenceS } from 'fp-ts/lib/Apply';

let prompt;
let left;
let right;
let result;

const init = () => {
  prompt = document.getElementById('prompt') as HTMLElement;
  left = document.getElementById('left') as HTMLElement;
  right = document.getElementById('right') as HTMLElement;
  result = document.getElementById('result') as HTMLElement;

  left.addEventListener('click', displayReward(result));

  window.requestAnimationFrame(mainLoop);
};

const mainLoop = () => {
  window.requestAnimationFrame(mainLoop);
};

const displayReward = (result: HTMLElement) => () => {
  result.innerHTML = `
    <img src="https://www.akc.org/wp-content/uploads/2018/03/Two-Newfoundland-puppies-running-outside-header.jpg" alt="">
  `;
};

window.onload = init;
