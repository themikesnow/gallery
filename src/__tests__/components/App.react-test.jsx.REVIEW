import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';

import App from '../../components/App/App.react';
import Navbar from '../../components/Navbar/Navbar.react';
import GallerySection from '../../components/Gallery/GallerySection.react';

describe('<SearchInput />', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render children correctly', () => {
    const wrapper = mount(<App />);

    expectChai(wrapper.contains(<Navbar />)).to.equal(true);
    expectChai(wrapper.contains(<GallerySection />)).to.equal(true);
    expectChai(wrapper.find('.app')).to.have.length(1);
    expectChai(wrapper.find('.main')).to.have.length(1);
  });
});
