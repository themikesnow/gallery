import reducer from '../../reducers';
import { ActionTypes } from '../../constants/AppConstants';
import InitialState from '../../constants/initialStates/Gallery';
import { ImageResponse } from '../data/Gallery';

const images = [
  {
    src: ImageResponse.photos.photo[0].url_o,
    thumbnail: ImageResponse.photos.photo[0].url_q,
  },
  {
    src: ImageResponse.photos.photo[1].url_o,
    thumbnail: ImageResponse.photos.photo[1].url_q,
  },
];

describe('gallery reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(InitialState);
  });

  it('should handle search', () => {
    expect(reducer([], {
      type: ActionTypes.SEARCH,
      searchText: 'Dummy Text',
    }))
    .toEqual({
      searchText: 'Dummy Text',
      isBusy: true,
      selectedImage: 0,
      images: null,
    });
  });

  it('should receive images', () => {
    expect(reducer([], {
      type: ActionTypes.RECEIVE_IMAGES,
      response: ImageResponse,
    }))
    .toEqual({
      responseDetails: {
        page: ImageResponse.photos.page,
        pages: ImageResponse.photos.pages,
        itemsPerPage: ImageResponse.photos.perpage,
      },
      images,
      isBusy: false,
      hasErrors: false,
      isNextEnabled: true,
      isPreviousEnabled: false,
    });
  });

  it('should receive images', () => {
    expect(reducer([], {
      type: ActionTypes.RECEIVE_IMAGES,
      response: ImageResponse,
      errors: 'ERROR',
    }))
    .toEqual({
      responseDetails: {},
      images: undefined,
      isBusy: false,
      hasErrors: true,
      isNextEnabled: false,
      isPreviousEnabled: false,
    });
  });

  it('should not update selectedIamge when selection is not valid', () => {
    const selectedImage = 1;
    const state = InitialState;

    expect(reducer(state, {
      type: ActionTypes.SET_SELECTED_IMAGE,
      selectedImage,
    }))
    .toEqual({
      ...state,
      selectedImage: 0,
    });
  });

  it('should select image will not update state if no valid selection', () => {
    const selectedImage = 1;
    const state = InitialState;
    state.images = images;

    expect(reducer(state, {
      type: ActionTypes.SET_SELECTED_IMAGE,
      selectedImage,
    }))
    .toEqual({
      ...state,
      selectedImage,
      isPreviousEnabled: true,
      isNextEnabled: false,
    });
  });

  it('should move to next image', () => {
    const state = InitialState;
    state.images = images;

    expect(reducer(state, {
      type: ActionTypes.GO_TO_NEXT_IMAGE,
    }))
    .toEqual({
      ...state,
      selectedImage: 1,
      isPreviousEnabled: true,
      isNextEnabled: false,
    });
  });

  it('should move to previous image', () => {
    const state = InitialState;
    state.images = images;
    state.selectedImage = 1;

    expect(reducer(state, {
      type: ActionTypes.GO_TO_PREVIOUS_IMAGE,
    }))
    .toEqual({
      ...state,
      selectedImage: 0,
      isPreviousEnabled: false,
      isNextEnabled: true,
    });
  });
});
