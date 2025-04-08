import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@/components/tabs/tabs';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      description: 'The visual style variant of the tabs',
      options: ['line', 'solid'],
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'line' },
      },
    },
    size: {
      description: 'The size of the tabs',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    orientation: {
      description: 'The orientation of the tabs',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    colorScheme: {
      description: 'The color scheme of the tabs',
      options: ['blue', 'green', 'red', 'yellow', 'purple', 'gray'],
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'purple' },
      },
    },
    unmountOnExit: {
      description: 'Whether to unmount inactive tab content from the DOM',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    defaultValue: {
      description: 'The initial value of the tabs when uncontrolled',
      control: 'text',
    },
    value: {
      description:
        'The controlled value of the tabs (when provided, makes the component controlled)',
      control: 'text',
    },
    onValueChange: {
      description: 'Callback when the value changes',
      action: 'value changed',
    },
  },
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Uncontrolled: Story = {
  args: {
    defaultValue: 'account',
    variant: 'line',
    size: 'md',
    orientation: 'horizontal',
    unmountOnExit: true,
    colorScheme: 'purple',
  },
  render: args => (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="disabled" disabled>
            Disabled
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value="account">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-sm text-gray-500 mt-2">
                Manage your account settings and preferences.
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="password">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium">Password Settings</h3>
              <p className="text-sm text-gray-500 mt-2">
                Change your password and security preferences.
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="settings">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium">General Settings</h3>
              <p className="text-sm text-gray-500 mt-2">Configure your application settings.</p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="disabled">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium">Disabled Tab</h3>
              <p className="text-sm text-gray-500 mt-2">
                This tab is disabled and cannot be selected.
              </p>
            </div>
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs>
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    variant: 'line',
    size: 'md',
    orientation: 'horizontal',
    unmountOnExit: true,
    colorScheme: 'green',
  },
  render: function ControlledStory(args) {
    const [value, setValue] = useState('account');

    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setValue('account')}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Set to Account
          </button>
          <button
            onClick={() => setValue('password')}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Set to Password
          </button>
          <button
            onClick={() => setValue('settings')}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Set to Settings
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Current value: <code className="px-1 py-0.5 bg-gray-100 rounded">{value}</code>
        </p>

        <Tabs {...args} value={value} onValueChange={setValue}>
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            <Tabs.Trigger value="disabled" disabled>
              Disabled
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="account">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Manage your account settings and preferences.
                </p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="password">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">Password Settings</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Change your password and security preferences.
                </p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="settings">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-gray-500 mt-2">Configure your application settings.</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="disabled">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">Disabled Tab</h3>
                <p className="text-sm text-gray-500 mt-2">
                  This tab is disabled and cannot be selected.
                </p>
              </div>
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      </div>
    );
  },
};
