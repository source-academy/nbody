import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from '../../Simulation';
import { fig8 } from '../../Universe';

const meta = {
  title: 'Visualize/Controller',
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

export const None: Story = {
  args: {
    storyName: 'None',
    universe: [fig8],
    controller: 'none'
  },
};

export const Ui: Story = {
  args: {
    storyName: 'Ui',
    universe: [fig8],
    controller: 'ui',
  },
};

export const Code: Story = {
  args: {
    storyName: 'Code',
    universe: [fig8],
    controller: 'code',
    callback: (sim) => {
      const id = setInterval(() => {
        sim.setShowUniverse(fig8.label, !sim.getShowUniverse(fig8.label));
      }, 500);

      return () => {
        clearInterval(id);
      }
    }
  },
};