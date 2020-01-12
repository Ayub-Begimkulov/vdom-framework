import { VNode, CreateElementFunction } from './vdom/create-element';
import Component from './vdom/component';
import mount from './vdom/mount';

class App extends Component {
  constructor() {
    super({
      name: 'Ayub'
    });
  }

  render(h: CreateElementFunction) {
    return h('div', {}, [
      h('h1', {}, ['Hello world' + this.state.name]),
      h('input', {
        attrs: {
          type: 'text'
        },
        events: {
          input: e => (this.state.name = (<HTMLInputElement>e.target).value)
        }
      }),
      Home
    ]);
  }
}

class Home extends Component {
  constructor() {
    super({
      text: ''
    });
  }

  render(h: CreateElementFunction): VNode {
    const children = [
      h('input', {
        attrs: {
          type: 'text'
        },
        events: {
          input: e => (this.state.text = (<HTMLInputElement>e.target).value)
        }
      })
    ];

    if (this.state.text) {
      children.push(h('p', {}, [this.state.text]));
    }

    return h('div', {}, children);
  }
}

mount(App, <HTMLElement>document.getElementById('app'));
