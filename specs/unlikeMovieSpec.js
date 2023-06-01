/* eslint-disable max-len */
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import RestaurantIdb from '../src/scripts/data/restaurant-idb';

describe('Unliking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await RestaurantIdb.putRestaurant({id: 1});
  });

  afterEach(async () => {
    await RestaurantIdb.deleteRestaurant(1);
  });

  it('Harusnya menampilkan widget unlike ketika restoran sudah disukai', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeTruthy();
  });

  it('Harusnya tidak menampilkan like widget ketika restoran sudah disukai',
      async () => {
        await LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant: {
            id: 1,
          },
        });

        expect(document.querySelector('[aria-label="like this restaurant"]'))
            .toBeFalsy();
      });

  it('Harusnya dapat menghapus restoran yang disukai dari list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    document.querySelector('[aria-label="unlike this restaurant"]')
        .dispatchEvent(new Event('click'));
    expect(await RestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  it('Harusnya tidak menghasilkan error ketika restoran yang belum dilike tidak ada didalam list',
      async () => {
        await LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant: {
            id: 1,
          },
        });
        // hapus dulu film dari daftar film yang disukai
        await RestaurantIdb.deleteRestaurant(1);
        // kemudian, simulasikan pengguna menekan widget batal menyukai film
        document.querySelector('[aria-label="unlike this restaurant"]')
            .dispatchEvent(new Event('click'));
        expect(await RestaurantIdb.getAllRestaurant()).toEqual([]);
      });
});
