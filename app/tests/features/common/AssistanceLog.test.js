import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AssistanceLog } from 'src/features/common';

describe('common/AssistanceLog', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <AssistanceLog />
    );

    expect(
      renderedComponent.find('.common-assistance-log').getElement()
    ).to.exist;
  });
});
