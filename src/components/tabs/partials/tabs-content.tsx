import { TabValue } from '@/components/tabs/contexts/tabs-context';
import { useTabsContext } from '@/components/tabs/contexts/use-tabs-context';
import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface TabsContentProps extends ComponentPropsWithRef<'div'> {
  value: TabValue;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value, className, ...props }, ref) => {
    const { selectedValue, unmountOnExit, isRTL } = useTabsContext();

    if (!value) {
      console.warn('TabsContent: value prop is required');
      return null;
    }

    const isSelected = selectedValue === value;

    if (!isSelected && unmountOnExit) return null;

    const descriptionId = `panel-description-${value}`;
    const statusText = isSelected
      ? 'This tab panel is currently visible'
      : 'This tab panel is currently hidden';

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        aria-describedby={descriptionId}
        aria-hidden={!isSelected}
        tabIndex={0}
        className={cn(
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'transform transition-all duration-200 ease-in-out w-full',
          !unmountOnExit && 'absolute inset-0',
          isSelected
            ? 'opacity-100 translate-x-0 relative z-10'
            : `opacity-0 ${isRTL ? 'translate-x-2' : '-translate-x-2'} pointer-events-none ${!unmountOnExit ? 'absolute' : ''}`,
          className
        )}
        {...props}
      >
        {children}
        <span id={descriptionId} className="sr-only">
          {statusText}
        </span>
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
