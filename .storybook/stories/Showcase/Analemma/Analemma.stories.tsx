import type { Meta, StoryObj } from "@storybook/react";
import { Simulation } from "../../Simulation";
import { fig8 } from "../../Universe";
import { sunEarth } from "./Analemma";

const meta = {
  title: "Showcase/Analemma",
  component: Simulation,
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  tags: [],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Simulation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SunEarthAnalemma: Story = {
  args: {
    storyName: "SunEarthAnalemma",
    universe: [sunEarth],
    controller: 'ui',
    showTrails: true,
    speed: 5000000,
    visType: '3D',
    width: 800,
    maxTrailLength: 300,
    showDebugInfo: true,
  },
};
