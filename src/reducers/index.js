import { ActionTypes } from '../constants/AppConstants';


function setSearchText(state, searchText) {
  return {
    ...state,
    searchText,
    selectedImage: 0,
    isBusy: true,
  };
}

function isNextEnabledFunc(images, selectedImage) {
  return images && selectedImage < (images.length - 1);
}

function isPreviousEnabledFunc(selectedImage) {
  return selectedImage > 0;
}

function setSelectedImage(state, theSelectedImage) {
  return {
    ...state,
    selectedImage: theSelectedImage,
    isPreviousEnabled: isPreviousEnabledFunc(theSelectedImage),
    isNextEnabled: isNextEnabledFunc(state.images, theSelectedImage),
  };
}

function setImages(state, response, errors) {
  let hasErrors = false;
  const responseDetails = {};
  let images = state.images;

  if (errors) {
    hasErrors = true;
  } else {
    responseDetails.page = response.photos.page;
    responseDetails.pages = response.photos.pages;
    responseDetails.itemsPerPage = response.photos.perpage;

    if (!images) {
      images = [];
    }

    for (let i = 0; i < response.photos.photo.length; i++) {
      images.push({
        src: response.photos.photo[i].url_o,
        thumbnail: response.photos.photo[i].url_q,
      });
    }
  }

  return {
    ...state,
    isBusy: false,
    hasErrors,
    responseDetails,
    images,
    isPreviousEnabled: isPreviousEnabledFunc(0),
    isNextEnabled: isNextEnabledFunc(images, 0),
  };
}

function moveToImage(state, step) {
  let theSelectedImage = state.selectedImage;
  if (step > 0 && isNextEnabledFunc(state.images, theSelectedImage)) {
    theSelectedImage += step;
  } else if (step < 0 && isPreviousEnabledFunc(theSelectedImage)) {
    theSelectedImage += step;
  }

  return {
    ...state,
    selectedImage: theSelectedImage,
    isPreviousEnabled: isPreviousEnabledFunc(theSelectedImage),
    isNextEnabled: isNextEnabledFunc(state.images, theSelectedImage),
  };
}

const images = (state = {
  searchText: '',
  selectedImage: 0,
  isBusy: false,
  images: null,
  isPreviousEnabled: false,
  isNextEnabled: false,
  responseDetails: {},
}, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return setSearchText(state, action.searchText);
    case ActionTypes.RECEIVE_IMAGES:
      return setImages(state, action.response, action.errors);
    case ActionTypes.SET_SELECTED_IMAGE:
      return setSelectedImage(state, action.selectedImage);
    case ActionTypes.GO_TO_PREVIOUS_IMAGE:
      return moveToImage(state, -1);
    case ActionTypes.GO_TO_NEXT_IMAGE:
      return moveToImage(state, 1);
    default:
      return state;
  }
};

export default images;
