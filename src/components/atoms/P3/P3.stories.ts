import type { Meta, StoryObj } from '@storybook/react';

import { P3 } from './P3';

const meta = {
  component: P3,
  tags: ['autodocs'],
} satisfies Meta<typeof P3>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================

export const Default: Story = {
  args: {
    children: 'P3: Hello World',
  },
};
