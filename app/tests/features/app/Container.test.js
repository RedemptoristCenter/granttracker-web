import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Container } from 'src/features/app';

describe('app/Container', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Container />
    );

    expect(
      renderedComponent.find('.app-container').getElement()
    ).to.exist;
  });
});
