import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import Gallery from '../../components/Gallery/Gallery.react';

const images = [
  {
    src: 'DummyPath',
  },
];
describe('<Gallery />', () => {
  beforeEach(() => {
  });

  it('Match Snapshot', () => {
    const component = renderer.create(<Gallery images={images} selectedImage={0} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onSearch', () => {
    sinon.spy(Gallery.prototype, 'onSearch');
    const wrapper = mount(<Gallery images={images} />);
    expectChai(Gallery.prototype.onSearch).to.have.property('callCount', 0);
    wrapper.find('.btn-submit').simulate('click');
    expectChai(Gallery.prototype.onSearch).to.have.property('callCount', 1);
  });
});
