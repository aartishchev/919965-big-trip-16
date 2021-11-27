export const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

export function renderTemplate(container, template, position = RenderPosition.BEFORE_END) {
  container.insertAdjacentHTML(position, template);
}

export function renderEvent(container, event) {
  const listItem = document.createElement('li');
  listItem.className = 'trip-events__list';
  renderTemplate(listItem, event);
  container.appendChild(listItem);
}
