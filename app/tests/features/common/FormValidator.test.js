import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FormValidator } from 'src/features/common/FormValidator';

describe('common/FormValidator', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FormValidator {...props} />
    );

    expect(
      renderedComponent.find('.common-form-validator').getElement()
    ).to.exist;
  });
});
