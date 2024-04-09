import type { Meta, StoryObj } from "@storybook/react";
// import { fig8 } from "../../Universe";
import { Analemma, sunMars, sunEarth } from "./Analemma";

const meta = {
  title: "Showcase/Analemma",
  component: Analemma,
  parameters: {
    layout: "centered",
  },
  tags: [],
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    obj: {
      table: {
        disable: true,
      },
    },
  },
  args: {},
} satisfies Meta<typeof Analemma>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SunEarthAnalemma: Story = {
  args: {
    name: "SunEarthAnalemma",
    obj: sunEarth,
    axialTilt: sunEarth.actualAxialTilt,
  },
};

export const SunMarsAnalemma: Story = {
  args: {
    name: "SunMarsAnalemma",
    obj: sunMars,
    axialTilt: sunMars.actualAxialTilt,
  },
};
