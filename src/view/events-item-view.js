import {createElement} from '../render.js';
import {humanizePointDate, humanizePointTime} from '../utils.js';


const createOffers = (offers, offersModel) => {
  const carrentOffers = offers.map((id) => offersModel.offers.find((offer) => id === offer.id));
  return carrentOffers.map((offer) => offer !== undefined ?
    `<li class="event__offer">
     <span class="event__offer-title">${offer.title}</span>
     &plus;&euro;&nbsp;
     <span class="event__offer-price">${offer.price}</span>
   </li>` : '').join('');
};

function createPointTemplate(point, offersModel, destination) {
  const {dateFrom, dateTo, offers, type, basePrice} = point;

  const date = humanizePointDate(dateFrom);

  const generateTime = (time) => humanizePointTime(time);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${generateTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${generateTime(dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${createOffers(offers, offersModel)}</ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class EventsItemView {
  constructor({point, offers, destination}) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}