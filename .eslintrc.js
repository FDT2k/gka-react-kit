module.exports = {
  "parserOptions": {
    "ecmaVersion": 8,
     "sourceType": "module",
  },
  "parser": "babel-eslint",
  "env": {
      "browser": false,
      "node": true,
      "es6": true,
  },
  "extends": "eslint:recommended",
  "rules": {
      "prefer-template": "error",
      "no-useless-escape":"warn",
      "no-console":"warn",
      "global-require":"off",
      "indent": [
          "error",
          "tab"
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ]
  }
};
