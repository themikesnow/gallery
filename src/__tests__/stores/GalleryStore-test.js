import GalleryStore from '../../stores/GalleryStore';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import { ActionTypes } from '../../constants/AppConstants';

const theSearchText = 'DUMMY SEARCH';
const IMAGES = [
    {
        src: 'image 1',
        thumbnail: 'imag 1 thumbnail',
    },
    {
        src: 'image 2',
        thumbnail: 'imag 2 thumbnail',
    },
    {
        src: 'image 3',
        thumbnail: 'imag 3 thumbnail',
    },
];

const RESPONSE = {
    photos: {
        page: 0,
        pages: 2,
        photo: [            
            {
                url_o: 'image 1',
                url_q: 'imag 1 thumbnail',
            },
            {
                url_o: 'image 2',
                url_q: 'imag 2 thumbnail',
            },
             {
                url_o: 'image 3',
                url_q: 'imag 3 thumbnail',
            },

        ],
    }
};

describe('ReleaseNotesStore', () => {
  beforeEach(() => {
    AppDispatcher.dispatch({ type: ActionTypes.INIT });    
  });

  it('data inital state', () => {
    expect(GalleryStore.getImages()).toEqual(null);
    expect(GalleryStore.getSelectedImage()).toEqual(0);
    expect(GalleryStore.getPage()).toEqual(0);
    expect(GalleryStore.isBusy()).toEqual(false);
    expect(GalleryStore.isPreviousEnabled()).toEqual(false);
    expect(GalleryStore.hasErrors()).toEqual(false);
    expect(GalleryStore.getSearchText()).toEqual(null);
    
  }); 

  it('should update busy flag to true and search text when search action is trigerred', () => {    
    AppDispatcher.dispatch({ type: ActionTypes.SEARCH, text: theSearchText });
    expect(GalleryStore.isBusy()).toEqual(true);
    expect(GalleryStore.getSearchText()).toEqual(theSearchText);    
  });

  it('should received photos', () => {    
    AppDispatcher.dispatch({ type: ActionTypes.RECEIVE_IMAGES, response: RESPONSE });
    expect(GalleryStore.isBusy()).toEqual(false);
    expect(GalleryStore.getImages()).toEqual(IMAGES);    
  });

  it('should update selected image', () => {    
    const selectedImage = 9;
    AppDispatcher.dispatch({ type: ActionTypes.SET_SELECTED_IMAGE, selectedImage });
    expect(GalleryStore.getSelectedImage()).toEqual(selectedImage);    
  });

  it('should handle previous move when is at the beginning', () => {        
    AppDispatcher.dispatch({ type: ActionTypes.GO_TO_PREVIOUS_IMAGE });
    expect(GalleryStore.getSelectedImage()).toEqual(0);    
  });

  it('should decrease selected image', () => {        
    AppDispatcher.dispatch({ type: ActionTypes.RECEIVE_IMAGES, response: RESPONSE });
    expect(GalleryStore.getSelectedImage()).toEqual(0);    
    AppDispatcher.dispatch({ type: ActionTypes.GO_TO_NEXT_IMAGE });
    expect(GalleryStore.getSelectedImage()).toEqual(1);    
    AppDispatcher.dispatch({ type: ActionTypes.GO_TO_PREVIOUS_IMAGE });
    expect(GalleryStore.getSelectedImage()).toEqual(0);    
  });

  it('should move to next image', () => {        
    AppDispatcher.dispatch({ type: ActionTypes.RECEIVE_IMAGES, response: RESPONSE });
    expect(GalleryStore.isNextEnabled()).toEqual(true);    
    AppDispatcher.dispatch({ type: ActionTypes.GO_TO_NEXT_IMAGE });
    expect(GalleryStore.getSelectedImage()).toEqual(1);    
  });

  it('should set errors', () => {        
    const theError = 'AN ERROR';
    AppDispatcher.dispatch({ type: ActionTypes.RECEIVE_IMAGES, response: RESPONSE, errors: theError });
    expect(GalleryStore.hasErrors()).toEqual(true);    
  });
});