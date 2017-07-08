import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';

import { InitialState } from '../../constants/initialStates/Gallery';

import App from '../../components/App/App.react';
import Navbar from '../../components/Navbar/Navbar.react';
import GallerySectionContainer from '../../components/Gallery/GallerySection.react';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(InitialState);


describe('<SearchInput />', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render children correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expectChai(wrapper.contains(<Navbar />)).to.equal(true);
    expectChai(wrapper.contains(<GallerySectionContainer />)).to.equal(true);
    expectChai(wrapper.find('.app')).to.have.length(1);
    expectChai(wrapper.find('.main')).to.have.length(1);
  });
});
