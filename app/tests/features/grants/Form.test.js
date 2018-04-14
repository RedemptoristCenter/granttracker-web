import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Form } from 'src/features/grants/Form';

describe('grants/Form', () => {
  it('renders node with correct class name', () => {
    const props = {
      grants: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Form {...props} />
    );

    expect(
      renderedComponent.find('.grants-form').getElement()
    ).to.exist;
  });
});
