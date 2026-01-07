import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortOptionsMemo } from './sort-options.tsx';
import { SortProvider } from '../../hocs/sort-context.tsx';
import { SORT_OPTIONS } from '../../const.ts';

describe('Component: SortOptions', () => {
  const renderWithProvider = () => render(
    <SortProvider>
      <SortOptionsMemo />
    </SortProvider>
  );

  it('renders sort by text', () => {
    renderWithProvider();

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('toggles dropdown on click', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    const toggle = screen.getByTestId('sort-toggle');
    await user.click(toggle);

    const optionsList = screen.getByRole('list');
    const options = optionsList.querySelectorAll('.places__option');

    expect(options).toHaveLength(SORT_OPTIONS.length);

    SORT_OPTIONS.forEach((option, index) => {
      expect(options[index]).toHaveTextContent(option.toString());
    });
  });

  it('changes sort type when option is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    const toggle = screen.getByTestId('sort-toggle');
    await user.click(toggle);

    const optionsList = screen.getByRole('list');
    const priceLowToHigh = optionsList.querySelector('li:nth-child(2)'); // Вторая опция
    await user.click(priceLowToHigh!);

    expect(screen.getByTestId('sort-toggle')).toHaveTextContent('Price: low to high');
  });
});
