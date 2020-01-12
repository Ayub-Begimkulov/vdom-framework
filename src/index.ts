import { VNode, CreateElementFunction } from './vdom/create-element';
import Component from './vdom/component';
import mount from './vdom/mount';

class App extends Component {
  constructor() {
    super({});
  }

  render(h: CreateElementFunction) {
    // @ts-ignore
    return h('div', {}, [h('h1', {}, ['Hello world']), Home]);
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

mount(new App().dom, <HTMLElement>document.getElementById('app'));
