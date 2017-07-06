import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import Image from '../../components/Gallery/Image.react';

const image = {
  src: 'DummyPath',
};

describe('<Image />', () => {
  it('Match Snapshot', () => {    
    const component = renderer.create(<Image image={image} isActive={false} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('componentWillReceiveProps', () => {
    sinon.spy(Image.prototype, 'componentWillReceiveProps');
    const wrapper = mount(<Image image={image} isActive={false} />);
    expectChai(Image.prototype.componentWillReceiveProps).to.have.property('callCount', 0);
    wrapper.setProps({ image: { src: 'Another DummyPath' }, isActive: true });
    expectChai(Image.prototype.componentWillReceiveProps).to.have.property('callCount', 1);
  });
});
