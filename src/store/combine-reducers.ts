import { ReducersMapObject, AnyAction } from './types';

export default function combineReducers(reducers: ReducersMapObject) {
  const reducerKeys = Object.keys(reducers);

  return function combination(state: any = {}, action: AnyAction) {
    let hasChanged = false;
    const nextState: any = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || reducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
