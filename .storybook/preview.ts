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
        order: ['Getting started', ['nbody', 'Installation', 'Integration'], 'Usage', 'Examples'],
      },
    }
  },
};

export default preview;
