import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ClientSearchModal } from 'src/features/modals/ClientSearchModal';

describe('modals/ClientSearchModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      modals: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ClientSearchModal {...props} />
    );

    expect(
      renderedComponent.find('.modals-client-search-modal').getElement()
    ).to.exist;
  });
});
