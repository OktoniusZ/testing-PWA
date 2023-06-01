import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurants) => {
  return `
  <div class="image">
    <img class="lazyload"
    data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" 
    alt="${restaurants.name}" />
  </div>
  <div class="info">
    <h2 class="title">${restaurants.name}</h2>
    <p class="kategori">Kategori : ${restaurants.categories[0].name}</p>
    <p>Alamat : ${restaurants.address}, Kota ${restaurants.city} </p>
    <p class="deskripsi">${restaurants.description}</p>
  </div>
`;
};

const createRestaurantItemTemplate = (restaurants) => `
    <div class="card" tabindex="0">
    <div class="imgBx">
        <img 
        class="lazyload"
        data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" 
        alt=${restaurants.name}>
    </div>
    <div class="content">
        <h2 id='restaurant_title'>
          <a href="/#/detail/${restaurants.id}">${restaurants.name} </a>
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Fugit placeat nobis similique magnam minima
            obcaecati officia repellendus expedita doloribus ipsam.</p>
        <p class='rating'>Rating : <i class='fa-solid fa-star'>
        </i>${restaurants.rating}</p>
    </div>
    </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;


export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
