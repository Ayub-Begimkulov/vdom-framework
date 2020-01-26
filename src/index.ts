import { VNode, CreateElementFunction, VChildren } from './vdom/create-element';
import Component from './vdom/component';
import mount from './vdom/mount';
import createStore, { Reducer } from './store';

type StoreState = { text: string };

const reducer: Reducer<StoreState> = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'TEST':
      return { ...state, text: action.payload.text };

    default:
      return state;
  }
};

const store = createStore<StoreState>(reducer);

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
      text: ''
    });
  }

  render(h: CreateElementFunction): VNode {
    return h('h2', {}, [
      'Home Input',
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
              type: 'TEST',
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
      text: ''
    });
  }

  beforeMount() {
    store.subscribe(() => {
      this.state.text = store.getState().text;
    });
  }

  render(h: CreateElementFunction): VNode {
    return h('div', {}, [
      h('h2', {}, ['About']),
      h('div', {}, [this.state.text])
    ]);
  }
}

mount(App, <HTMLElement>document.getElementById('app'));
