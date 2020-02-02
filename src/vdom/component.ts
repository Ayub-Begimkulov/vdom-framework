import createElement, { VNode, CreateElementFunction } from './create-element';
import render from './render';
import diff from './diff';

export interface IComponent {
  new (): Component;
}

interface IState {
  [key: string]: any;
}

export default abstract class Component<S extends IState = IState> {
  state: S;
  VComponent: VNode;
  el: HTMLElement | Text;

  beforeMount?(): void;
  abstract initialState(): S;
  abstract render(h?: CreateElementFunction): VNode;

  constructor() {
    this.render = this.render.bind(this, createElement);
    const self = this;

    this.state = new Proxy(this.initialState(), {
      get(obj, prop: string) {
        return obj[prop];
      },

      set(obj: IState, prop: string, newVal) {
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
    const newVComponent = this.render();
    const patch = diff(this.VComponent, newVComponent);
    this.el = patch(this.el);
    this.VComponent = newVComponent;
  }
}
