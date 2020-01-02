export interface VNode {
  tagName: string;
  attrs?: Attributes;
  children?: Children;
}

interface Attributes {
  [key: string]: string;
}

type Children = Array<VNode | string>;

export default (
  tagName: string,
  attrs?: Attributes,
  children?: Children
): VNode => {
  return {
    tagName,
    attrs,
    children
  };
};
