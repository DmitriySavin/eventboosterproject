import cardTemplate from './templates/cards.hbs';

const loadMoreBtn = document.querySelector('.loadMoreBtn');

function renderCards(events, append = false) {
  const container = document.querySelector('.cards-container');

  if (!events.length && !append) {
    container.innerHTML =
      '<p class="null-title">За цим запитом немає запланованих подій!</p>';
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    } 
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

  if (append) {
    container.insertAdjacentHTML('beforeend', markup);
  } else {
    container.innerHTML = markup;
  }

  // если карточки появились → показать кнопку
  if (loadMoreBtn) loadMoreBtn.style.display = 'block';
}

export default renderCards;
