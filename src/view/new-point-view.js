import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {BLANK_POINT, DateFormat} from '../const.js';
import {humanizePointDate} from '../utils/point.js';

function createOffers(offers, type, offersModel) {
  const offersByType = offersModel.find((offer) => offer.type.toLowerCase() === type.toLowerCase());

  return offersByType.offers.map((offer) => {
    const checked = offers.includes(offer.id) ? 'checked' : '';

    return `
     <div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" data-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${checked}>
       <label class="event__offer-label" for="event-offer-${offer.id}">
         <span class="event__offer-title">${offer.title}</span>
         &plus;&euro;&nbsp;
         <span class="event__offer-price">${offer.price}</span>
       </label>
     </div>`;
  }).join(' ');
}

function getPictures (pictures) {
  return pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`);
}

function createDestinations(destinations) {
  return destinations.reduce((acc, destination) => acc.includes(destination.name) ? acc : `${acc}
  <option value="${destination.name}"></option>
`, '');
}

function createNewPointTemplate(point, offersModel, destinations) {
  const {dateFrom, dateTo, offers, type, basePrice} = point;
  const carrentDestination = destinations.find((destination) => destination.id === point.id);
  const {name, description, pictures} = carrentDestination;

  const startTime = humanizePointDate(dateFrom, DateFormat.FORM_DATE_FORMAT);
  const endTime = humanizePointDate(dateTo, DateFormat.FORM_DATE_FORMAT);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">${createDestinations(destinations)}</datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${createOffers(offers, type, offersModel)}</div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">${getPictures(pictures)}</div>
        </div>
      </section>
    </section>
  </form>
</li>`;
}

export default class NewPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;

  constructor({point = BLANK_POINT, offers, destinations, onFormSubmit}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this._setState(NewPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener( 'change', this.#destinationChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewPointView.parseStateToPoint(this._state), this.#offers, this.#destinations);
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };


  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.name);

    if (!selectedDestination) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: selectedDestination.id,
      id: selectedDestination.id,
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
