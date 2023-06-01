/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import RestaurantIdb from '../src/scripts/data/restaurant-idb';

describe('Menyukai sebuah film', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('Harusnya menunjukan tombol like ketika restoran belum pernah dilike sebelumnya',
      async () => {
        await LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant: {
            id: 1,
          },
        });
        expect(document.querySelector('[aria-label="like this restaurant"]'))
            .toBeTruthy();
      });

  it('Harusnya tidak menunjukkan tombol unlike ketika restoran belum pernah dilike sebelumnya', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="unlike this movie"]'))
        .toBeFalsy();
  });

  it('Harusnya bisa melalukan like pada restoran', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await RestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({id: 1});

    RestaurantIdb.deleteRestaurant(1);
  });

  it('Harusnya tidak menambahkan restoran lagi jika sudah dilike', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    await RestaurantIdb.putRestaurant({id: 1});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await RestaurantIdb.getAllRestaurant()).toEqual([{id: 1}]);
    RestaurantIdb.deleteRestaurant(1);
  });


  xit('Harusnya tidak menambahkan restoran jika restoran tidak memiliki id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});

