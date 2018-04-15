import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Create } from 'src/features/client-pdf/Create';

describe('client-pdf/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientPdf: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.client-pdf-create').getElement()
    ).to.exist;
  });
});
