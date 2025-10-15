import { render, screen, fireEvent } from '@testing-library/react-native';
import AuthScreen from '../AuthScreen';

jest.mock('../../components', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const { Text, Pressable, View } =
    jest.requireActual<typeof import('react-native')>('react-native');

  const AppBrand: React.FC<{ brandTitle: string; tagline: string }> = ({ brandTitle, tagline }) => (
    <View>
      <Text testID="brand-title">{brandTitle}</Text>
      <Text testID="brand-tagline">{tagline}</Text>
    </View>
  );

  const SignInForm: React.FC<{ footer?: { variantAction?: () => void } }> = ({ footer }) => (
    <View>
      <Text testID="signin-form">Sign In Form</Text>
      <Pressable testID="go-to-signup" onPress={footer?.variantAction}>
        <Text>Go to Sign Up</Text>
      </Pressable>
    </View>
  );

  const SignUpForm: React.FC<{ footer?: { variantAction?: () => void } }> = ({ footer }) => (
    <View>
      <Text testID="signup-form">Sign Up Form</Text>
      <Pressable testID="go-to-signin" onPress={footer?.variantAction}>
        <Text>Go to Sign In</Text>
      </Pressable>
    </View>
  );

  return { AppBrand, SignInForm, SignUpForm };
});

// mock @shared/ui
jest.mock('@shared/ui', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const { View } = jest.requireActual<typeof import('react-native')>('react-native');
  const Screen: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <View testID="screen">{children}</View>
  );
  return { Screen };
});

describe('AuthScreen', () => {
  it('renders SignIn by default and toggles to SignUp, then back', () => {
    render(<AuthScreen />);

    expect(screen.getByTestId('brand-title')).toHaveTextContent('Notes App');
    expect(screen.getByTestId('brand-tagline')).toHaveTextContent(
      'Your thoughts, organized beautifully',
    );
    expect(screen.getByTestId('signin-form')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('go-to-signup'));
    expect(screen.queryByTestId('signin-form')).toBeNull();
    expect(screen.getByTestId('signup-form')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('go-to-signin'));
    expect(screen.getByTestId('signin-form')).toBeOnTheScreen();
    expect(screen.queryByTestId('signup-form')).toBeNull();
  });
});
