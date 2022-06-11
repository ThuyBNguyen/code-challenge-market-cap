import { all } from 'redux-saga/effects';
import exampleWatch from 'providers/ExampleProvider/saga';
import coinsWatch from 'providers/CoinsProvider/saga,';

export default function* rootSaga(): Generator {
  yield all([exampleWatch(), coinsWatch()]);
}
