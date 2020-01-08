import { VNode, VChildren, VAttributes } from './create-element';
import render from './render';

type Patch<T = HTMLElement | Text> = (node: T) => T | void;

const diff = (
  oldVNode: VNode | string,
  newVNode: VNode | string | undefined
): Patch => {
  if (typeof newVNode === 'undefined') {
    return node => node.remove();
  }

  if (typeof oldVNode === 'string' || typeof newVNode === 'string') {
    if (oldVNode === newVNode) {
      return node => node;
    }

    return node => {
      const newNode = render(newVNode);
      node.replaceWith(newNode);
      return newNode;
    };
  }

  if (oldVNode.tagName !== newVNode.tagName) {
    return node => {
      const newNode = render(newVNode);
      node.replaceWith(newNode);
      return newNode;
    };
  }

  const patchAttrs = diffAttrs(
    oldVNode.options?.attrs,
    newVNode.options?.attrs
  );

  const patchChildren = diffChildren(oldVNode.children, newVNode.children);

  return node => {
    patchAttrs(<HTMLElement>node);
    patchChildren(<HTMLElement>node);
    return node;
  };
};

const diffAttrs = (oldAttrs: VAttributes = {}, newAttrs: VAttributes = {}) => {
  const patches: Patch<HTMLElement>[] = [];

  for (const key in newAttrs) {
    patches.push(node => {
      node.setAttribute(key, newAttrs[key]);
    });
  }

  for (const key in oldAttrs) {
    if (!newAttrs[key]) {
      patches.push(node => {
        node.removeAttribute(key);
      });
    }
  }

  return (node: HTMLElement) => {
    for (const patch of patches) {
      patch(node);
    }
  };
};

const diffChildren = (
  oldVChildren: VChildren = [],
  newVChildren: VChildren = []
) => {
  const oldChildrenPatches: Patch[] = [];

  for (let i = 0; i < oldVChildren.length; i++) {
    oldChildrenPatches.push(diff(oldVChildren[i], newVChildren[i]));
  }

  const newChildrenPatches: Patch[] = [];

  for (const newNode of newVChildren.slice(oldVChildren.length)) {
    newChildrenPatches.push(node => {
      node.appendChild(render(newNode));
    });
  }

  return (node: HTMLElement) => {
    node.childNodes.forEach((child, i) => {
      oldChildrenPatches[i](<HTMLElement>child);
    });

    newChildrenPatches.forEach(patch => patch(node));
  };
};

export default diff;
