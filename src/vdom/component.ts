import createElement, { VNode, CreateElementFunction } from './create-element';
import render from './render';
import diff from './diff';

export interface IComponent {
  new (): Component;
}

interface IState {
  [key: string]: any;
}

export default abstract class Component {
  state: IState;
  VComponent: VNode;
  el: HTMLElement | Text;

  beforeMount?(): void;
  abstract render(h?: CreateElementFunction): VNode;

  constructor(state: IState) {
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
    this.beforeMount && this.beforeMount();
    this.el = render(this.VComponent);
  }

  patch() {
    const newVCompoent = this.render();
    const patch = diff(this.VComponent, newVCompoent);
    this.el = patch(this.el);
    this.VComponent = newVCompoent;
  }
}
