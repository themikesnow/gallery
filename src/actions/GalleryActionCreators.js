import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import GalleryWebAPIUtils from '../utils/web/GalleryWebAPIUtils';

export default class GalleryActionCreators {

  static search(text) {
    AppDispatcher.dispatch({ type: ActionTypes.SEARCH, text });
    GalleryWebAPIUtils.search(text);
  }

  static receiveImages(response, errors) {
    AppDispatcher.dispatch({ type: ActionTypes.RECEIVE_IMAGES, response, errors });
  }

  static setSelectedImage(selectedImage) {
    AppDispatcher.dispatch({ type: ActionTypes.SET_SELECTED_IMAGE, selectedImage });
  }

  static goToPreviousImage() {
    AppDispatcher.dispatch({ type: ActionTypes.GO_TO_PREVIOUS_IMAGE });
  }

  static goToNextImage() {
    AppDispatcher.dispatch({ type: ActionTypes.GO_TO_NEXT_IMAGE });
  }

}
