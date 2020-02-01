import { Reducer, Action, AnyAction, Listener } from './types';

export default function createStore<S, A extends Action = AnyAction>(
  reducer: Reducer<S, A>
) {
  let state = <S>{};
  const listeners: Listener[] = [];

  function getState() {
    return state;
  }

  function subscribe(listener: Listener) {
    listeners.push(listener);

    return function unsubscribe() {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }

  function dispatch(action: A) {
    state = reducer(state, action);

    listeners.forEach(listener => {
      listener();
    });

    return action;
  }

  return {
    getState,
    subscribe,
    dispatch
  };
}
