import { LineIndicator } from '@/components/tabs/components/line-indicator';
import {
  type TabsColorScheme,
  type TabsOrientation,
  type TabsSize,
  type TabsVariant,
} from '@/components/tabs/contexts/tabs-context';
import { TabsProvider } from '@/components/tabs/contexts/tabs-provider';
import { TabsContent } from '@/components/tabs/partials/tabs-content';
import { TabsContentGroup } from '@/components/tabs/partials/tabs-content-group';
import { TabsList } from '@/components/tabs/partials/tabs-list';
import { TabsTrigger } from '@/components/tabs/partials/tabs-trigger';
import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export interface TabsProps
  extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'value' | 'onChange'> {
  /** The initial value of the tabs when uncontrolled */
  defaultValue?: string;
  /** The controlled value of the tabs */
  value?: string;
  /** Callback when the value changes */
  onValueChange?: (value: string) => void;
  /** The visual style variant of the tabs */
  variant?: TabsVariant;
  /** Whether to unmount inactive tab content from the DOM */
  unmountOnExit?: boolean;
  /** The size of the tabs */
  size?: TabsSize;
  /** The orientation of the tabs */
  orientation?: TabsOrientation;
  /** The color scheme of the tabs */
  colorScheme?: TabsColorScheme;
  /** Whether the tabs are loading */
  isLoading?: boolean;
}

const TabsComponent = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue,
      value,
      onValueChange,
      variant = 'line',
      unmountOnExit = true,
      size = 'md',
      orientation = 'horizontal',
      colorScheme = 'purple',
      isLoading = false,
      className,
      ...props
    },
    ref
  ) => {
    const isVerticalOrientation = orientation === 'vertical';

    return (
      <TabsProvider
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        variant={variant}
        unmountOnExit={unmountOnExit}
        size={size}
        orientation={orientation}
        colorScheme={colorScheme}
        isLoading={isLoading}
      >
        <div
          ref={ref}
          className={cn(
            'w-full flex gap-4',
            isVerticalOrientation ? 'flex-row' : 'flex-col',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsProvider>
    );
  }
);

TabsComponent.displayName = 'Tabs';

type TabsComponentType = typeof TabsComponent & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
  ContentGroup: typeof TabsContentGroup;
  LineIndicator: typeof LineIndicator;
};

/**
 * Tabs - A flexible and accessible tabs implementation
 * 
 * The component is designed with a modular architecture:
 * - TabsProvider: Manages state and provides context
 * - TabsList: Container for tab triggers with keyboard navigation
 * - TabsTrigger: Interactive tab buttons
 * - TabsContent: Content panels associated with tabs
 * - TabsContentGroup: Container for content panels
 * 
 * @example
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.ContentGroup>
 *     <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *     <Tabs.Content value="tab2">Content 2</Tabs.Content>
 *   </Tabs.ContentGroup>
 * </Tabs>
 */
const Tabs = TabsComponent as TabsComponentType;

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
Tabs.ContentGroup = TabsContentGroup;
Tabs.LineIndicator = LineIndicator;

export { Tabs };
