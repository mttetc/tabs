import { useTabsContext } from '@/components/tabs/contexts/use-tabs-context';
import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export const TabsContentGroup = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabsContext();
    const isVertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        className={cn('relative', isVertical ? 'flex-1' : 'mt-2', className)}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContentGroup.displayName = 'TabsContentGroup';
