import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Table } from 'src/features/grants/Table';

describe('grants/Table', () => {
  it('renders node with correct class name', () => {
    const props = {
      grants: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Table {...props} />
    );

    expect(
      renderedComponent.find('.grants-table').getElement()
    ).to.exist;
  });
});
