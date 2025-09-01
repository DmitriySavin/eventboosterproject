const BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = "GgEVaw0LcL27f6WGcDMEhFXjbdwiVli3";

export default class EventApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 20;
  }

  fetchEvents() {
    const url = `${BASE_URL}/events.json?apikey=${API_KEY}&keyword=${this.searchQuery}&page=${this.page}&size=${this.perPage}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // для отладки
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
