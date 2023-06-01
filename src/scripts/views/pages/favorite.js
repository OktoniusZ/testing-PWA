import RestaurantIdb from '../../data/restaurant-idb';
import {createRestaurantItemTemplate} from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <div class="main" id="daftar-restoran">
      <div>
        <div id="restaurants" class="card-section"></div>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');

    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantContainer.innerHTML +=
      `<h2 class="restaurants-not-found">
        Tidak ada restaurant untuk ditampilkan</h2>`;
    }
  },
};

export default Favorite;
