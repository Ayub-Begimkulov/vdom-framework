export interface VNode {
  tagName: string;
  options?: VNodeOptions;
  children?: Children;
}

interface VNodeOption<T> {
  [key: string]: T;
}

interface VNodeOptions {
  attrs?: VNodeOption<string>;
  events?: VNodeOption<EventListenerOrEventListenerObject>;
  style?: VNodeOption<string>;
}

type Children = Array<VNode | string>;

export default (
  tagName: string,
  options?: VNodeOptions,
  children?: Children
): VNode => {
  return {
    tagName,
    options,
    children
  };
};
