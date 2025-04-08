import { tabsListColorSchemes } from '@/components/tabs/constants';
import { TabInfo, TabsColorScheme, TabsVariant } from '@/components/tabs/contexts/tabs-context';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';
import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { useTabsContext } from '../contexts/use-tabs-context';

export const TabsList = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  ({ className, children, 'aria-label': ariaLabel = 'Tabs', ...props }, ref) => {
    const context = useTabsContext();

    const {
      orientation,
      variant,
      colorScheme,
      selectedValue,
      setSelectedValue,
      isRTL,
      getEnabledTabs,
      getTabElement,
    } = context;

    const isVertical = orientation === 'vertical';
    const enabledTabs = getEnabledTabs();

    const handleKeyDown = useKeyboardNavigation<TabInfo>({
      items: enabledTabs,
      selectedValue: enabledTabs.find(tab => tab.id === selectedValue),
      setSelectedValue: (tab: TabInfo) => setSelectedValue(tab.id),
      isRTL,
      isVertical,
      getItemElement: (tab: TabInfo) => getTabElement(tab.id),
      getItemId: (tab: TabInfo) => tab.id,
    });

    const colorStyle = tabsListColorSchemes[colorScheme as TabsColorScheme][variant as TabsVariant];

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        data-variant={variant}
        data-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex relative scrollbar-none',
          isVertical
            ? ['flex-col', 'gap-2', 'overflow-y-auto']
            : ['flex-row', 'gap-6', 'overflow-x-auto'],
          isRTL && !isVertical && 'flex-row-reverse',
          variant === 'solid' && 'p-1',
          colorStyle,
          className
        )}
        {...props}
      >
        {children}

      </div>
    );
  }
);

TabsList.displayName = 'TabsList';
