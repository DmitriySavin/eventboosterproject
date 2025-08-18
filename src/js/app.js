import Handlebars from 'handlebars';
import template from 'bundle-text:../templates/cards.hbs';
import { cards } from '../js/cards.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Масив карток:', cards); // перевірка
  const compileTemplate = Handlebars.compile(template);
  document.getElementById('cards-container').innerHTML = compileTemplate({ cards });
});
