interface Action {
  type: string;
}

interface AnyAction extends Action {
  [extraProps: string]: any;
}

type Listener = () => void;

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S;

export default function createStore<S, A extends Action = AnyAction>(
  reducer: Reducer<S, A>
) {
  let state = <S>{};
  const listeners: Listener[] = [];

  const getState = () => state;

  const subscribe = (listener: Listener) => {
    listeners.push(listener);

    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  };

  const dispatch = (action: A) => {
    state = reducer(state, action);

    listeners.forEach(listener => {
      listener();
    });

    return action;
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}
