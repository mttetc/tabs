import { TabsColorScheme } from '@/components/tabs/contexts/tabs-context';

export const lineIndicatorColorSchemes = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  gray: 'bg-gray-500',
} as const;

export const tabsListColorSchemes = {
  blue: {
    solid: 'bg-blue-50 border-blue-200',
    line: 'border-blue-200',
  },
  green: {
    solid: 'bg-green-50 border-green-200',
    line: 'border-green-200',
  },
  red: {
    solid: 'bg-red-50 border-red-200',
    line: 'border-red-200',
  },
  yellow: {
    solid: 'bg-yellow-50 border-yellow-200',
    line: 'border-yellow-200',
  },
  purple: {
    solid: 'bg-purple-50 border-purple-200',
    line: 'border-purple-200',
  },
  gray: {
    solid: 'bg-gray-50 border-gray-200',
    line: 'border-gray-200',
  },
} as const;

export const tabsTriggerColorSchemes: Record<
  TabsColorScheme,
  {
    line: { selected: string; default: string; hover: string };
    solid: { selected: string; default: string; hover: string };
  }
> = {
  blue: {
    line: {
      selected: 'text-blue-700 border-blue-500',
      default: 'text-gray-600',
      hover: 'hover:text-blue-600',
    },
    solid: {
      selected: 'bg-blue-100 text-blue-900',
      default: 'text-gray-600',
      hover: 'hover:bg-blue-50 hover:text-blue-700',
    },
  },
  green: {
    line: {
      selected: 'text-green-700 border-green-500',
      default: 'text-gray-600',
      hover: 'hover:text-green-600',
    },
    solid: {
      selected: 'bg-green-100 text-green-900',
      default: 'text-gray-600',
      hover: 'hover:bg-green-50 hover:text-green-700',
    },
  },
  red: {
    line: {
      selected: 'text-red-700 border-red-500',
      default: 'text-gray-600',
      hover: 'hover:text-red-600',
    },
    solid: {
      selected: 'bg-red-100 text-red-900',
      default: 'text-gray-600',
      hover: 'hover:bg-red-50 hover:text-red-700',
    },
  },
  yellow: {
    line: {
      selected: 'text-yellow-700 border-yellow-500',
      default: 'text-gray-600',
      hover: 'hover:text-yellow-600',
    },
    solid: {
      selected: 'bg-yellow-100 text-yellow-900',
      default: 'text-gray-600',
      hover: 'hover:bg-yellow-50 hover:text-yellow-700',
    },
  },
  purple: {
    line: {
      selected: 'text-purple-700 border-purple-500',
      default: 'text-gray-600',
      hover: 'hover:text-purple-600',
    },
    solid: {
      selected: 'bg-purple-100 text-purple-900',
      default: 'text-gray-600',
      hover: 'hover:bg-purple-50 hover:text-purple-700',
    },
  },
  gray: {
    line: {
      selected: 'text-gray-700 border-gray-500',
      default: 'text-gray-600',
      hover: 'hover:text-gray-700',
    },
    solid: {
      selected: 'bg-gray-100 text-gray-900',
      default: 'text-gray-600',
      hover: 'hover:bg-gray-50 hover:text-gray-700',
    },
  },
} as const;

export const TABS_CONSTANTS = {
  TRANSITION: {
    DURATION: 300, // ms
    TIMING: 'ease',
  },
  INDICATOR: {
    HORIZONTAL_HEIGHT: '2px',
    VERTICAL_WIDTH: '2px',
  },
};
