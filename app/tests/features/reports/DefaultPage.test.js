import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/reports/DefaultPage';

describe('reports/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      reports: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.reports-default-page').getElement()
    ).to.exist;
  });
});
