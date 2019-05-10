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
  plugins: ['react'],
  rules: {
    // Enforce event handler naming conventions
    'react/jsx-handler-names': [2, {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    // Disallow duplicate props
    'react/jsx-no-duplicate-props': 2,
    // Enforce PascalCase for JSX components
    'react/jsx-pascal-case': 2,
    'react/jsx-tag-spacing': 2,
    // Disallow use of dangerous JSX properties
    'react/no-danger': 2,
    // Prevent direct mutation of this.state
    'react/no-direct-mutation-state': 2,
    // Don't require stateless components when possible
    'react/prefer-stateless-function': 0,
    // Don't require prop types
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 2,
    // Deprecated rule
    'react/require-extension': 0,
  },
};
