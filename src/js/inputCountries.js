import renderCards from './inputCountriesCards.js';
import templatesCards from './templates/cards.hbs'

const countries = [
  { value: 'AD', label: 'Andorra' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BR', label: 'Brazil' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'CA', label: 'Canada' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EE', label: 'Estonia' },
  { value: 'FO', label: 'Faroe Islands' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GB', label: 'Great Britain' },
  { value: 'GR', label: 'Greece' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'Korea, Republic of' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MT', label: 'Malta' },
  { value: 'MX', label: 'Mexico' },
  { value: 'MC', label: 'Monaco' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MA', label: 'Morocco' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'AN', label: 'Netherlands Antilles' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'ND', label: 'Northern Ireland' },
  { value: 'NO', label: 'Norway' },
  { value: 'PE', label: 'Peru' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russian Federation' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'ES', label: 'Spain' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TR', label: 'Turkey' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'US', label: 'United States' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'VE', label: 'Venezuela' },
];

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'GgEVaw0LcL27f6WGcDMEhFXjbdwiVli3';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class NewApiCountry {
  constructor() {
    (this.searchValue = null), (this.apiKey = API_KEY), (this.page = 0);

    listRef.addEventListener('click', event => {
      const li = event.target.closest('li');
      if (li) {
        this.searchValue = li.id;
        console.log('Выбрано:', this.searchValue);
        this.fetchCards().then(renderCards);
      }
    });
  }

  async fetchCards() {
    const url = `${BASE_URL}events.json?countryCode=${this.searchValue}&apikey=${this.apiKey}&size=8&page=${this.page}`;

    const response = await fetch(url);
    const data = await response.json();
    this.page += 1;
    return data._embedded?.events || [];
  }

  get query() {
    return this.searchValue;
  }

  set query(newValue) {
    return (this.searchValue = newValue);
  }
}

const listRef = document.querySelector('.list');
const imgRef = document.querySelector('.header-icon');
const continerRef = document.querySelector('.container-input');

const inputRef = document.querySelector('.country-icon');

inputRef.addEventListener('click', () => {
  continerRef.classList.add('is-active');
});

document.addEventListener('click', event => {
  if (!inputRef.contains(event.target) && !listRef.contains(event.target)) {
    continerRef.classList.remove('is-active');
  }
});

function renderList() {
  listRef.innerHTML = '';

  const search = (inputRef.value || '').trim().toLowerCase();

  let filteredCountries;
  if (!search) {
    filteredCountries = countries;
  } else {
    filteredCountries = countries.filter(country => {
      const value = String(country.value || country.label || '').toLowerCase();
      return (
        value === search ||
        value.startsWith(search) ||
        (search.length >= 2 && value.slice(0, 2) === search.slice(0, 2))
      );
    });
  }

  const frag = document.createDocumentFragment();
const containerBaseCards = document.querySelector('.cards');

  for (const el of filteredCountries) {
    const li = document.createElement('li');
    li.className = 'list-li';

    const p = document.createElement('p');
    p.textContent = el.label;
    p.style.color = 'black';
      p.style.textAlign = 'center';
      p.style.padding = '10px';

    li.id = el.value;
    li.appendChild(p);
    frag.appendChild(li);

    li.addEventListener('click', () => {
      containerBaseCards.classList.add('cards-display__none');
      loadMoreBtn.classList.add('load-btn__display');
    
    })
  } 
  listRef.appendChild(frag);
}

inputRef.addEventListener('input', renderList);
renderList();

const api = new NewApiCountry();

const loadMoreBtn = document.querySelector('.loadMoreBtn');

loadMoreBtn.addEventListener('click', () => {
  api.fetchCards().then(events => {
    if (!events.length) {
      loadMoreBtn.style.display = 'none'; 
      return;
    }
    renderCards(events, true); 
  });
});