import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock'); // official mock
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('nativewind', () => ({
  styled: (Comp) => Comp,
  useColorScheme: () => 'light',
}));

jest.mock('react-native-safe-area-context', () => {
  const React = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');
  return {
    SafeAreaProvider: ({ children }) => <View>{children}</View>,
    SafeAreaView: ({ children, ...rest }) => <View {...rest}>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
    initialWindowMetrics: null,
  };
});

jest.mock('react-native-linear-gradient', () => {
  const React = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');
  return ({ children, ...props }) => <View {...props}>{children}</View>;
});

jest.mock('@react-native-masked-view/masked-view', () => {
  const React = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');
  return ({ children, ...props }) => <View {...props}>{children}</View>;
});

jest.mock('react-native-screens', () => ({
  ...jest.requireActual('react-native-screens'),
  enableScreens: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  };
});
