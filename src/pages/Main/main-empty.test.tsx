import { render, screen } from '@testing-library/react';
import { MainEmpty } from './main-empty.tsx';

describe('Component: MainEmpty', () => {
  it('renders no places message', () => {
    render(<MainEmpty />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Dusseldorf')).toBeInTheDocument();
  });
});
