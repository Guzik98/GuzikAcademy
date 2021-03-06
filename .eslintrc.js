module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "amd": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "globalReturn": true,
      "generators": false,
      "objectLiteralDuplicateProperties": false,
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": 1,
    "no-debugger": 2,
    "space-before-blocks": 2,
    "no-var": 2
  }
};