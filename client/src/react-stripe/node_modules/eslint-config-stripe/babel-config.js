module.exports = {
  extends: [require.resolve('./index')],
  plugins: ['babel'],
  rules: {
    'babel/generator-star-spacing': [2, {before: false, after: true}],
    'generator-star-spacing': 0,
  },
};
