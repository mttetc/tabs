import { ReactNode, useMemo } from 'react';
import {
  TabsContext,
  TabsVariant,
  TabsSize,
  TabsOrientation,
  TabsColorScheme,
  TabValue,
  TabInfo,
} from '@/components/tabs/contexts/tabs-context';
import { useRegistry } from '@/hooks/use-registry';
import { useControlledState } from '@/hooks/use-controlled-state';

interface TabsProviderProps {
  children: ReactNode;
  defaultValue?: TabValue;
  value?: TabValue;
  onValueChange?: (value: TabValue) => void;
  variant: TabsVariant;
  unmountOnExit: boolean;
  size: TabsSize;
  orientation: TabsOrientation;
  colorScheme: TabsColorScheme;
  isLoading?: boolean;
}

export function TabsProvider({
  children,
  defaultValue,
  value,
  onValueChange,
  variant,
  unmountOnExit,
  size,
  orientation,
  colorScheme,
  isLoading,
}: TabsProviderProps) {
  const { value: selectedValue, setValue: setSelectedValue } = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const {
    registerElement: registerTabElement,
    unregisterElement: unregisterTabElement,
    getElement: getTabElement,
    registerItem: registerTabInfo,
    unregisterItem: unregisterTabInfo,
    getEnabledItems: getEnabledTabs,
  } = useRegistry<TabInfo>();

  const isRTL = document.dir === 'rtl';

  const contextValue = useMemo(
    () => ({
      selectedValue,
      setSelectedValue,
      variant,
      unmountOnExit,
      size,
      orientation,
      colorScheme,
      isLoading: !!isLoading,
      isRTL,
      registerTabElement,
      unregisterTabElement,
      getTabElement,
      registerTabInfo,
      unregisterTabInfo,
      getEnabledTabs,
    }),
    [
      selectedValue,
      setSelectedValue,
      variant,
      unmountOnExit,
      size,
      orientation,
      colorScheme,
      isLoading,
      isRTL,
      registerTabElement,
      unregisterTabElement,
      getTabElement,
      registerTabInfo,
      unregisterTabInfo,
      getEnabledTabs,
    ]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      {children}
    </TabsContext.Provider>
  );
}
