import keyMirror from 'keymirror';

const C_ITEMS_PER_PAGE = 10;

export const Config = {
  REST_API: 'https://www.flickr.com/services/rest',
  REST_DEFAULT_PARAMS: `?api_key=097e9fb9fa9ab34a7eaa9d5b527e9963&per_page=${C_ITEMS_PER_PAGE}&format=json&nojsoncallback=?&extras=url_q,url_o&method=flickr.photos.search`,
};

export const AppEventTypes = {
  CHANGE: 'change',
};

export const IconTypes = keyMirror({
  LOGO: null,
});

export const ActionTypes = keyMirror({
  INIT: null,
  SEARCH: null,
  REQUEST_IMAGES: null,
  RECEIVE_IMAGES: null,
  SET_SELECTED_IMAGE: null,
  GO_TO_PREVIOUS_IMAGE: null,
  GO_TO_NEXT_IMAGE: null,
});
