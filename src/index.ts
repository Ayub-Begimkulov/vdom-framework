import { VNode, CreateElementFunction, VChildren } from './vdom/create-element';
import Component from './vdom/component';
import mount from './vdom/mount';
import { createStore, combineReducers, Reducer } from './store';

type StoreState = { text: string };

const textReducer: Reducer<StoreState> = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'TEXT':
      return { ...state, text: action.payload.text };

    default:
      return state;
  }
};

const numberReducer: Reducer<{ number: number }> = (
  state = { number: 0 },
  action
) => {
  switch (action.type) {
    case 'NUMBER':
      return { ...state, number: action.payload.number };

    default:
      return state;
  }
};

const roootReducer = combineReducers({
  text: textReducer,
  number: numberReducer
});

const store = createStore(roootReducer);

class App extends Component {
  constructor() {
    super({
      name: 'Ayub'
    });
  }

  render(h: CreateElementFunction) {
    const children: VChildren = [
      h('h1', {}, ['Hello world' + this.state.name]),
      h('input', {
        attrs: {
          type: 'text'
        },
        events: {
          input: e => (this.state.name = (<HTMLInputElement>e.target).value)
        }
      }),
      Home,
      About
    ];

    return h('div', {}, children);
  }
}

class Home extends Component {
  constructor() {
    super({
      text: '',
      number: 0
    });
  }

  beforeMount() {
    store.subscribe(() => {
      this.state.number = store.getState().number.number;
    });
  }

  render(h: CreateElementFunction): VNode {
    return h('h2', {}, [
      'Home Input',
      ` ${this.state.number}`,
      h('input', {
        attrs: {
          type: 'text'
        },
        style: {
          display: 'block'
        },
        events: {
          input: e => {
            const newValue = (<HTMLInputElement>e.target).value;
            this.state.text = newValue;
            store.dispatch({
              type: 'TEXT',
              payload: { text: newValue }
            });
          }
        }
      })
    ]);
  }
}

class About extends Component {
  constructor() {
    super({
      text: '',
      number: 0
    });
  }

  beforeMount() {
    store.subscribe(() => {
      this.state.text = store.getState().text.text;
    });
  }

  render(h: CreateElementFunction): VNode {
    return h('div', {}, [
      h('h2', {}, ['About']),
      h('input', {
        attrs: {
          type: 'number'
        },
        style: {
          display: 'block'
        },
        events: {
          input: e => {
            const newValue = (<HTMLInputElement>e.target).value;
            this.state.number = newValue;
            console.log({ number: newValue });
            store.dispatch({
              type: 'NUMBER',
              payload: { number: newValue }
            });
          }
        }
      }),
      h('div', {}, [this.state.text])
    ]);
  }
}

mount(App, <HTMLElement>document.getElementById('app'));
