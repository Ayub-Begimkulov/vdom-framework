import { IComponent } from './component';

export interface VNode {
  tagName: string;
  options?: VNodeOptions;
  children?: VChildren;
}

interface VNodeOptions {
  attrs?: VAttributes;
  events?: Record<string, EventListenerOrEventListenerObject>;
  style?: Record<string, string>;
}

export type VChildren = Array<VNode | IComponent | string>;
export type VAttributes = Record<string, string>;
export type CreateElementFunction = typeof createElement;

export default function createElement(
  tagName: string,
  options?: VNodeOptions,
  children?: VChildren
): VNode {
  return {
    tagName,
    options,
    children
  };
}

export function isVNode(node: any): node is VNode {
  return !!node.tagName;
}
