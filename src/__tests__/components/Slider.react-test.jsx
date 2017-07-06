import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import Slider from '../../components/Gallery/Slider.react';

const image = {
  src: 'DummyPath',
};


describe('<Slider />', () => {
  it('Match Snapshot', () => {
    let component = renderer.create(<Slider image={image} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<Slider />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onClickPrevious', () => {
    sinon.spy(Slider.prototype, 'onClickPrevious');
    const wrapper = mount(<Slider image={image} />);
    wrapper.find('.btn-previous').simulate('click');

    expectChai(Slider.prototype.onClickPrevious).to.have.property('callCount', 1);
  });

  it('calls onClickNext', () => {
    sinon.spy(Slider.prototype, 'onClickNext');
    const wrapper = mount(<Slider image={image} />);
    wrapper.find('.btn-next').simulate('click');

    expectChai(Slider.prototype.onClickNext).to.have.property('callCount', 1);
  });

  it('Updates loading flag when new image is received', () => {
    const wrapper = mount(<Slider image={image} />);
    wrapper.setProps({ image: { src: 'Another DummyPath' } });
    expectChai(wrapper.state().isLoading).to.equal(true);
  });
});
