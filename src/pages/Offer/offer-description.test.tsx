import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OfferDescription } from './offer-description.tsx';

describe('OfferDescription Component (minimal)', () => {
  it('should render single paragraph', () => {
    render(<OfferDescription description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should split text by double newlines', () => {
    const description = 'First\n\nSecond\n\nThird';
    render(<OfferDescription description={description}/>);

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();

    const paragraphs = screen.getAllByText(/First|Second|Third/);
    expect(paragraphs).toHaveLength(3);
  });

  it('should have correct CSS classes', () => {
    render(<OfferDescription description="Test" />);

    const paragraph = screen.getByText('Test');
    expect(paragraph).toHaveClass('offer__text');
    expect(paragraph.parentElement).toHaveClass('offer__description');
  });
});
