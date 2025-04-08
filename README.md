# Custom Tabs Component

A flexible and accessible tabs component for React applications, built with TypeScript and Tailwind CSS. This component supports multiple variants, orientations, and RTL layouts while maintaining ARIA compliance.

## Features

- 🎨 Multiple variants (line, solid)
- 📱 Responsive design
- 🔄 RTL support
- ⌨️ Keyboard navigation
- ♿ ARIA-compliant
- 🎯 TypeScript support
- 🎨 Customizable color schemes

## Getting Started

To see the component in action, run:

```bash
yarn storybook
```

This will launch Storybook where you can interact with the Tabs component, explore its variants, and see code examples.

## Usage

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/tabs';

function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs>
  );
}
```

## Props

### Tabs
- `defaultValue`: Initial selected tab value
- `value`: Controlled value
- `onValueChange`: Callback when value changes
- `orientation`: 'horizontal' | 'vertical'
- `variant`: 'line' | 'solid'
- `colorScheme`: Color scheme for the tabs
- `dir`: 'ltr' | 'rtl'

### List
- `aria-label`: Accessibility label for the tabs list
- All div props are supported

### Trigger
- `value`: Unique identifier for the tab
- `disabled`: Whether the tab is disabled

### ContentGroup
- Container for tab content panels
- Provides proper layout and styling for content panels
- Handles transitions between panels
- All div props are supported

### Content
- `value`: Corresponding tab value
- All div props are supported

## Accessibility

- Follows WAI-ARIA Tabs Pattern
- Keyboard navigation support:
  - Left/Right arrows: Navigate between tabs (horizontal)
  - Up/Down arrows: Navigate between tabs (vertical)
  - Home: Jump to first tab
  - End: Jump to last tab

## Styling

The component uses Tailwind CSS for styling and supports custom color schemes through the `tabsListColorSchemes` configuration. The solid variant includes padding for better visual appearance.

## License

MIT