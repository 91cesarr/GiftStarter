module.exports = {
  rules: {
    // Disallow global event and fdescribe
    'no-restricted-globals': [2, 'event', 'fdescribe'],
    // Disallow unused variables except in function parameters
    'no-unused-vars': [2, {args: 'none', ignoreRestSiblings: true}],
    // Disallow use before definition
    'no-use-before-define': [2, {functions: false, classes: false}],
  },
};
