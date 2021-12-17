import { RenderPosition } from './const.js';

export function renderElement (container, element, place = RenderPosition.BEFORE_END) {
  switch (place) {
    case RenderPosition.BEFORE_BEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER_END:
      container.after(element);
      break;
  }
}

export function createElement (template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
}
