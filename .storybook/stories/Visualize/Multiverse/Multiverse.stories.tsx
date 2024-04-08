import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from '../../Simulation';
import { fig8, multiFig8 } from '../../Universe';

const meta = {
  title: 'Visualize/Multiverse',
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

export const SingleUniverse: Story = {
  args: {
    storyName: 'SingleUniverse',
    universe: [fig8],
  },
};

export const Multiverse: Story = {
  args: {
    storyName: 'Multiverse',
    universe: multiFig8,
    // showTrails: true,
  },
};

export const Multiverse3D: Story = {
  args: {
    storyName: 'Multiverse3D',
    universe: multiFig8,
    visType: '3D',
    showTrails: true,
    showDebugInfo: true,
  },
};