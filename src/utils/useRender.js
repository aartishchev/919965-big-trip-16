import { RenderPosition } from './const';

export function renderTemplate (container, template, position = RenderPosition.BEFORE_END) {
  container.insertAdjacentHTML(position, template);
}

export function renderEvent(container, event) {
  const listItem = document.createElement('li');
  listItem.className = 'trip-events__list';
  renderTemplate(listItem, event);
  container.appendChild(listItem);
}

export function getTotalPrice(offers, basePrice) {
  return offers.reduce((acc, offer) => acc + Number(offer.price), basePrice);
}
