/* eslint-disable new-cap */
import RestaurantSource from '../../data/restaurant-source';
import {createRestaurantItemTemplate} from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <main class="main" id="daftar-restoran">
        <div class="judul">
          <h1>Daftar Restoran</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Repudiandae aperiam, illo temporibus veniam sapiente
            adipisci numquam excepturi reiciendis delectus earum unde 
            suscipit saepe dolorem voluptates. Totam tempore
            consequatur facere autem?</p>
        </div>
        <div>
          <div id="restaurants" class="card-section"></div>
        </div>
    </main>
      `;
  },
  async afterRender() {
    const restaurants = await RestaurantSource.Home();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
