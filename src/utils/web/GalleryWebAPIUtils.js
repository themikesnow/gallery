import GalleryActionCreators from '../../actions/GalleryActionCreators';

const C_ITEMS_PER_PAGE = 10;
const REST_API = `https://www.flickr.com/services/rest/?api_key=097e9fb9fa9ab34a7eaa9d5b527e9963&per_page=${C_ITEMS_PER_PAGE}&format=json&nojsoncallback=?&extras=url_q,url_o&method=flickr.photos.search`;

export default class GalleryWebAPIUtils {

  static search(text, page) {
    const thePage = (page || 1);
    if (text) {
      fetch(`${REST_API}&text=${text}&page=${thePage}`)
      .then(response => response.json()).then((data) => {
        GalleryActionCreators.receiveImages(data, null);
      })
      .catch((err) => {
        GalleryActionCreators.receiveImages(null, err);
      });
    } else {
      GalleryActionCreators.receiveImages([], '');
    }
  }

}
