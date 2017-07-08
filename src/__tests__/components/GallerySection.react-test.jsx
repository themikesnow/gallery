import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import InitialState from '../../constants/initialStates/Gallery';
import { Images } from '../data/Gallery';


import GallerySectionContainer, { GallerySection } from '../../components/Gallery/GallerySection.react';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
InitialState.images = Images;
const store = mockStore(InitialState);

describe('<GallerySection />', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <GallerySectionContainer />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onSearch when enter pressed on the search input', () => {
    sinon.spy(GallerySection.prototype, 'onSearch');
    const wrapper = mount(
      <Provider store={store}>
        <GallerySectionContainer />
      </Provider>,
    );
    wrapper.find('.btn-submit').simulate('click');
    expectChai(GallerySection.prototype.onSearch).to.have.property('callCount', 1);
  });

  it('should call onSelectImage when image is clicked', () => {
    sinon.spy(GallerySection.prototype, 'onSelectImage');
    const wrapper = mount(
      <Provider store={store}>
        <GallerySectionContainer />
      </Provider>,
    );
    wrapper.find('#image-0').simulate('click');
    expectChai(GallerySection.prototype.onSelectImage).to.have.property('callCount', 1);
  });

  it('should call onPreviousImage when previuos button is clicked', () => {
    sinon.spy(GallerySection.prototype, 'onPreviousImage');
    const wrapper = mount(
      <Provider store={store}>
        <GallerySectionContainer />
      </Provider>,
    );
    wrapper.find('.btn-previous').simulate('click');
    expectChai(GallerySection.prototype.onPreviousImage).to.have.property('callCount', 1);
  });

  it('should call onNextImage when next button is clicked', () => {
    sinon.spy(GallerySection.prototype, 'onNextImage');
    const wrapper = mount(
      <Provider store={store}>
        <GallerySectionContainer />
      </Provider>,
    );
    wrapper.find('.btn-next').simulate('click');
    expectChai(GallerySection.prototype.onNextImage).to.have.property('callCount', 1);
  });
});
