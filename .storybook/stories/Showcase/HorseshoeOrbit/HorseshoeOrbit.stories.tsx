import type { Meta, StoryObj } from "@storybook/react";
import { Simulation } from "../../Simulation";
import { horseshoe } from "./HorseshoeOrbit";

const meta = {
  title: "Showcase/Horseshoe Orbit",
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

export const YORP: Story = {
  args: {
    storyName: "Horseshoe Orbit YORP",
    universe: [horseshoe.yorp],
    showDebugInfo: true,
    controller: 'ui',
    visType: '3D',
    width: 800,
    speed: 10000000,
    showTrails: true,
  },
};
