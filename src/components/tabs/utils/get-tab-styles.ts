import { cn } from '@/lib/utils';
import { TabsColorScheme, TabsSize, TabsVariant } from '@/components/tabs/contexts/tabs-context';

interface GetTabStylesProps {
  isSelected: boolean;
  isLoading: boolean;
  variant: TabsVariant;
  orientation: 'horizontal' | 'vertical';
  colorScheme: TabsColorScheme;
  size: TabsSize;
  className?: string;
  variantStyles: {
    selected: string;
    default: string;
    hover?: string;
  };
}

export function getTabStyles({
  isSelected,
  isLoading,
  variant,
  orientation,
  size,
  className,
  variantStyles,
}: GetTabStylesProps) {
  const isVertical = orientation === 'vertical';
  const colorStyle = isSelected ? variantStyles.selected : variantStyles.default;
  const hoverStyle = !isSelected ? variantStyles.hover : undefined;
  const applyPadding = variant === 'solid' || (variant === 'line' && isVertical);

  return cn(
    'relative rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    applyPadding && 'px-4',
    size === 'sm' && `h-7 text-xs ${applyPadding ? 'px-2' : ''}`,
    size === 'md' && `h-9 text-sm ${applyPadding ? 'px-4' : ''}`,
    size === 'lg' && `h-11 text-base ${applyPadding ? 'px-6' : ''}`,
    isLoading && 'cursor-wait opacity-50',
    colorStyle,
    hoverStyle,
    className
  );
}
