import eventTpl from "./templates/event.hbs";
import EventApiService from "./apiService.js";


const refs = {
  container: document.querySelector(".cards-container"),
  input: document.querySelector("#search-input"),
  button: document.querySelector("#search-button"),
};

const eventApiService = new EventApiService();

refs.button.addEventListener("click", onSearch);

function onSearch(event) {
  event.preventDefault();
  const query = refs.input.value.trim();
  if (!query) return;

  eventApiService.query = query;
  eventApiService.resetPage(); 
  refs.container.innerHTML = ''; 

  eventApiService.fetchEvents().then((data) => {
  const events = data._embedded?.events || [];
  renderCards(events);
});

}

function renderCards(events) {
  if (!events.length) {
    refs.container.innerHTML = '<p>Ничего не найдено</p>';
    return;
  }

  const markup = events
    .map(event =>
      eventTpl({
        image: event.images?.[0]?.url || '',
        title: event.name,
        date: event.dates.start?.localDate || '',
        location: event._embedded?.venues?.[0]?.name || '',
      })
    )
    .join('');

  refs.container.innerHTML = markup;
}
