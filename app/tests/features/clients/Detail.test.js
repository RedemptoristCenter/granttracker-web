import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Detail } from 'src/features/clients/Detail';

describe('clients/Detail', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Detail {...props} />
    );

    expect(
      renderedComponent.find('.clients-detail').getElement()
    ).to.exist;
  });
});
