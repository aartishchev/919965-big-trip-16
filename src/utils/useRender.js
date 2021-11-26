export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function renderTemplate(container, template, position) {
  container.insertAdjacentHTML(position, template);
}

export function renderEvents(container, events) {
  const eventsList = document.createElement('ul');
  eventsList.className = 'trip-events__list';

  for (const event of events) {
    renderTemplate(eventsList, event, RenderPosition.BEFOREEND);
  }

  const eventItems = eventsList.children;
  for (const item of eventItems) {
    const listItem = document.createElement('li');
    listItem.className = 'trip-events__item';
    item.before(listItem);
    listItem.appendChild(item);
  }

  container.appendChild(eventsList);
}
