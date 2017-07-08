import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from '../../actions';
import { Config, ActionTypes } from '../../constants/AppConstants';
import { ImageResponse } from '../data/Gallery';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = ImageResponse;

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action to receive the images', () => {
    const errors = null;
    const expectedAction = {
      type: ActionTypes.RECEIVE_IMAGES,
      response,
      errors,
    };
    expect(actions.receiveImages(response, errors)).toEqual(expectedAction);
  });

  it('should create an action to select an image', () => {
    const selectedImage = 7;
    const expectedAction = {
      type: ActionTypes.SET_SELECTED_IMAGE,
      selectedImage,
    };
    expect(actions.setSelectedImage(selectedImage)).toEqual(expectedAction);
  });

  it('should create an action to move to the previous image', () => {
    const expectedAction = {
      type: ActionTypes.GO_TO_PREVIOUS_IMAGE,
    };
    expect(actions.goToPreviousImage()).toEqual(expectedAction);
  });

  it('should create an action to move to the next image', () => {
    const expectedAction = {
      type: ActionTypes.GO_TO_NEXT_IMAGE,
    };
    expect(actions.goToNextImage()).toEqual(expectedAction);
  });

  it('creates search and fetch actions when a search is executed', () => {
    const searchText = 'DummySearch';

    nock(Config.REST_API)
      .get(`/${Config.REST_DEFAULT_PARAMS}&text=${searchText}&page=1`)
      .reply(200, { photos: response.photos });

    const expectedActions = [
      {
        type: ActionTypes.SEARCH,
        searchText,
      },
      {
        type: ActionTypes.REQUEST_IMAGES,
      },
      {
        type: ActionTypes.RECEIVE_IMAGES,
        response,
        errors: null,
      },
    ];

    const store = mockStore({ photos: [] });

    return store.dispatch(actions.search(searchText)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not call action to fetch more images', () => {
    const store = mockStore({
      isBusy: false,
    });

    store.dispatch(actions.fetchMoreImagesIfNeeded());
    expect(store.getActions()).toEqual([]);
  });

  it('should call action to fetch more images', () => {
    const expectedActions = [{ type: ActionTypes.REQUEST_IMAGES }];
    const store = mockStore({
      isBusy: false,
      images: [{}, {}],
      responseDetails: {
        page: 0,
        pages: 10,
      },
      selectedImage: 1,
    });

    store.dispatch(actions.fetchMoreImagesIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
