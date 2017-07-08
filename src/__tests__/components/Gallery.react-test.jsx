import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';

import Gallery from '../../components/Gallery/Gallery.react';

let onSearchMock;
let onPreviousImageMock;
let onNextImageMock;
let onSelectImageMock;

const images = [
  {
    src: 'DummyPath',
  },
];
describe('<Gallery />', () => {
  beforeEach(() => {
    onSearchMock = jest.fn();
    onPreviousImageMock = jest.fn();
    onNextImageMock = jest.fn();
    onSelectImageMock = jest.fn();
  });

  it('Match Snapshot', () => {
    const component = renderer.create(<Gallery
      images={images} selectedImage={0} onSearch={onSearchMock}
      onPreviousImage={onPreviousImageMock}
      onNextImage={onNextImageMock}
      onSelectImage={onSelectImageMock}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onSearch', () => {
    const wrapper = mount(<Gallery
      images={images} selectedImage={0} onSearch={onSearchMock}
      onPreviousImage={onPreviousImageMock}
      onNextImage={onNextImageMock}
      onSelectImage={onSelectImageMock}
    />);
    wrapper.find('.btn-submit').simulate('click');
    expectChai(onSearchMock.mock.calls.length).to.equal(1);
  });
});

