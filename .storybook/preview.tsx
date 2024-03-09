import React from 'react';

import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className={inter.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
