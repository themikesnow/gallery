import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import Slider from '../../components/Gallery/Slider.react';

const image = {
  src: 'DummyPath',
};

describe('<Slider />', () => {
  it('Match Snapshot', () => {
    const onPreviousMock = jest.fn();
    const onNextMock = jest.fn();
    let component = renderer.create(<Slider image={image} onPreviousImage={onPreviousMock} onNextImage={onNextMock} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<Slider image={image} onPreviousImage={onPreviousMock} onNextImage={onNextMock} />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls props onPreviousImage', () => {
    const onPreviousMock = jest.fn();
    const onNextMock = jest.fn();
    const wrapper = mount(<Slider image={image} onPreviousImage={onPreviousMock} onNextImage={onNextMock} />);
    wrapper.find('.btn-previous').simulate('click');

    expectChai(onPreviousMock.mock.calls.length).to.equal(1);
  });

  it('calls props onNextImage', () => {
    const onPreviousMock = jest.fn();
    const onNextMock = jest.fn();
    const wrapper = mount(<Slider image={image} onPreviousImage={onPreviousMock} onNextImage={onNextMock} />);
    wrapper.find('.btn-next').simulate('click');

    expectChai(onNextMock.mock.calls.length).to.equal(1);
  });


  it('Updates loading flag when new image is received', () => {
    const onPreviousMock = jest.fn();
    const onNextMock = jest.fn();
    const wrapper = mount(<Slider image={image} onPreviousImage={onPreviousMock} onNextImage={onNextMock} />);
    wrapper.setProps({ image: { src: 'Another DummyPath' } });
    expectChai(wrapper.state().isLoading).to.equal(true);
  });
});
