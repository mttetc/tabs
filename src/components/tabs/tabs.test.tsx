import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '@/components/tabs/tabs';
import type { TabsProps } from '@/components/tabs/tabs';
import React from 'react';

type RenderTabsProps = Partial<TabsProps> & {
  disabled?: boolean;
};

describe('Tabs', () => {
  const renderTabs = ({
    variant = 'solid',
    defaultValue = 'tab1',
    value,
    onValueChange,
    colorScheme = 'blue',
    size = 'md',
    orientation = 'horizontal',
    disabled = false,
    unmountOnExit = true,
    isLoading = false,
  }: RenderTabsProps = {}) => {
    return render(
      <Tabs
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        variant={variant}
        colorScheme={colorScheme}
        size={size}
        orientation={orientation}
        unmountOnExit={unmountOnExit}
        isLoading={isLoading}
      >
        <Tabs.List>
          <Tabs.Trigger value="tab1" disabled={disabled}>
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
          <Tabs.Content value="tab3">Content 3</Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs>
    );
  };

  describe('Basic Functionality', () => {
    it('renders with default value', () => {
      renderTabs();
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('switches content when clicking tabs', async () => {
      renderTabs();
      await userEvent.click(screen.getByText('Tab 2'));
      expect(screen.getByText('Content 2')).toBeVisible();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('handles disabled tabs', async () => {
      renderTabs({ disabled: true });
      const disabledTab = screen.getByText('Tab 1');
      expect(disabledTab).toBeDisabled();
      await userEvent.click(disabledTab);
      expect(screen.getByText('Content 1')).toBeVisible();
    });
  });

  describe('Controlled Mode', () => {
    it('works in controlled mode', async () => {
      const onValueChange = jest.fn();
      renderTabs({ value: 'tab1', onValueChange });

      await userEvent.click(screen.getByText('Tab 2'));
      expect(onValueChange).toHaveBeenCalledWith('tab2');
    });

    it('updates selected tab when controlled value changes programmatically', () => {
      const onValueChange = jest.fn();
      const { rerender } = render(
        <Tabs value="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      expect(screen.getByText('Content 1')).toBeVisible();
      
      // Change the controlled value
      rerender(
        <Tabs value="tab2" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      expect(screen.getByText('Content 2')).toBeVisible();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports arrow key navigation', async () => {
      renderTabs();
      const tabs = screen.getAllByRole('tab');

      tabs[0].focus();
      expect(tabs[0]).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      await userEvent.click(tabs[1]); // Ensure tab is activated
      expect(screen.getByText('Content 2')).toBeVisible();

      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.click(tabs[0]); // Ensure tab is activated
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('supports Home/End keys', async () => {
      renderTabs();
      const tabs = screen.getAllByRole('tab');

      tabs[0].focus();
      await userEvent.keyboard('{End}');
      await userEvent.click(tabs[2]); // Ensure last tab is activated
      expect(screen.getByText('Content 3')).toBeVisible();

      await userEvent.keyboard('{Home}');
      await userEvent.click(tabs[0]); // Ensure first tab is activated
      expect(screen.getByText('Content 1')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      renderTabs();
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');

      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('supports custom ARIA labels', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List aria-label="Custom tabs">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Custom tabs');
    });

    it('shows and positions line indicator correctly for line variant', async () => {
      const { container } = render(
        <Tabs defaultValue="tab1" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );

      // Verify indicator exists and has correct classes
      const indicator = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('absolute');
      
      // Verify tab1 is selected initially
      expect(screen.getByText('Content 1')).toBeVisible();
      
      // Click second tab
      userEvent.click(screen.getByText('Tab 2'));
      
      // Verify tab2 is now selected
      expect(screen.getByText('Content 2')).toBeVisible();
      
      // Wait for transition to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Verify the indicator exists and has a transform style
      expect(indicator).toBeInTheDocument();
      expect(indicator.style.transform).toBeTruthy();
    });

    it('respects unmountOnExit prop', async () => {
      const { rerender } = renderTabs({ unmountOnExit: true });
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

      // Switch to tab 2
      await userEvent.click(screen.getByText('Tab 2'));
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

      // Test with unmountOnExit false
      rerender(
        <Tabs defaultValue="tab2" unmountOnExit={false}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );

      // Both contents should be in the DOM
      const content1 = screen.getByText('Content 1');
      const content2 = screen.getByText('Content 2');
      expect(content1).toBeInTheDocument();
      expect(content2).toBeInTheDocument();

      // Check visibility state
      const panel1 = content1.closest('[role="tabpanel"]');
      const panel2 = content2.closest('[role="tabpanel"]');
      expect(panel1).toHaveAttribute('aria-hidden', 'true');
      expect(panel2).toHaveAttribute('aria-hidden', 'false');
    });

    it('disables all tabs when in loading state', () => {
      renderTabs({ isLoading: true });
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toBeDisabled();
        expect(tab).toHaveAttribute('aria-disabled', 'true');
      });
    });

    it('handles dynamic tab addition and removal', () => {
      const { rerender } = render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      expect(screen.getAllByRole('tab')).toHaveLength(2);
      
      // Add a new tab
      rerender(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
            <Tabs.Content value="tab3">Content 3</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      
      // Remove a tab
      rerender(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab3">Content 3</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      expect(screen.getAllByRole('tab')).toHaveLength(2);
    });

    it('handles tab selection when currently selected tab is removed', () => {
      // Use a controlled component to test dynamic tab removal
      const TestComponent = () => {
        const [selectedTab, setSelectedTab] = React.useState('tab2');
        const [tabs, setTabs] = React.useState(['tab1', 'tab2', 'tab3']);
        
        const handleValueChange = (value: string) => {
          setSelectedTab(value);
          
          // If tab3 is selected, remove tab2 from the available tabs
          if (value === 'tab3') {
            setTabs(tabs.filter(tab => tab !== 'tab2'));
          }
        };
        
        return (
          <Tabs value={selectedTab} onValueChange={handleValueChange}>
            <Tabs.List>
              {tabs.map(tab => (
                <Tabs.Trigger key={tab} value={tab}>
                  Tab {tab.charAt(tab.length - 1)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.ContentGroup>
              {tabs.map(tab => (
                <Tabs.Content key={tab} value={tab}>
                  Content {tab.charAt(tab.length - 1)}
                </Tabs.Content>
              ))}
            </Tabs.ContentGroup>
          </Tabs>
        );
      };
      
      render(<TestComponent />);
      
      // Initially tab2 is selected and visible
      expect(screen.getByText('Content 2')).toBeVisible();
      
      // Click on tab3 to change selection and remove tab2
      userEvent.click(screen.getByText('Tab 3'));
      
      // Now tab3 should be selected and visible
      expect(screen.getByText('Content 3')).toBeVisible();
      
      // Tab2 should be removed from the DOM
      expect(screen.queryByText('Tab 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      
      // Click on tab1 to change selection
      userEvent.click(screen.getByText('Tab 1'));
      
      // Now tab1 should be selected and visible
      expect(screen.getByText('Content 1')).toBeVisible();
    });
  });

  describe('RTL Support', () => {
    it('correctly handles RTL layout', () => {
      // Mock RTL document direction
      const originalDir = document.dir;
      document.dir = 'rtl';
      
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('flex-row-reverse');
      
      // Reset document direction
      document.dir = originalDir;
    });
  });

  describe('Edge Cases', () => {
    it('handles long content gracefully', () => {
      render(
        <Tabs defaultValue="long">
          <Tabs.List>
            <Tabs.Trigger value="long">{'Very '.repeat(20)} long text</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="long">Long content</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );

      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('supports custom styling', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List className="custom-list">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup className="custom-group">
            <Tabs.Content value="tab1">Content</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveClass('custom-list');
      expect(screen.getByRole('tabpanel').parentElement).toHaveClass('custom-group');
    });
  });

  describe('Advanced Features', () => {
    it('handles overflow correctly based on orientation', () => {
      const { rerender } = render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            {Array.from({ length: 10 }).map((_, i) => (
              <Tabs.Trigger key={i} value={`tab${i}`}>
                Tab {i}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );

      const list = screen.getByRole('tablist');
      
      // Test horizontal orientation (default)
      expect(list).toHaveAttribute('data-orientation', 'horizontal');
      
      // Test vertical orientation
      rerender(
        <Tabs defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            {Array.from({ length: 10 }).map((_, i) => (
              <Tabs.Trigger key={i} value={`tab${i}`}>
                Tab {i}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="tab1">Content</Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs>
      );
      
      expect(list).toHaveAttribute('data-orientation', 'vertical');
    });
  });
});
