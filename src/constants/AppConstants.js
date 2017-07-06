import keyMirror from 'keymirror';

export const LocaleTypes = {
  EN: 'en',
  ES: 'es',
};

export const AppEventTypes = {
  CHANGE: 'change',
};

export const IconTypes = keyMirror({
  LOGO: null,
});

export const ActionTypes = keyMirror({
  // Message Actions
  CHANGE_LOCALE: null,

  // Gallery Actions
  INIT: null,
  SEARCH: null,
  RECEIVE_IMAGES: null,
  SET_SELECTED_IMAGE: null,
  GO_TO_PREVIOUS_IMAGE: null,
  GO_TO_NEXT_IMAGE: null,
});
