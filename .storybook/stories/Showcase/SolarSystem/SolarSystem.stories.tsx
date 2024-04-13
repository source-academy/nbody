import type { Meta, StoryObj } from "@storybook/react";
import { SolarSystem, solarRecorded, solarSimulate } from "./SolarSystem";

const meta = {
  title: "Showcase/Solar System",
  component: SolarSystem,
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  tags: [],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SolarSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simulate: Story = {
  args: {
    name: "Solar System",
    obj: solarSimulate
  },
};

export const Recorded: Story = {
  args: {
    name: "Solar System",
    obj: solarRecorded
  },
};
