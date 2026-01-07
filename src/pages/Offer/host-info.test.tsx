import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HostInfo } from './host-info.tsx';
import { UserCompactDto } from '../../types/responses/user-compact-dto.ts';

describe('HostInfo Component', () => {
  const mockHost: UserCompactDto = {
    name: 'John Doe',
    avatarUrl: '/avatar.jpg',
    isPro: true,
  };

  describe('rendering', () => {
    it('should render host name', () => {
      render(<HostInfo host={mockHost} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render Pro status when host is pro', () => {
      render(<HostInfo host={mockHost} />);
      expect(screen.getByText('Pro')).toBeInTheDocument();
    });

    it('should not render Pro status when host is not pro', () => {
      const nonProHost = { ...mockHost, isPro: false };
      render(<HostInfo host={nonProHost} />);

      const proElement = screen.queryByText('Pro');
      expect(proElement).not.toBeInTheDocument();
    });

    it('should render avatar with correct attributes', () => {
      render(<HostInfo host={mockHost} />);

      const avatar = screen.getByAltText('Host avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', '/avatar.jpg');
      expect(avatar).toHaveAttribute('width', '74');
      expect(avatar).toHaveAttribute('height', '74');
    });
  });
});
