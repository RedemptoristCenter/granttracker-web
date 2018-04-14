import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Search } from 'src/features/grants/Search';

describe('grants/Search', () => {
  it('renders node with correct class name', () => {
    const props = {
      grants: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Search {...props} />
    );

    expect(
      renderedComponent.find('.grants-search').getElement()
    ).to.exist;
  });
});
