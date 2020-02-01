export interface Action {
  type: string;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export type Listener = () => void;

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S;

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};
