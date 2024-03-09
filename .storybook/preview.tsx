import React from 'react';

import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';

import { useDarkMode } from 'storybook-dark-mode';

import { ThemeProvider } from '../src/components/ThemeProvider';

function ThemeWrapper(props) {
  return (
    <ThemeProvider forcedTheme={useDarkMode() ? 'dark' : 'light'}>
      {props.children}
    </ThemeProvider>
  );
}

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
      <ThemeWrapper>
        <main className={inter.className}>
          <Story />
        </main>
      </ThemeWrapper>
    ),
  ],
};

export default preview;
