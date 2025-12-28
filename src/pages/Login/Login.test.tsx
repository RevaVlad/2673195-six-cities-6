import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login';
import { AuthorizationStatus } from '../../const';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

const mockToastError = vi.hoisted(() => vi.fn());
const mockDispatch = vi.hoisted(() => vi.fn());
const mockUseAppSelector = vi.hoisted(() => vi.fn());
const mockLoginAction = vi.hoisted(() => vi.fn());

vi.mock('react-toastify', () => ({
  toast: {
    error: mockToastError ,
  },
}));

vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch ,
}));

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector ,
}));

vi.mock('../../store/apiActions/userActions', () => ({
  loginAction: mockLoginAction,
}));

describe('Component: Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoginAction.mockReturnValue({
      type: 'LOGIN',
      payload: undefined,
    });
  });

  const renderComponent = (authStatus: AuthorizationStatus = AuthorizationStatus.NotAuth) => {
    mockUseAppSelector.mockReturnValue(authStatus);

    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  it('redirects to main page when user is already authorized', () => {
    renderComponent(AuthorizationStatus.Auth);

    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
  });

  it('renders login form when user is not authorized', () => {
    renderComponent(AuthorizationStatus.NotAuth);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('renders logo with link to main page', () => {
    renderComponent();

    const logoLink = screen.getByRole('link', { name: '6 cities logo' });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('shows error toast when password is invalid', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'invalid');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(mockToastError).toHaveBeenCalledWith('Пароль должен содержать хотя бы одну букву и цифру.');
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockLoginAction).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('has required attributes for inputs', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
  });

  it('renders city link', () => {
    renderComponent();

    const cityLink = screen.getByRole('link', { name: 'Amsterdam' });
    expect(cityLink).toBeInTheDocument();
    expect(cityLink).toHaveAttribute('href', '/');
  });
});
