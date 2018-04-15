import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Consent } from 'src/features/client-pdf/Consent';

describe('client-pdf/Consent', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientPdf: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Consent {...props} />
    );

    expect(
      renderedComponent.find('.client-pdf-consent').getElement()
    ).to.exist;
  });
});
