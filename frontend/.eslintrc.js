module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    "react/no-unescaped-entities": [1, { "forbid": "Rien" }],
    'no-underscore-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': [
      0,
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    // "react/jsx-no-bind": [ "error", { "ignoreDOMComponents": true } ],
    'react/jsx-no-bind': [
      1,
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: true,
      },
    ],
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
