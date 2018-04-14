import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TabHousehold } from 'src/features/clients/TabHousehold';

describe('clients/TabHousehold', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TabHousehold {...props} />
    );

    expect(
      renderedComponent.find('.clients-tab-household').getElement()
    ).to.exist;
  });
});
