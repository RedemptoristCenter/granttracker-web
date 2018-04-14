import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Table } from 'src/features/clients/Table';

describe('clients/Table', () => {
  it('renders node with correct class name', () => {
    const props = {
      clients: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Table {...props} />
    );

    expect(
      renderedComponent.find('.clients-table').getElement()
    ).to.exist;
  });
});
