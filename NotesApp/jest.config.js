export default {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    // tell Jest to transform NativeWind + css-interop (and common RN libs)
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|nativewind|react-native-css-interop|react-clone-referenced-element|react-redux)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
