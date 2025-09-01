import eventTpl from "../templates/event.hbs"; 
import EventApiService from "./apiService.js";

const refs = {
  container: document.querySelector('#cards-container'),
  input: document.querySelector('.search-icon'),
  button: document.querySelector('.header-icon'),
};

const eventApiService = new EventApiService();

refs.button.addEventListener("click", onSearch);

function onSearch(e) {
  e.preventDefault();
  const query = refs.input.value.trim();
  if (!query) return;


  eventApiService.query = query;
  eventApiService.resetPage();
  refs.container.innerHTML = '';

  eventApiService.fetchEvents().then(data => {
    const events = data._embedded?.events || [];
    renderCards(events);
  }).catch(err => {
    console.error("Ошибка при загрузке событий:", err);
    refs.container.innerHTML = '<p>Ошибка загрузки событий</p>';
  });
}

function renderCards(events) {
  if (!events || events.length === 0) {
    refs.container.innerHTML = '<p>Ничего не найдено</p>';
    return;
  }

  const markup = events.map(event => 
    eventTpl({
      image: event.images?.[0]?.url || '',
      title: event.name,
      date: event.dates.start?.localDate || '',
      location: event._embedded?.venues?.[0]?.name || ''
    })
  ).join('');

  refs.container.innerHTML = markup;
}