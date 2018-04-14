import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Search } from 'src/features/clients/Search';

describe('clients/Search', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Search {...props} />
    );

    expect(
      renderedComponent.find('.clients-search').getElement()
    ).to.exist;
  });
});
