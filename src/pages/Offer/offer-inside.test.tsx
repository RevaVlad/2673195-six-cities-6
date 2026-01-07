import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OfferInside } from './offer-inside.tsx';

describe('OfferInside Component', () => {
  it('should render title and list items', () => {
    const inside = ['Wi-Fi', 'Heating', 'Kitchen'];
    render(<OfferInside inside={inside} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Heating')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('should render empty list when inside array is empty', () => {
    render(<OfferInside inside={[]} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('should have correct CSS classes', () => {
    render(<OfferInside inside={['Wi-Fi']} />);

    const container = screen.getByText('What\'s inside').parentElement;
    expect(container).toHaveClass('offer__inside');

    const title = screen.getByText('What\'s inside');
    expect(title).toHaveClass('offer__inside-title');

    const list = screen.getByRole('list');
    expect(list).toHaveClass('offer__inside-list');

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass('offer__inside-item');
  });
});
