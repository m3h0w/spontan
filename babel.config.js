module.exports = function (api) {
  api.cache(true);

  const plugins = [
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './assets',
        },
      },
    ],
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
