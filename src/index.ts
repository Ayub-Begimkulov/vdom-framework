import createElement from './vdom/create-element';
import { render } from './vdom/render';

const app = createElement('div', { attrs: { id: 'hello' } }, [
  createElement('h1', { attrs: { class: 'heading' } }, ['Hello world']),
  createElement('input', {
    attrs: { type: 'text' },
    events: { input: e => console.log((<HTMLInputElement>e.target).value) },
    style: { backgroundColor: 'red', border: 'none' }
  })
]);

render(app, '#app');
