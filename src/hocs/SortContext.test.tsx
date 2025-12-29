import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { SortProvider, SortContext } from './SortContext';
import { SortType } from '../const';

const TestComponent = () => {
  const context = useContext(SortContext);

  if (!context) {
    return <div>No context</div>;
  }

  const { currentSortType, setCurrentSortType } = context;

  return (
    <div>
      <span data-testid="current-sort">{currentSortType}</span>
      <button
        onClick={() => setCurrentSortType(SortType.PriceHighToLow)}
        data-testid="sort-button"
      >
        Change Sort
      </button>
    </div>
  );
};

describe('Component: SortProvider', () => {
  it('renders children correctly', () => {
    render(
      <SortProvider>
        <div data-testid="test-child">Test Child</div>
      </SortProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('provides initial sort type', () => {
    render(
      <SortProvider>
        <TestComponent />
      </SortProvider>
    );

    expect(screen.getByTestId('current-sort')).toHaveTextContent(SortType.Popular);
  });

  it('updates sort type when setCurrentSortType is called', async () => {
    const user = userEvent.setup();

    render(
      <SortProvider>
        <TestComponent />
      </SortProvider>
    );

    expect(screen.getByTestId('current-sort')).toHaveTextContent(SortType.Popular);

    await user.click(screen.getByTestId('sort-button'));

    expect(screen.getByTestId('current-sort')).toHaveTextContent(SortType.PriceHighToLow);
  });

  it('context is null when not wrapped in provider', () => {
    render(<TestComponent />);

    expect(screen.getByText('No context')).toBeInTheDocument();
  });
});
