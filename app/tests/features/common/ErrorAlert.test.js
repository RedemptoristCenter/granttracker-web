import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ErrorAlert } from 'src/features/common/ErrorAlert';

describe('common/ErrorAlert', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ErrorAlert {...props} />
    );

    expect(
      renderedComponent.find('.common-error-alert').getElement()
    ).to.exist;
  });
});
