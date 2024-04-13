import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    }, options: {
      storySort: {
        order: ['nbody', 'Installation', 'Quick Start', 'Integration', 'Contribute', 'Define', ['Intro', 'Force', 'Simulate Function', 'Transformation'], 'Visualize', ['Intro', 'Dimension', 'Multiverse', 'Record', 'Controller', 'Trails', 'Debug Info'], 'Showcase', ['Intro', 'Analemma', ['Intro', 'Sun-Earth', 'Sun-Mars'],'Horseshoe Orbit', ['Intro', '2010 SO16', '54509 YORP'], 'Solar System', ['Simulate', 'Recorded']]],
      },
    }
  },
};

export default preview;
