import type { Meta, StoryObj } from "@storybook/react";
import { HorseshoeOrbit, yorp, so16 } from "./HorseshoeOrbit";

const meta = {
  title: "Showcase/Horseshoe Orbit",
  component: HorseshoeOrbit,
  parameters: {
    layout: "centered",
  },
  tags: [],
  argTypes: {
    obj: {
      table: {
        disable: true,
      }
    },
        name: {
      table: {
        disable: true,
      }
    },
  },
  args: {},
} satisfies Meta<typeof HorseshoeOrbit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const YORP: Story = {
  args: {
    name: "Horseshoe Orbit YORP",
    frameOfRef: "sun-earth",
    obj: yorp
  },
};

export const SO16: Story = {
  args: {
    name: "Horseshoe Orbit SO16",
    frameOfRef: "sun-earth",
    obj: so16,
  },
};