import type { Meta, StoryObj } from '@storybook/react';

import { H1 } from './H1';

const meta = {
  component: H1,
  tags: ['autodocs'],
} satisfies Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================

export const Default: Story = {
  args: {
    children: 'H1: Hello World',
  },
};
