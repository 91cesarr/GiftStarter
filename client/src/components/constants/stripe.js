const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK'
  : 'pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK';

export default STRIPE_PUBLISHABLE;