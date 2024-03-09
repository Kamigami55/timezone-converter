---
to: src/components/<%= type %>/<%= name %>/<%= name %>.stories.ts
---
import type { Meta, StoryObj } from '@storybook/react';

import { <%= name %> } from './<%= name %>';

const meta = {
  component: <%= name %>,
  tags: ['autodocs'],
} satisfies Meta<typeof <%= name %>>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================

export const Default: Story = {
  args: {},
};
