import { useCallback, useEffect, useState } from 'react';

interface UseControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControlledState<T>({
  value,
  defaultValue,
  onChange,
}: UseControlledStateProps<T>) {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;

  // Update internal value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return {
    value: isControlled ? value : internalValue,
    setValue,
  };
} 