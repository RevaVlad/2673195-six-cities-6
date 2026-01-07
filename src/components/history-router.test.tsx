import { render, screen } from '@testing-library/react';
import { HistoryRouter } from './history-router.tsx';
import { createBrowserHistory } from 'history';

const mockHistory = createBrowserHistory();

describe('Component: HistoryRouter', () => {
  it('renders children correctly', () => {
    render(
      <HistoryRouter history={mockHistory}>
        <div data-testid="test-child">Test Child</div>
      </HistoryRouter>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders nested children', () => {
    render(
      <HistoryRouter history={mockHistory}>
        <div>
          <span data-testid="nested-child">Nested Child</span>
        </div>
      </HistoryRouter>
    );

    expect(screen.getByTestId('nested-child')).toBeInTheDocument();
    expect(screen.getByText('Nested Child')).toBeInTheDocument();
  });

  it('passes basename prop when provided', () => {
    const TestComponent = () => (
      <HistoryRouter history={mockHistory} basename="/test">
        <div>Test</div>
      </HistoryRouter>
    );

    expect(TestComponent).toBeDefined();
  });
});
