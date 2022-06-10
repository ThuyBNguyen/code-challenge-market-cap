import { all } from 'redux-saga/effects';
import exampleWatch from 'providers/ExampleProvider/saga';

export default function* rootSaga(): Generator {
  yield all([exampleWatch()]);
}
