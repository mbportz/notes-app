module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      // RN preset (RN 0.81+)
      ['module:@react-native/babel-preset', { jsxImportSource: 'nativewind' }],
      // 👇 NativeWind v4 as a PRESET, not a plugin
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@app': './src/app',
            '@features': './src/features',
            '@store': './src/store',
            '@lib': './src/lib',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@shared': './src/shared',
            '@theme': './src/theme',
          },
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
      ],
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
