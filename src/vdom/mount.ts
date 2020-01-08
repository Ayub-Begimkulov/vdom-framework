export default (element: HTMLElement | Text, target: HTMLElement) => {
  target.innerHTML = '';
  target.appendChild(element);
  return element;
};
