import { RenderPosition } from './const.js';

export function renderTemplate (container, template, position = RenderPosition.BEFORE_END) {
  container.insertAdjacentHTML(position, template);
}

export function renderEvent(container, event) {
  const listItem = document.createElement('li');
  listItem.className = 'trip-events__list';
  renderElement(listItem, event);
  container.appendChild(listItem);
}

export function getTotalPrice(offers, basePrice) {
  return offers.reduce((acc, offer) => acc + Number(offer.price), basePrice);
}

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
