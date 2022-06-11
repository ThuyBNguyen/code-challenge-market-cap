import { ExampleState } from 'providers/ExampleProvider/slice';
import { CoinsState } from 'providers/CoinsProvider/slice';
export interface CombinedState {
  example: ExampleState;
  coins: CoinsState;
}
