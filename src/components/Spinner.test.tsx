import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';
import { vi } from 'vitest';

vi.mock('react-loader-spinner', () => ({
  Oval: ({ ariaLabel }: { ariaLabel: string }) => (
    <div aria-label={ariaLabel} role="presentation" />
  ),
}));

describe('Component: Spinner', () => {
  it('should render without errors', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('audio-loading')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});
