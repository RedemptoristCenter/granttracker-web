import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/grants/DefaultPage';

describe('grants/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      grants: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.grants-default-page').getElement()
    ).to.exist;
  });
});
