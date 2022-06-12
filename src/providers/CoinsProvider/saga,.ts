import { put, takeEvery, call, takeLeading } from 'redux-saga/effects';
import _pick from 'lodash/pick';
import { AnyAction } from 'redux';
import request from 'utils/request';
import {
  getCoinsListRequest,
  getCoinsListSuccess,
  getCoinsListFailure,
  getCoinDetailRequest,
  getCoinDetailSuccess,
  getCoinDetailFailure,
} from './slice';

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

export function* getCoinDetail(action: AnyAction): unknown {
  try {
    const { data } = yield call(request, `/coin/${action.payload.uuid}`, {}, { method: 'GET' });
    yield put(getCoinDetailSuccess({ detail: data }));
  } catch (error) {
    yield put(getCoinDetailFailure({ error }));
  }
}

export default function* coinsWatch(): Generator {
  yield takeEvery(getCoinsListRequest.type, getCoinsList);
  yield takeLeading(getCoinDetailRequest.type, getCoinDetail);
}
