import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from '../../Simulation';
import { fig8 } from '../../Universe';

const meta = {
  title: 'Visualize/Trails',
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

export const ShowTrailsOff: Story = {
  args: {
    storyName: 'ShowTrailsOff',
    universe: [fig8],
    visType: '3D',
  },
};

export const ShowTrailsOn: Story = {
  args: {
    storyName: 'ShowTrailsOn',
    universe: [fig8],
    visType: '3D',
    showTrails: true,
  },
};