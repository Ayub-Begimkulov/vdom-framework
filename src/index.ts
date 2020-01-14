import { VNode, CreateElementFunction, VChildren } from './vdom/create-element';
import Component from './vdom/component';
import mount from './vdom/mount';

class App extends Component {
  constructor() {
    super({
      name: 'Ayub'
    });
    console.log(this.VComponent);
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
      })
    ];

    if (this.state.name.length % 2 === 0) {
      children.push(Home);
    } else {
      children.push(About);
    }
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
    return h('h2', {}, ['Home']);
  }
}

class About extends Component {
  constructor() {
    super({
      text: ''
    });
  }

  render(h: CreateElementFunction): VNode {
    return h('h2', {}, ['About']);
  }
}

mount(App, <HTMLElement>document.getElementById('app'));
