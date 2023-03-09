const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33025622-104a63b9949010de5d5c4e66d';

function getImgApi(imgSearch, per_page = 12) {
  console.log('page', per_page);
  return fetch(
    `${BASE_URL}?q=${imgSearch}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
}

export { getImgApi };
