import { VNode } from './create-element';

const render = (node: VNode | string) => {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  return renderVNode(node);
};

const renderVNode = ({
  tagName,
  options: { attrs, events, style } = {},
  children = []
}: VNode) => {
  const el = document.createElement(tagName);

  if (attrs) {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  if (events) {
    for (const key in events) {
      el.addEventListener(key, events[key]);
    }
  }

  if (style) {
    for (const key in style) {
      (<any>el.style)[key] = style[key];
    }
  }

  for (const child of children) {
    el.appendChild(render(child));
  }

  return el;
};

export default render;
