import { ActionTypes, Config } from '../constants/AppConstants';

export const receiveImages = (response, errors) => ({
  type: ActionTypes.RECEIVE_IMAGES,
  response,
  errors,
});

export const fetchImages = (searchText, page) => (dispatch) => {
  const thePage = (page || 1);
  return fetch(`${Config.REST_API}&text=${searchText}&page=${thePage}`)
          .then(response => response.json()).then((data) => {
            dispatch(receiveImages(data, null));
          }).catch((err) => {
            dispatch(receiveImages(null, err));
          });
};

const onSearch = searchText => ({
  type: ActionTypes.SEARCH,
  searchText,
});

export const search = searchText => (dispatch) => {
  dispatch(onSearch(searchText));
  dispatch(fetchImages(searchText, 0));
};

export const fetchMoreImagesIfNeeded = () => (dispatch, getState) => {
  if (!getState().isBusy && getState().images && getState().responseDetails.page < getState().responseDetails.pages && getState().selectedImage > getState().images.length - 2) {
    dispatch(fetchImages(getState().searchText, getState().responseDetails.page + 1));
  }
};

export const setSelectedImage = selectedImage => ({
  type: ActionTypes.SET_SELECTED_IMAGE,
  selectedImage,
});

export const goToPreviousImage = () => ({
  type: ActionTypes.GO_TO_PREVIOUS_IMAGE,
});

export const goToNextImage = () => ({
  type: ActionTypes.GO_TO_NEXT_IMAGE,
});
