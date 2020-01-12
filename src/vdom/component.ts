import createElement, { VNode, CreateElementFunction } from './create-element';
import render from './render';
import diff from './diff';

export interface IComponent {
  new (): Component;
}

export default abstract class Component {
  state: any;
  VComponent: VNode;
  el: HTMLElement | Text;

  constructor(state: { [key: string]: any }) {
    this.render = this.render.bind(this, createElement);
    const self = this;

    this.state = new Proxy(state, {
      get(obj, prop: string) {
        return obj[prop];
      },

      set(obj, prop: string, newVal) {
        obj[prop] = newVal;

        self.patch();

        return true;
      }
    });

    this.VComponent = this.render();
    this.el = render(this.VComponent);
  }

  patch() {
    const newVCompoent = this.render();
    const patch = diff(this.VComponent, newVCompoent);
    // @ts-ignore
    patch(this.el);
    this.VComponent = newVCompoent;
  }

  abstract render(h?: CreateElementFunction): VNode;
}
