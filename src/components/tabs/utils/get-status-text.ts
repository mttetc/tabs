interface GetStatusTextProps {
  isSelected: boolean;
  disabled: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export function getStatusText({ isSelected, disabled, isLoading, children }: GetStatusTextProps) {
  if (isSelected) {
    return 'Current selected tab';
  }

  if (disabled) {
    return 'This tab is disabled';
  }

  if (isLoading) {
    return 'Loading...';
  }

  const tabName = typeof children === 'string' ? children : '';
  return `Click to show ${tabName} content`;
}
