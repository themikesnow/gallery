import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../components/Loading/Loading.react';

describe('<Loading />', () => {
  it('Match Snapshot', () => {
    let component = renderer.create(<Loading />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<Loading isIcon />);
    tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
