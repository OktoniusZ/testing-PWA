/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
const assert = require('assert');
Feature('Liking Restaurant');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});

// Scenario('showing empty liked restauranst', ({I}) => {
//   I.seeElement('#restaurants');
//   I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants-not-found');
// });

Scenario('liking and unliking restaurant', async ({I}) => {
  // like restaurant
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants-not-found');

  I.amOnPage('/');

  I.waitForElement('#restaurant_title', 5);

  const firstFilm = locate('#restaurant_title').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilm);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.card', 5);
  const likedFilmTitle = await I.grabTextFrom('#restaurant_title');
  pause();
  assert.strictEqual(firstFilmTitle, likedFilmTitle);

  // unliking the restaurant
  I.click(firstFilm);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
});
