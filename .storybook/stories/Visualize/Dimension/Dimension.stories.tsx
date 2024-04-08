import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from '../../Simulation';
import { fig8 } from '../../Universe';

const meta = {
  title: 'Visualize/Dimension',
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

export const TwoD: Story = {
  args: {
    storyName: 'TwoD',
    universe: [fig8],
  },
};

export const ThreeD: Story = {
  args: {
    storyName: 'ThreeD',
    universe: [fig8],
    visType: '3D',
  },
};