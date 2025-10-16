import { render, screen, fireEvent } from '@testing-library/react-native';
import AuthScreen from '../AuthScreen';

jest.mock('../../components', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const { Text, Pressable, View } =
    jest.requireActual<typeof import('react-native')>('react-native');

  const AppBrand: React.FC<{ brandTitle: string; tagline: string }> = ({ brandTitle, tagline }) => (
    <View>
      <Text accessibilityRole="header">{brandTitle}</Text>
      <Text>{tagline}</Text>
    </View>
  );

  const SignInForm: React.FC<{
    footer?: { variantAction?: () => void; forgot?: { onPress: () => void } };
  }> = ({ footer }) => (
    <View>
      <Text>Sign In Form</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Forgot password"
        accessibilityHint="Render Forgot password form"
        onPress={footer?.forgot?.onPress}
      >
        <Text>Forgot password?</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign up"
        accessibilityHint="Returns to the sign-in form"
        onPress={footer?.variantAction}
      >
        <Text>Go to Sign Up</Text>
      </Pressable>
    </View>
  );

  const SignUpForm: React.FC<{ footer?: { variantAction?: () => void } }> = ({ footer }) => (
    <View>
      <Text>Sign Up Form</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign in"
        accessibilityHint="Render sign-in form"
        onPress={footer?.variantAction}
      >
        <Text>Go to Sign In</Text>
      </Pressable>
    </View>
  );

  const ForgotPasswordForm: React.FC<{ footer?: { variantAction?: () => void } }> = ({
    footer,
  }) => (
    <View>
      <Text>Forgot Password Form</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to sign in"
        accessibilityHint="Returns to the sign-in form"
        onPress={footer?.variantAction}
      >
        <Text>Back to Login</Text>
      </Pressable>
    </View>
  );

  return { AppBrand, SignInForm, SignUpForm, ForgotPasswordForm };
});

// mock @shared/ui
jest.mock('@shared/ui', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const { View } = jest.requireActual<typeof import('react-native')>('react-native');
  const Screen: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <View>{children}</View>
  );
  return { Screen };
});

describe('AuthScreen', () => {
  it('renders SignIn by default and toggles to SignUp, then back', () => {
    render(<AuthScreen />);

    // Brand by role/text (no testIDs)
    expect(screen.getByRole('header', { name: 'Notes App' })).toBeOnTheScreen();
    expect(screen.getByText('Your thoughts, organized beautifully')).toBeOnTheScreen();

    // Default view shows sign-in
    expect(screen.getByText('Sign In Form')).toBeOnTheScreen();

    // Go to Sign Up (role + name)
    fireEvent.press(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.queryByText('Sign In Form')).toBeNull();
    expect(screen.getByText('Sign Up Form')).toBeOnTheScreen();

    // Back to Sign In
    fireEvent.press(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText('Sign In Form')).toBeOnTheScreen();
    expect(screen.queryByText('Sign Up Form')).toBeNull();
  });

  it('navigates to Forgot Password and back to Sign In', () => {
    render(<AuthScreen />);

    // starts on Sign In
    expect(screen.getByText('Sign In Form')).toBeOnTheScreen();

    // go to Forgot Password
    fireEvent.press(screen.getByRole('button', { name: /forgot password/i }));
    expect(screen.getByText('Forgot Password Form')).toBeOnTheScreen();
    expect(screen.queryByText('Sign In Form')).toBeNull();

    // back to Sign In
    fireEvent.press(screen.getByRole('button', { name: /back to sign in/i }));
    expect(screen.getByText('Sign In Form')).toBeOnTheScreen();
    expect(screen.queryByText('Forgot Password Form')).toBeNull();
  });
});
