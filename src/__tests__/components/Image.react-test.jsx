import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import { Images } from '../data/Gallery';
import Image from '../../components/Gallery/Image.react';


describe('<Image />', () => {
  it('Match Snapshot', () => {
    const myMock = jest.fn();
    const component = renderer.create(<Image onSelectImage={myMock} image={Images[0]} id="test-id" isActive={false} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('componentWillReceiveProps', () => {
    sinon.spy(Image.prototype, 'componentWillReceiveProps');
    const myMock = jest.fn();
    const wrapper = mount(<Image onSelectImage={myMock} image={Images[0]} id="test-id" isActive={false} />);
    expectChai(Image.prototype.componentWillReceiveProps).to.have.property('callCount', 0);
    wrapper.setProps({ image: { src: 'Another DummyPath' }, isActive: true });
    expectChai(Image.prototype.componentWillReceiveProps).to.have.property('callCount', 1);
  });

  it('should call onSearch when submit button clicked', () => {
    const myMock = jest.fn();
    const wrapper = mount(<Image onSelectImage={myMock} image={Images[0]} id="test-id" isActive={false} />);
    wrapper.find('#test-id').simulate('click');
    expectChai(myMock.mock.calls.length).to.equal(1);
  });
});
