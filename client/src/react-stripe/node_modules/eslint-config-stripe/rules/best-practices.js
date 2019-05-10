module.exports = {
  rules: {
    // Functions can sometimes return values or sometimes not
    'consistent-return': 0,
    // If/else blocks must use curly braces.
    curly: 2,
    // Switch statements must have a default case.
    'default-case': 2,
  // Require dot notation for property access unless they are snake_cased.
    'dot-notation': [2, {allowPattern: '^_*[A-Za-z0-9]+(_[A-Za-z0-9]+)+$'}],
    // Disallow == and != in favor of === and !==
    eqeqeq: 2,
    // Allow case declarations
    'no-case-declarations': 0,
    // Allow else after a return in an if/else block
    'no-else-return': 0,
    // Disallow reassignment of function parameters. Prop assignment is okay.
    'no-param-reassign': [2, {props: false}],
    // Disallow unused expressions
    'no-unused-expressions': [2, {allowShortCircuit: true}],
    // Disallow unnecessary .call() and .apply()
    'no-useless-call': 2,
  },
};
