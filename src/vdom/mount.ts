import { IComponent } from './component';

export default function mount(component: IComponent, target: HTMLElement) {
  target.innerHTML = '';
  const el = new component().el;
  target.appendChild(el);
  return el;
}
