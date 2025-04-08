import {
  isValidElement,
  cloneElement,
  forwardRef,
  PropsWithChildren,
  ComponentPropsWithoutRef,
  useRef,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';
import { useTabsContext } from '@/components/tabs/contexts/use-tabs-context';
import { tabsTriggerColorSchemes } from '@/components/tabs/constants';
import { TabValue } from '@/components/tabs/contexts/tabs-context';
import { getStatusText } from '@/components/tabs/utils/get-status-text';
import { getTabStyles } from '@/components/tabs/utils/get-tab-styles';
import { LineIndicator } from '@/components/tabs/components/line-indicator';

interface TabsTriggerBaseProps {
  value: TabValue;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, PropsWithChildren<TabsTriggerBaseProps>>(
  (props, forwardedRef) => {
    const {
      selectedValue,
      setSelectedValue,
      size,
      registerTabElement,
      unregisterTabElement,
      registerTabInfo,
      unregisterTabInfo,
      variant,
      orientation,
      colorScheme,
      isLoading,
    } = useTabsContext();

    const { value, className: propClassName, disabled = false, children, asChild = false } = props;

    const internalRef = useRef<HTMLButtonElement>(null);
    const ref = forwardedRef || internalRef;

    useEffect(() => {
      const element = ref && 'current' in ref ? ref.current : null;
      registerTabElement(value, element);
      return () => unregisterTabElement(value);
    }, [value, registerTabElement, unregisterTabElement, ref]);

    useEffect(() => {
      const isDisabled = disabled || !!isLoading;
      registerTabInfo({ id: value, disabled: isDisabled });
      return () => unregisterTabInfo(value);
    }, [value, disabled, isLoading, registerTabInfo, unregisterTabInfo]);

    if (!value) {
      console.warn('TabsTrigger: value prop is required');
      return null;
    }

    const isSelected = selectedValue === value;
    const variantStyles = tabsTriggerColorSchemes[colorScheme][variant];

    const handleClick = () => {
      if (disabled || isLoading) return;
      setSelectedValue(value);
    };

    const descriptionId = `tab-description-${value}`;
    const statusText = getStatusText({ isSelected, disabled, isLoading: !!isLoading, children });

    const buttonClassName = getTabStyles({
      isSelected,
      isLoading: !!isLoading,
      variant,
      orientation,
      size,
      colorScheme,
      className: propClassName,
      variantStyles,
    });

    const sharedProps = {
      role: 'tab',
      'aria-selected': isSelected,
      'aria-disabled': disabled || isLoading,
      'aria-controls': `panel-${value}`,
      'aria-describedby': descriptionId,
      id: `tab-${value}`,
      onClick: handleClick,
      disabled: disabled || isLoading,
      tabIndex: disabled || isLoading ? -1 : 0,
      className: buttonClassName,
    } satisfies ComponentPropsWithoutRef<'button'>;

    const content = (
      <>
        {children}
        <span id={descriptionId} className="sr-only">
          {statusText}
        </span>
        {isSelected && variant === "line" && <LineIndicator />}
      </>
    );

    if (asChild && isValidElement(children)) {
      const childProps = {
        ...sharedProps,
        ref,
        ...children.props,
        className: cn(sharedProps.className, children.props.className),
        onClick: (e: React.MouseEvent) => {
          handleClick();
          children.props.onClick?.(e);
        },
      };

      return cloneElement(children, childProps, content);
    }

    return (
      <button ref={ref} {...sharedProps}>
        {content}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';
