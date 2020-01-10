import createElement, { VNode } from './vdom/create-element';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff';

type CreateComponentFunction = (componentObject: {
  state: ComponentState;
  renderFn: (state: ComponentState) => VNode;
}) => HTMLElement | Text;

interface ComponentState {
  [key: string]: any;
}

const createComponent: CreateComponentFunction = ({ renderFn, state }) => {
  const componentState = new Proxy(state, {
    get(obj, prop: string) {
      return obj[prop];
    },

    set(obj, prop: string, newVal) {
      obj[prop] = newVal;
      const newVCompoent = renderFn(obj);
      const patch = diff(VComponent, newVCompoent);
      // @ts-ignore
      dom = patch(dom);
      VComponent = newVCompoent;

      return true;
    }
  });

  let VComponent = renderFn(componentState);
  let dom = render(VComponent);

  return dom;
};

const App = createComponent({
  state: {
    word: 'hello'
  },
  renderFn: state => {
    const children = [
      createElement('h1', { attrs: { class: 'heading' } }, [
        `Hello world ${state.word}`
      ]),
      createElement('input', {
        attrs: { type: 'text' },
        events: {
          input: e => (state.word = (<HTMLInputElement>e.target).value)
        },
        style: { border: '1px solid #ccc' }
      })
    ];

    if (state.word) {
      children.push(createElement('p', {}, [state.word]));
    }

    return createElement(
      'div',
      { attrs: { id: `hello ${state.word}` } },
      children
    );
  }
});

mount(App, <HTMLElement>document.getElementById('app'));
