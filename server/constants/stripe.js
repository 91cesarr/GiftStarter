const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
  ? 'pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK'
  : 'pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;