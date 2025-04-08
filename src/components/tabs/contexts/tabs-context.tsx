import { createContext } from 'react';

export type TabsVariant = 'line' | 'solid';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsColorScheme = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
export type TabValue = string;

export interface TabInfo {
  id: TabValue;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface TabsContextValue {
  selectedValue: TabValue | undefined;
  setSelectedValue: (value: TabValue) => void;
  variant: TabsVariant;
  unmountOnExit: boolean;
  size: TabsSize;
  orientation: TabsOrientation;
  colorScheme: TabsColorScheme;
  isLoading: boolean;
  isRTL: boolean;
  registerTabElement: (value: TabValue, element: HTMLElement | null) => void;
  unregisterTabElement: (value: TabValue) => void;
  getTabElement: (value: TabValue) => HTMLElement | null;
  registerTabInfo: (tabInfo: TabInfo) => void;
  unregisterTabInfo: (id: TabValue) => void;
  getEnabledTabs: () => TabInfo[];
}

export const TabsContext = createContext<TabsContextValue | null>(null);
