import { useCallback, useRef } from 'react';

interface ItemInfo {
  id: string | number;
  disabled?: boolean;
  [key: string]: unknown;
}

export function useRegistry<T extends ItemInfo>() {
  const elementsRef = useRef<Map<string | number, HTMLElement | null>>(new Map());
  const itemsRef = useRef<Map<string | number, T>>(new Map());

  const registerElement = useCallback((id: string | number, element: HTMLElement | null) => {
    elementsRef.current.set(id, element);
  }, []);

  const unregisterElement = useCallback((id: string | number) => {
    elementsRef.current.delete(id);
  }, []);

  const getElement = useCallback((id: string | number) => {
    return elementsRef.current.get(id) || null;
  }, []);

  const registerItem = useCallback((item: T) => {
    itemsRef.current.set(item.id, item);
  }, []);

  const unregisterItem = useCallback((id: string | number) => {
    itemsRef.current.delete(id);
  }, []);

  const getEnabledItems = useCallback(() => {
    return Array.from(itemsRef.current.values()).filter(item => !item.disabled);
  }, []);

  const getItem = useCallback((id: string | number) => {
    return itemsRef.current.get(id);
  }, []);

  return {
    registerElement,
    unregisterElement,
    getElement,
    registerItem,
    unregisterItem,
    getEnabledItems,
    getItem,
  };
} 