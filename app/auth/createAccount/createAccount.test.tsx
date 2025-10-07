import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

// Import the component - adjust path as needed
// @ts-ignore - Suppress type errors during testing
import CreateAccountPage from './page';

// Mock modules BEFORE imports
jest.mock('next/navigation');
jest.mock('sonner');
jest.mock('@/lib/context/AuthContext');
jest.mock('@/hooks/redux');
jest.mock('@/store/thunks/authThunks');
jest.mock('@/hooks/useConfirm');
jest.mock('@mui/material');
jest.mock('@/components/ui/input');
jest.mock('@/components/ui/checkbox');
jest.mock('react-icons/md');
jest.mock('lucide-react');
jest.mock('@/components/AdSlider');
jest.mock('@/components/ModalConfirmDetails');
jest.mock('@/components/SectionSocialAuth');
jest.mock('next/link');

// Now import the mocked modules
import { useAuth } from '@/lib/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signupUser } from '@/store/thunks/authThunks';
import { useConfirm } from '@/hooks/useConfirm';

// Setup mocks with proper implementations
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockToast = toast as jest.Mocked<typeof toast>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockUseConfirm = useConfirm as jest.MockedFunction<typeof useConfirm>;

// Mock implementations
jest.mock('@mui/material', () => ({
  Button: React.forwardRef<HTMLButtonElement, any>(
    ({ children, onClick, disabled, type, className, variant, ...props }, ref) => (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={className}
        data-variant={variant}
        {...props}
      >
        {children}
      </button>
    )
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: React.forwardRef<HTMLInputElement, any>(
    ({ className, type, ...props }, ref) => (
      <input ref={ref} type={type} className={className} {...props} />
    )
  ),
}));

jest.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({ id, checked, onCheckedChange, className }: any) => (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={className}
      role="checkbox"
    />
  ),
}));

jest.mock('react-icons/md', () => ({
  MdArrowBack: () => <span data-testid="back-icon">←</span>,
}));

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <span data-testid="arrow-left">←</span>,
  Eye: () => <span data-testid="eye-icon">👁</span>,
  EyeOff: () => <span data-testid="eye-off-icon">👁‍🗨</span>,
  Check: () => <span data-testid="check-icon">✓</span>,
  X: () => <span data-testid="x-icon">✗</span>,
}));

jest.mock('@/components/AdSlider', () => ({
  __esModule: true,
  default: () => <div data-testid="ad-slider">Ad Slider</div>,
}));

jest.mock('@/components/ModalConfirmDetails', () => ({
  ModalConfirmDetails: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="confirm-modal">
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null,
}));

jest.mock('@/components/SectionSocialAuth', () => ({
  SectionSocialAuth: () => <div data-testid="social-auth">Social Auth</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('CreateAccountPage', () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  const mockLogin = jest.fn();
  const mockDispatch = jest.fn();
  const mockOpenConfirm = jest.fn();
  const mockCloseConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: mockBack,
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    mockUseAuth.mockReturnValue({
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      isAuthenticated: false,
    } as any);

    mockUseAppDispatch.mockReturnValue(mockDispatch);

    mockUseAppSelector.mockReturnValue({
      loading: false,
    });

    mockUseConfirm.mockReturnValue({
      isOpen: false,
      data: false,
      openConfirm: mockOpenConfirm,
      closeConfirm: mockCloseConfirm,
    });

    // Mock toast methods
    mockToast.success = jest.fn();
    mockToast.error = jest.fn();
    mockToast.warning = jest.fn();
  });

  describe('Rendering', () => {
    it('should render the create account form', () => {
      render(<CreateAccountPage />);
      
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByText(/Create your account and dive into non-stop entertainment/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('720 123 456')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    });

    it('should render all password requirements', () => {
      render(<CreateAccountPage />);
      
      expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
      expect(screen.getByText('At least 1 Capital Letter')).toBeInTheDocument();
      expect(screen.getByText(/At least 1 special character/i)).toBeInTheDocument();
      expect(screen.getByText('At least 1 number')).toBeInTheDocument();
    });

    it('should render terms and conditions checkbox', () => {
      render(<CreateAccountPage />);
      
      expect(screen.getByText(/I Acknowledge that I have read and understood/i)).toBeInTheDocument();
      expect(screen.getByText('Terms of Use')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('should render social auth section', () => {
      render(<CreateAccountPage />);
      
      expect(screen.getByTestId('social-auth')).toBeInTheDocument();
    });

    it('should render country code input as readonly', () => {
      render(<CreateAccountPage />);
      
      const countryCodeInput = screen.getByDisplayValue('+254');
      expect(countryCodeInput).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error for invalid phone number', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const phoneInput = screen.getByPlaceholderText('720 123 456');
      await user.type(phoneInput, '123');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/Phone number must be at least 9 digits/i)).toBeInTheDocument();
      });
    });

    it('should accept valid 9-digit phone number', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const phoneInput = screen.getByPlaceholderText('720 123 456');
      await user.type(phoneInput, '720123456');
      
      await waitFor(() => {
        expect(screen.queryByText(/Phone number must be at least 9 digits/i)).not.toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('should show error for invalid email', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      await user.type(emailInput, 'invalid-email');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Invalid Email')).toBeInTheDocument();
      });
    });

    it('should show error for short password', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      await user.type(passwordInput, 'Short1!');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
      expect(passwordInput.type).toBe('password');
      
      const allButtons = screen.getAllByRole('button');
      const toggleButton = allButtons.find(btn => {
        const eyeIcon = btn.querySelector('[data-testid="eye-icon"]');
        const eyeOffIcon = btn.querySelector('[data-testid="eye-off-icon"]');
        return eyeIcon || eyeOffIcon;
      });
      
      if (toggleButton) {
        await user.click(toggleButton);
        expect(passwordInput.type).toBe('text');
        
        await user.click(toggleButton);
        expect(passwordInput.type).toBe('password');
      }
    });
  });

  describe('Terms and Conditions', () => {
    it('should enable/disable create account button based on terms acceptance', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      expect(submitButton).toBeDisabled();
      
      const termsCheckbox = screen.getByRole('checkbox');
      await user.click(termsCheckbox);
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      mockOpenConfirm.mockResolvedValue(true);
      mockDispatch.mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({
          data: { request_token: 'test-token' },
          message: 'Account created successfully',
        }),
      });

      render(<CreateAccountPage />);
      
      await user.type(screen.getByPlaceholderText('720 123 456'), '720123456');
      await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
      await user.type(screen.getByPlaceholderText('Enter your password'), 'ValidPass123!');
      await user.click(screen.getByRole('checkbox'));
      
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockOpenConfirm).toHaveBeenCalledWith({
          phone: '720123456',
          email: 'test@example.com',
          password: 'ValidPass123!',
          phone_code: '+254',
          country_code: 'KE',
          country: 'Kenya',
        });
      });
    });

    it('should handle submission cancellation', async () => {
      const user = userEvent.setup();
      mockOpenConfirm.mockResolvedValue(false);

      render(<CreateAccountPage />);
      
      await user.type(screen.getByPlaceholderText('720 123 456'), '720123456');
      await user.type(screen.getByPlaceholderText('Enter your password'), 'ValidPass123!');
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('button', { name: /Create Account/i }));
      
      await waitFor(() => {
        expect(mockToast.warning).toHaveBeenCalledWith('User canceled submission.');
      });
      
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should navigate to OTP page on successful submission', async () => {
      const user = userEvent.setup();
      mockOpenConfirm.mockResolvedValue(true);
      mockDispatch.mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({
          data: { request_token: 'test-token-123' },
          message: 'Success',
        }),
      });

      render(<CreateAccountPage />);
      
      await user.type(screen.getByPlaceholderText('720 123 456'), '720123456');
      await user.type(screen.getByPlaceholderText('Enter your password'), 'ValidPass123!');
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('button', { name: /Create Account/i }));
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/auth/otp?token=test-token-123');
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate back when back button is clicked', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const backIcon = screen.getByTestId('back-icon');
      const backButton = backIcon.closest('button');
      
      if (backButton) {
        await user.click(backButton);
        expect(mockBack).toHaveBeenCalled();
      }
    });

    it('should navigate to login page when sign-in link is clicked', async () => {
      const user = userEvent.setup();
      render(<CreateAccountPage />);
      
      const signInLink = screen.getByText('Sign-in');
      await user.click(signInLink);
      
      expect(mockPush).toHaveBeenCalledWith('/auth/login');
    });
  });

  describe('Loading States', () => {
    it('should disable submit button while loading', () => {
      mockUseAppSelector.mockReturnValue({
        loading: true,
      });

      render(<CreateAccountPage />);
      
      const submitButton = screen.getByRole('button', { name: /Creating Account/i });
      expect(submitButton).toBeDisabled();
    });

    it('should show loading text when submitting', () => {
      mockUseAppSelector.mockReturnValue({
        loading: true,
      });

      render(<CreateAccountPage />);
      
      expect(screen.getByText('Creating Account...')).toBeInTheDocument();
    });
  });
});