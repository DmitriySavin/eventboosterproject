import cardTemplate from '../js/templates/cards.hbs';

function renderCards(events) {
  const container = document.querySelector('.cards-container');
  container.innerHTML = '';

  if (!events.length) {
    container.innerHTML = '<p>Ничего не найдено</p>';
    return;
  }

  const markup = events
    .map(event =>
      cardTemplate({
        image: event.images[0]?.url || '',
        title: event.name,
        date: event.dates.start.localDate,
        location: event._embedded?.venues?.[0]?.name || '',
      })
    )
    .join('');

  container.innerHTML = markup;
}

export default renderCards;
