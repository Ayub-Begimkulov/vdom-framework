import createElement from './vdom/create-element';
import { render } from './vdom/render';

const app = createElement('div', { id: 'hello' }, [
  createElement('h1', { class: 'heading' }, ['Hello world']),
  createElement('input', { type: 'text' })
]);

render(app, '#app');
