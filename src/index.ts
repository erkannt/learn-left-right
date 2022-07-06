import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { sequenceS } from 'fp-ts/lib/Apply';

const displayReward = (result: HTMLElement) => () => {
  result.innerHTML = `
    <img src="https://www.akc.org/wp-content/uploads/2018/03/Two-Newfoundland-puppies-running-outside-header.jpg" alt="">
  `
}

pipe(
  {
    prompt: O.fromNullable(document.getElementById('prompt')),
    left: O.fromNullable(document.getElementById('left')),
    right: O.fromNullable(document.getElementById('right')),
    result: O.fromNullable(document.getElementById('result')),
  },
  sequenceS(O.Apply),
  O.match(
    () => {},
    ({left, result}) => {
      left.addEventListener('click', displayReward(result))
    },
  ),
);
