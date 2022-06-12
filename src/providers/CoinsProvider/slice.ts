import { createSlice } from '@reduxjs/toolkit';
import { ObjectType } from '@utils/types';

export interface CoinsState {
  isLoading: boolean;
  total: number;
  list: ObjectType;
  stats: { [key: string]: string };
  detail: { [key: string]: string };
}

const initialState: CoinsState = {
  isLoading: false,
  total: 0,
  list: [],
  stats: {},
  detail: {},
};

const CoinsState = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    getCoinsListRequest(state, action) {
      state.isLoading = true;
      return state;
    },
    getCoinsListSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.list = data.coins;
      state.stats = data.stats;
      state.total = data.stats.total;
      return state;
    },
    getCoinsListFailure(state, action) {
      state.isLoading = false;
      return state;
    },
    getCoinDetailRequest(state, action) {
      state.isLoading = true;
      return state;
    },
    getCoinDetailSuccess(state, action) {
      const { detail } = action.payload;
      state.isLoading = false;
      state.detail = detail.coin;
      return state;
    },
    getCoinDetailFailure(state, action) {
      state.isLoading = false;
      return state;
    },
  },
});

export const {
  getCoinsListRequest,
  getCoinsListSuccess,
  getCoinsListFailure,
  getCoinDetailRequest,
  getCoinDetailSuccess,
  getCoinDetailFailure,
} = CoinsState.actions;

export default CoinsState.reducer;
