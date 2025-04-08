import { getDirectionalIndex } from '@/utils/navigation';

interface UseKeyboardNavigationProps<T> {
  items: T[];
  selectedValue: T | undefined;
  setSelectedValue: (value: T) => void;
  isRTL: boolean;
  isVertical: boolean;
  getItemElement: (value: T) => HTMLElement | null;
  getItemId: (value: T) => string | number;
}

export function useKeyboardNavigation<T>({
  items,
  selectedValue,
  setSelectedValue,
  isRTL,
  isVertical,
  getItemElement,
  getItemId,
}: UseKeyboardNavigationProps<T>) {
  return (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (items.length === 0) return;

    const currentIndex = items.findIndex(item => getItemId(item) === getItemId(selectedValue as T));
    const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = getDirectionalIndex({
          currentIndex: safeCurrentIndex,
          tabsLength: items.length,
          isRTL,
          isVertical,
          direction: 'next',
        });

        setSelectedValue(items[nextIndex]);

        const itemElement = getItemElement(items[nextIndex]);
        itemElement?.focus();

        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault();
        const previousIndex = getDirectionalIndex({
          currentIndex: safeCurrentIndex,
          tabsLength: items.length,
          isRTL,
          isVertical,
          direction: 'previous',
        });

        setSelectedValue(items[previousIndex]);

        const itemElement = getItemElement(items[previousIndex]);
        itemElement?.focus();

        break;
      }
      case 'Home': {
        e.preventDefault();

        setSelectedValue(items[0]);

        const itemElement = getItemElement(items[0]);
        itemElement?.focus();

        break;
      }
      case 'End': {
        e.preventDefault();

        const lastIndex = items.length - 1;
        setSelectedValue(items[lastIndex]);

        const itemElement = getItemElement(items[lastIndex]);
        itemElement?.focus();

        break;
      }
      default:
        break;
    }
  };
} 