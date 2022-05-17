import { all, fork } from 'redux-saga/effects';

import backgroundSaga from './backgroundSaga';
import boardSaga from './boardSaga';
import columnSaga from './columnSaga'
import cardSaga from './cardSaga';

export default function* () {
    yield all([
      fork(backgroundSaga),
      fork(boardSaga),
      fork(columnSaga),
      fork(cardSaga)
    ]);
}