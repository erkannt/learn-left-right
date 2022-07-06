import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { sequenceS } from 'fp-ts/lib/Apply';

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
    () => {},
  ),
);
