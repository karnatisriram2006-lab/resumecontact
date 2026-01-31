"use client";

import { useState, useEffect } from 'react';
import { useWatch, Control, FieldValues } from 'react-hook-form';

/**
 * A custom hook that debounces the values returned by `react-hook-form`'s `useWatch`.
 * This is useful for performance optimization, especially for live previews of large forms,
 * as it prevents re-renders on every keystroke.
 *
 * @param control The `control` object from `useForm`.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced form values.
 */
export function useDebouncedFormWatch<TFieldValues extends FieldValues>(
  control: Control<TFieldValues>,
  delay: number
): TFieldValues {
  // Watch the entire form for changes.
  const watchedValue = useWatch({ control }) as TFieldValues;
  
  // State to hold the debounced value.
  const [debouncedValue, setDebouncedValue] = useState<TFieldValues>(watchedValue);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay.
    const handler = setTimeout(() => {
      setDebouncedValue(watchedValue);
    }, delay);

    // Clean up the timer if the watched value changes before the delay has passed,
    // or if the component unmounts.
    return () => {
      clearTimeout(handler);
    };
  }, [JSON.stringify(watchedValue), delay]); // Effect depends on the stringified value to avoid deep object comparison issues.

  return debouncedValue;
}
