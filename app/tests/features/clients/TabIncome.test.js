import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TabIncome } from 'src/features/clients/TabIncome';

describe('clients/TabIncome', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TabIncome {...props} />
    );

    expect(
      renderedComponent.find('.clients-tab-income').getElement()
    ).to.exist;
  });
});
