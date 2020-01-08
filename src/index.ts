import createElement from './vdom/create-element';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff';

let word = 'hello';

const getChildren = (word: string) => {
  const children = [
    createElement('h1', { attrs: { class: 'heading' } }, [
      `Hello world ${word}`
    ]),
    createElement('input', {
      attrs: { type: 'text' },
      events: { input: e => update((<HTMLInputElement>e.target).value) },
      style: { border: '1px solid #ccc' }
    })
  ];

  if (word) {
    children.push(createElement('p', {}, [word]));
  }

  return children;
};

const app = (word: string) =>
  createElement('div', { attrs: { id: `hello ${word}` } }, getChildren(word));

let VApp = app(word);
let root = mount(render(VApp), <HTMLElement>document.querySelector('#app'));

const update = (word: string) => {
  const newVApp = app(word);
  const patch = diff(VApp, newVApp);
  // @ts-ignore
  root = patch(root);
  VApp = newVApp;
};
