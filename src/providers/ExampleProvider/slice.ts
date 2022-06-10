import { createSlice } from '@reduxjs/toolkit';

export interface ExampleState {
  count: number;
  loading: boolean;
}

const initialState: ExampleState = {
  count: 0,
  loading: false,
};

const ExampleState = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    countExampleRequest(state, action) {
      state.loading = true;
      return state;
    },
    countExampleSuccess(state, action) {
      state.count = state.count + action.payload;
      state.loading = false;
      return state;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    countExampleFailure(state, action) {
      state.loading = false;
      return state;
    },
  },
});
// eslint-disable-next-line prettier/prettier
export const { countExampleRequest, countExampleSuccess, countExampleFailure } =
  ExampleState.actions;

export default ExampleState.reducer;
