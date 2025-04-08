import { forwardRef } from 'react';
import { useTabsContext } from '@/components/tabs/contexts/use-tabs-context';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { lineIndicatorColorSchemes } from '@/components/tabs/constants';

type LineIndicatorProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  className?: string;
};

export const LineIndicator = forwardRef<HTMLDivElement, LineIndicatorProps>(
  ({ className, ...props }, forwardedRef) => {
    const { colorScheme, orientation } = useTabsContext();
    const isHorizontal = orientation === 'horizontal';

    const bgColorClass = lineIndicatorColorSchemes[colorScheme] ?? lineIndicatorColorSchemes.blue;

    return (
      <motion.div
        ref={forwardedRef}
        layoutId="tab-indicator"
        initial={false}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
        className={cn(
          'absolute bottom-0 h-0.5',
          'rounded-full',
          isHorizontal ? 'w-full' : 'h-full',
          bgColorClass,
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

LineIndicator.displayName = 'LineIndicator';
