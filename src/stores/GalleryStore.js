import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes, AppEventTypes } from '../constants/AppConstants';
import GalleryWebAPIUtils from '../utils/web/GalleryWebAPIUtils';

const CHANGE_EVENT = AppEventTypes.CHANGE;
let isBusy = false;
let searchText = null;
let images = null;
let selectedImage = 0;
let hasErrors = false;
let responseDetails = {
  page: 0,
  pages: 0,
};

function init() {
  isBusy = false;
  searchText = null;
  images = null;
  selectedImage = 0;
  hasErrors = false;
  responseDetails = {
    page: 0,
    pages: 0,
  };
}

function setBusy(theIsBusy) {
  isBusy = theIsBusy;
}

function setImages(response, errors) {
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
}

function checkIfNeedToLoad() {
  if (!isBusy && responseDetails.page < responseDetails.pages && selectedImage > images.length - 2) {
    isBusy = true;
    GalleryWebAPIUtils.search(searchText, responseDetails.page + 1);
  }
}

function setSearchText(text) {
  searchText = text;
  images = null;
}

function setSelectedImage(theSelectedImage) {
  selectedImage = theSelectedImage;
  checkIfNeedToLoad();
}

function isNextEnabledFunc() {
  return images && selectedImage < (images.length - 1);
}

function isPreviousEnabledFunc() {
  return selectedImage > 0;
}

function moveToImage(step) {
  if (step > 0 && isNextEnabledFunc()) {
    selectedImage += step;
  } else if (step < 0 && isPreviousEnabledFunc()) {
    selectedImage += step;
  }
  checkIfNeedToLoad();
}

class GalleryStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  getImages() {
    return images;
  }
  getSelectedImage() {
    return selectedImage;
  }
  getPage() {
    return responseDetails.page;
  }
  getSearchText() {
    return searchText;
  }
  isBusy() {
    return isBusy;
  }
  isPreviousEnabled() {
    return isPreviousEnabledFunc();
  }
  isNextEnabled() {
    return isNextEnabledFunc();
  }
  hasErrors() {
    return hasErrors;
  }
}
const galleryStore = new GalleryStore();

galleryStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.INIT:
      init();
      galleryStore.emitChange();
      break;
    case ActionTypes.SEARCH:
      setSearchText(action.text);
      setBusy(true);
      galleryStore.emitChange();
      break;
    case ActionTypes.RECEIVE_IMAGES:
      setImages(action.response, action.errors);
      setBusy(false);
      galleryStore.emitChange();
      break;
    case ActionTypes.SET_SELECTED_IMAGE:
      setSelectedImage(action.selectedImage);
      galleryStore.emitChange();
      break;
    case ActionTypes.GO_TO_PREVIOUS_IMAGE:
      moveToImage(-1);
      galleryStore.emitChange();
      break;
    case ActionTypes.GO_TO_NEXT_IMAGE:
      moveToImage(1);
      galleryStore.emitChange();
      break;
    default:
      // do nothing
  }
});

export default galleryStore;
