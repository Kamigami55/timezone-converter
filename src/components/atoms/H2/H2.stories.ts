import type { Meta, StoryObj } from '@storybook/react';

import { H2 } from './H2';

const meta = {
  component: H2,
  tags: ['autodocs'],
} satisfies Meta<typeof H2>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================

export const Default: Story = {
  args: {
    children: 'H2: Hello World',
  },
};
