import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { expect as expectChai } from 'chai';

import Navbar from '../../components/Navbar/Navbar.react';

describe('<Navbar />', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(<Navbar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render classes', () => {
    const wrapper = shallow(<Navbar />);
    expectChai(wrapper.find('.navbar')).to.have.length(1);
    expectChai(wrapper.find('.content')).to.have.length(1);
    expectChai(wrapper.find('.brand')).to.have.length(1);
  });
});
