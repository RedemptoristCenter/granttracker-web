import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/client-pdf/DefaultPage';

describe('client-pdf/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientPdf: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.client-pdf-default-page').getElement()
    ).to.exist;
  });
});
