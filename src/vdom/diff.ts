import { VNode, VChildren, VAttributes, isVNode } from './create-element';
import render from './render';
import { IComponent } from './component';

type HTMLElementOrText = HTMLElement | Text;
type Patch<T = HTMLElementOrText, K = HTMLElementOrText> = (node: K) => T;
type VTree = VNode | IComponent | string;

function diff(oldVTree: VTree, newVTree: undefined): Patch<void>;
function diff(oldVTree: VTree, newVTree: VTree): Patch;
function diff(
  oldVTree: VTree,
  newVTree: VTree | undefined
): Patch | Patch<void> {
  if (typeof newVTree === 'undefined') {
    return node => node.remove();
  }

  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree === newVTree) {
      return node => node;
    }

    return replaceNode(newVTree);
  }

  if (isVNode(oldVTree) && isVNode(newVTree)) {
    if (oldVTree.tagName !== newVTree.tagName) {
      return replaceNode(newVTree);
    }

    const patchAttrs = diffAttrs(
      oldVTree.options?.attrs,
      newVTree.options?.attrs
    );

    const patchChildren = diffChildren(oldVTree.children, newVTree.children);

    return node => {
      patchAttrs(<HTMLElement>node);
      patchChildren(<HTMLElement>node);
      return node;
    };
  }

  if (isVNode(oldVTree) || isVNode(newVTree)) {
    return replaceNode(newVTree);
  }

  return node => {
    const newNode = new newVTree().el;
    node.replaceWith(newNode);
    return newNode;
  };
}

function diffAttrs(oldAttrs: VAttributes = {}, newAttrs: VAttributes = {}) {
  const patches: Patch<void, HTMLElement>[] = [];

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
}

function diffChildren(
  oldVChildren: VChildren = [],
  newVChildren: VChildren = []
) {
  const oldChildrenPatches: Patch[] = [];

  for (let i = 0; i < oldVChildren.length; i++) {
    oldChildrenPatches.push(diff(oldVChildren[i], newVChildren[i]));
  }

  const newChildrenPatches: Patch<void>[] = [];

  for (const newNode of newVChildren.slice(oldVChildren.length)) {
    newChildrenPatches.push(node => {
      node.appendChild(render(newNode));
    });
  }

  return (parentNode: HTMLElement) => {
    parentNode.childNodes.forEach((child, i) => {
      oldChildrenPatches[i](<HTMLElementOrText>child);
    });

    newChildrenPatches.forEach(patch => patch(parentNode));
  };
}

const replaceNode = (newVTree: VTree): Patch => node => {
  const newNode = render(newVTree);
  node.replaceWith(newNode);
  return newNode;
};

export default diff;
