import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { countExampleRequest, countExampleSuccess, countExampleFailure } from './slice';

export function* countExample(action: AnyAction): unknown {
  try {
    const { numberIncrease } = action.payload;
    yield put(countExampleSuccess(numberIncrease));
  } catch (error) {
    yield put(countExampleFailure({ error }));
  }
}

export default function* exampleWatch(): Generator {
  yield takeEvery(countExampleRequest.type, countExample);
}
