module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': [2, 'always'],
    // Allow any usage of braces with arrow functions
    'arrow-body-style': 0,
    // Require spaces around arrow functions
    'arrow-spacing': 2,
    // Require object and property shorthand
    'object-shorthand': [2, 'always'],
    // Don't require arrow functions for callbacks
    'prefer-arrow-callback': 0,
    // Require consts if there is no reassignment
    'prefer-const': 2,
  },
};
