import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {createRestaurantDetailTemplate} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
          <div id="restaurant-detail" class="restaurant-detail"></div>
          <div id="drinks-container">
            <h2>Drinks</h2>
            <ul>
              <p id="drinks"></p>
            </ul>
          </div>
          <div id="foods-container">
            <h2>Foods</h2>
            <ul>
              <p id="foods"></p>
            </ul>
          </div>
          <div id="reviews-container">
          <h2>Customer Reviews</h2>
          <ul>
            <p id="reviews"></p>
          </ul>
          </div>
          <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant-detail');
    const drinksContainer = document.getElementById('drinks');
    const foodsContainer = document.getElementById('foods');
    const reviewsContainer = document.getElementById('reviews');

    const drinks = restaurant.restaurant.menus.drinks;
    const foods = restaurant.restaurant.menus.foods;
    const reviews = restaurant.restaurant.customerReviews;
    console.log(restaurant.restaurant);

    restaurantContainer.innerHTML =
    createRestaurantDetailTemplate(restaurant.restaurant);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        pictureId: restaurant.restaurant.pictureId,
        rating: restaurant.restaurant.rating,
      },
    });

    drinks.forEach((drink) => {
      drinksContainer.innerHTML += `<p>- ${drink.name}</p>`;
    });

    foods.forEach((food) => {
      foodsContainer.innerHTML += `<p>- ${food.name}</p>`;
    });

    reviews.forEach((review) => {
      reviewsContainer.innerHTML +=
      `<p>- ${review.name},"${review.review}"</p>`;
    });
  },
};

export default Detail;
