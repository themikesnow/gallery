import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import GallerySection from '../../components/Gallery/GallerySection.react';

describe('<GallerySection />', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(<GallerySection />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillUnmount', () => {
    sinon.spy(GallerySection.prototype, 'componentWillUnmount');
    const wrapper = mount(<GallerySection />);
    expectChai(GallerySection.prototype.componentWillUnmount).to.have.property('callCount', 0);
    wrapper.unmount();
    expectChai(GallerySection.prototype.componentWillUnmount).to.have.property('callCount', 1);
  });
});