import { VNode } from './create-element';

export const render = (element: VNode, selector: string) => {
  document.querySelector(selector)?.append(renderEl(element));
};

const renderEl = ({ tagName, attrs, children }: VNode) => {
  const el = document.createElement(tagName);

  if (attrs) {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  if (children) {
    for (const child of children) {
      const childNode =
        typeof child === 'string'
          ? document.createTextNode(child)
          : renderEl(child);

      el.appendChild(childNode);
    }
  }

  return el;
};
