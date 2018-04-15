import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/modals/DefaultPage';

describe('modals/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      modals: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.modals-default-page').getElement()
    ).to.exist;
  });
});
