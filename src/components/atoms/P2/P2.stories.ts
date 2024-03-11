import type { Meta, StoryObj } from '@storybook/react';

import { P2 } from './P2';

const meta = {
  component: P2,
  tags: ['autodocs'],
} satisfies Meta<typeof P2>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================

export const Default: Story = {
  args: {
    children: 'P2: Hello World',
  },
};
