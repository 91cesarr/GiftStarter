module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['jsx-a11y', 'react'],
  rules: {
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/label-has-for': 0,
  },
};

