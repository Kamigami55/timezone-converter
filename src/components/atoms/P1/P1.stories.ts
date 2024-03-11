import type { Meta, StoryObj } from '@storybook/react';

import { P1 } from './P1';

const meta = {
  component: P1,
  tags: ['autodocs'],
} satisfies Meta<typeof P1>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================

export const Default: Story = {
  args: {
    children: 'P1: Hello World',
  },
};
