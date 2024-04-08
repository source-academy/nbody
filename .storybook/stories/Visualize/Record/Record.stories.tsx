import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from '../../Simulation';
import { fig8, multiFig8 } from '../../Universe';

const meta = {
  title: 'Visualize/Record',
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

export const RealTime: Story = {
  args: {
    storyName: 'RealTime',
    universe: [fig8],
    visType: '3D',
  },
};

export const Recorded: Story = {
  args: {
    storyName: 'Recorded',
    universe: [fig8],
    visType: '3D',
    record: true,
    looped: false,
  },
};

export const RecordedLooped: Story = {
  args: {
    storyName: 'RecordedLooped',
    universe: [fig8],
    visType: '3D',
    record: true,
    looped: true,
  },
};