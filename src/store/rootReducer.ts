import { combineReducers } from 'redux';
import example from 'providers/ExampleProvider/slice';
import coins from 'providers/CoinsProvider/slice';

const rootReducer = combineReducers({
  example,
  coins,
});

export default rootReducer;
