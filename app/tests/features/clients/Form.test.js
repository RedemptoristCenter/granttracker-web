import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Form } from 'src/features/clients/Form';

describe('clients/Form', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Form {...props} />
    );

    expect(
      renderedComponent.find('.clients-form').getElement()
    ).to.exist;
  });
});
