import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from '../../Simulation';
import { fig8 } from '../../Universe';

const meta = {
  title: 'Visualize/Debug Info',
  component: Simulation,
  parameters: {
    layout: 'centered',
    controls: {
      disable: true,
    }
  },
  tags: [],
  argTypes: {
  },
  args: {  },
} satisfies Meta<typeof Simulation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DebugInfoOn: Story = {
  args: {
    storyName: 'DebugInfoOn',
    universe: [fig8],
    showDebugInfo: true,
  },
};

export const DebugInfoOff: Story = {
  args: {
    storyName: 'DebugInfoOff',
    universe: [fig8],
    showDebugInfo: false,
  },
};

export const Ui: Story = {
  args: {
    storyName: 'Ui',
    universe: [fig8],
    controller: 'ui'
  },
};