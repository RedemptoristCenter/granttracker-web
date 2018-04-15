import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Detail } from 'src/features/reports/Detail';

describe('reports/Detail', () => {
  it('renders node with correct class name', () => {
    const props = {
      reports: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Detail {...props} />
    );

    expect(
      renderedComponent.find('.reports-detail').getElement()
    ).to.exist;
  });
});
