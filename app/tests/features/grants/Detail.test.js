import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Detail } from 'src/features/grants/Detail';

describe('grants/Detail', () => {
  it('renders node with correct class name', () => {
    const props = {
      grants: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Detail {...props} />
    );

    expect(
      renderedComponent.find('.grants-detail').getElement()
    ).to.exist;
  });
});
