import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TabDemographics } from 'src/features/clients/TabDemographics';

describe('clients/TabDemographics', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TabDemographics {...props} />
    );

    expect(
      renderedComponent.find('.clients-tab-demographics').getElement()
    ).to.exist;
  });
});
