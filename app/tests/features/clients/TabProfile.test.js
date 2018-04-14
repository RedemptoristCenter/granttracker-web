import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TabProfile } from 'src/features/clients/TabProfile';

describe('clients/TabProfile', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TabProfile {...props} />
    );

    expect(
      renderedComponent.find('.clients-tab-profile').getElement()
    ).to.exist;
  });
});
