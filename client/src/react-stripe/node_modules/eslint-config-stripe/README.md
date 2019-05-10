# eslint-config-stripe

This package provides Stripe's .eslintrc as an extensible shared config.

### Installation

`eslint-config-stripe` is based off of `eslint-config-airbnb` and requires `eslint`,
`eslint-plugin-import`, `eslint-plugin-react`, and `eslint-plugin-jsx-a11y`. To install:
```
(
  export PKG=eslint-config-stripe;
  npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
)
```

### Usage

Add `extends: 'stripe'` to your `.eslintrc`:

(.eslintrc.yml)
```yaml
---
extends: 'stripe'
```

(.eslintrc)
```json
{
"extends": "stripe"
}
```
