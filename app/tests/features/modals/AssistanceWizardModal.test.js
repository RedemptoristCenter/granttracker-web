import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AssistanceWizardModal } from 'src/features/modals/AssistanceWizardModal';

describe('modals/AssistanceWizardModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      modals: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AssistanceWizardModal {...props} />
    );

    expect(
      renderedComponent.find('.modals-assistance-wizard-modal').getElement()
    ).to.exist;
  });
});
