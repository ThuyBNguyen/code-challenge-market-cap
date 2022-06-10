import { combineReducers } from 'redux';
import example from 'providers/ExampleProvider/slice';

const rootReducer = combineReducers({
  example,
});

export default rootReducer;
