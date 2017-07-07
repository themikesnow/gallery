import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { expect as expectChai } from 'chai';
import sinon from 'sinon';

import SearchInput from '../../components/SearchInput/SearchInput.react';

describe('<SearchInput />', () => {
  it('Match Snapshot', () => {
    const myMock = jest.fn();
    let component = renderer.create(<SearchInput onSearch={myMock} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<SearchInput onSearch={myMock} isBusy />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle null onSearch prop when submit button clicked', () => {
    const wrapper = mount(<SearchInput onSearch={null} />);
    wrapper.find('.btn-submit').simulate('click');
    // No need to check function/mock...
  });

  it('should call onSearch when submit button clicked', () => {
    const myMock = jest.fn();
    const wrapper = mount(<SearchInput onSearch={myMock} />);
    wrapper.find('.btn-submit').simulate('click');
    expectChai(myMock.mock.calls.length).to.equal(1);
  });

  it('should call onChange', () => {
    sinon.spy(SearchInput.prototype, 'onChange');
    const myMock = jest.fn();
    const wrapper = mount(<SearchInput onSearch={myMock} />);

    wrapper.find('.search-input input').simulate('change', { target: { value: 'test' } });
    expectChai(SearchInput.prototype.onChange).to.have.property('callCount', 1);
  });

  it('should call onSearch when enter pressed on the search input', () => {
    const myMock = jest.fn();
    const wrapper = mount(<SearchInput onSearch={myMock} />);
    wrapper.find('.search-input input').simulate('keyPress', { key: 'Enter' });
    expectChai(myMock.mock.calls.length).to.equal(1);
  });

  it('should Not call onSearch when key (not enter) pressed on the search input', () => {
    const myMock = jest.fn();
    const wrapper = mount(<SearchInput onSearch={myMock} />);
    wrapper.find('.search-input input').simulate('keyPress', { key: 'Backspace' });
    expectChai(myMock.mock.calls.length).to.equal(0);
  });
});
