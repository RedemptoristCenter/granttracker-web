import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LogOutButton } from 'src/features/app/LogOutButton';

describe('app/LogOutButton', () => {
  it('renders node with correct class name', () => {
    const props = {
      app: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LogOutButton {...props} />
    );

    expect(
      renderedComponent.find('.app-log-out-button').getElement()
    ).to.exist;
  });
});
