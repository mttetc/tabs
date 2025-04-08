import { useContext } from 'react';
import { TabsContext } from '@/components/tabs/contexts/tabs-context';

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};
