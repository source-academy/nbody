import type { Meta, StoryObj } from "@storybook/react";
import { Simulation } from "../../Simulation";
import { fig8 } from "../../Universe";

const meta = {
  title: "Showcase/Solar System",
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

export const SolarSystem: Story = {
  args: {
    storyName: "3D",
    universe: [fig8],
  },
};
