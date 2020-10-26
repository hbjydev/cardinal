module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/no-cycle": 0,
    "no-console": 0
  }
};
