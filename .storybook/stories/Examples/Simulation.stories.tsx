import type { Meta, StoryObj } from '@storybook/react';
import { Simulation } from './Simulation';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Examples/Simulation',
  component: Simulation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    controls: {
      disable: true,
    }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  //     storyName: {

  //     }
  // visType: {

  // }
  // record: {

  // }
  // looped: {

  // }
  // controller: {

  // }
  // showTrails: {

  // }
  // showDebugInfo: {

  // }
  // maxFrameRate: {

  // }
  // maxTrailLength: {

  // }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {  },
} satisfies Meta<typeof Simulation>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TwoDim: Story = {
  args: {
    storyName: '2D',
  },
};

export const ThreeDim: Story = {
  args: {
    storyName: '3D',
    visType: '3D',
  },
};