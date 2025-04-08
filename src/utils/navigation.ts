export function getNextIndex(
  currentIndex: number,
  listLength: number,
  isReverse = false
): number {
  if (isReverse) {
    return (currentIndex - 1 + listLength) % listLength;
  }
  return (currentIndex + 1) % listLength;
}

interface GetDirectionalIndexParams {
  currentIndex: number;
  tabsLength: number;
  isRTL: boolean;
  isVertical: boolean;
  direction: 'next' | 'previous';
}

export function getDirectionalIndex(params: GetDirectionalIndexParams): number {
  const { currentIndex, tabsLength, isRTL, isVertical, direction } = params;

  // RTL only affects horizontal navigation
  const shouldReverseDirection = isRTL && !isVertical;
  const isMovingForward = direction === 'next';

  // In RTL mode, reverse the direction for horizontal navigation
  const effectiveDirection = shouldReverseDirection ? !isMovingForward : isMovingForward;

  return getNextIndex(currentIndex, tabsLength, !effectiveDirection);
} 