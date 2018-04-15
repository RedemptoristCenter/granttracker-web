import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { GrantsLog } from 'src/features/grants/GrantsLog';

describe('grants/GrantsLog', () => {
  it('renders node with correct class name', () => {
    const props = {
      grants: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GrantsLog {...props} />
    );

    expect(
      renderedComponent.find('.grants-grants-log').getElement()
    ).to.exist;
  });
});
