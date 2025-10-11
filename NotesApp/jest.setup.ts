// Use manual mocks from __mocks__ directory
jest.mock('react-native-linear-gradient');
jest.mock('@react-native-masked-view/masked-view');

// Optional: extend jest-native matchers (already in your deps)
import '@testing-library/jest-native/extend-expect';
