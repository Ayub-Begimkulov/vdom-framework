export interface VNode {
  tagName: string;
  options?: VNodeOptions;
  children?: VChildren;
}

interface VNodeOption<T> {
  [key: string]: T;
}

interface VNodeOptions {
  attrs?: VAttributes;
  events?: VNodeOption<EventListenerOrEventListenerObject>;
  style?: VNodeOption<string>;
}

export type VChildren = Array<VNode | string>;
export type VAttributes = VNodeOption<string>;
export type CreateElementFunction = typeof createElement;

const createElement = (
  tagName: string,
  options?: VNodeOptions,
  children?: VChildren
): VNode => {
  return {
    tagName,
    options,
    children
  };
};

export default createElement;
