import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OfferImage, OfferImages } from './offer-image.tsx';

describe('OfferImage Component', () => {
  it('should render image with correct attributes', () => {
    render(<OfferImage imageUrl="/test.jpg" />);

    const image = screen.getByAltText('Photo studio');
    expect(image).toHaveAttribute('src', '/test.jpg');
    expect(image).toHaveClass('offer__image');
  });
});

describe('OfferImages Component', () => {
  it('should render all images from the array', () => {
    const imageUrls = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
    render(<OfferImages imageUrls={imageUrls} />);

    const images = screen.getAllByAltText('Photo studio');
    expect(images).toHaveLength(3);
  });

  it('should render container with correct classes', () => {
    const imageUrls = ['/img1.jpg'];
    const { container } = render(<OfferImages imageUrls={imageUrls} />);

    expect(container.querySelector('.offer__gallery-container')).toBeInTheDocument();
    expect(container.querySelector('.offer__gallery')).toBeInTheDocument();
  });
});
