import { put, takeEvery, call } from 'redux-saga/effects';
import _pick from 'lodash/pick';
import { AnyAction } from 'redux';
import request from 'utils/request';
import { getCoinsListRequest, getCoinsListSuccess, getCoinsListFailure } from './slice';

export function* getCoinsList(action: AnyAction): unknown {
  try {
    const { payload } = action;
    const params = _pick(payload, ['offset', 'limit', 'search', 'orderBy', 'orderDirection']);
    const res = yield call(request, '/coins', params, { method: 'GET' });
    yield put(getCoinsListSuccess(res));
  } catch (error) {
    yield put(getCoinsListFailure(error));
  }
}

export default function* coinsWatch(): Generator {
  yield takeEvery(getCoinsListRequest.type, getCoinsList);
}
