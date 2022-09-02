// https://eslint.org/docs/user-guide/configuring/configuration-files
// https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

// alternatively, can be placed in package.json as 'eslintConfig'
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  // https://stackoverflow.com/questions/53189200/whats-the-difference-between-plugins-and-extends-in-eslint
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended', // mods Prettier errors to throw ESLint errors (always last)
  ],
  parserOptions: {
    ecmaVersion: 'latest', // Parsing of modern ECMAScript features
    sourceType: 'module', // Enables the use of imports
  },
  // https://eslint.org/docs/rules
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
  // https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser
  // https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
  // Could also use overrides to set different rules for specific directories
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Specified only for TypeScript file extension
      // Extend TypeScript plugins here instead of outside `overrides`
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base',
      ],
      parser: '@typescript-eslint/parser',
      // parserOptions: { project: ['./tsconfig.json'] },
      // https://stackoverflow.com/questions/64933543/parsing-error-cannot-read-file-tsconfig-json-eslint
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      rules: {
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        // "@typescript-eslint/no-unused-vars" : "off",
        // "@typescript-eslint/no-explicit-any": "off"
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        // for 'Validators.required' sections
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // https://eslint.org/docs/user-guide/configuring/ignoring-code
  ignorePatterns: ['node_modules/', 'wwwroot/', 'dist/'],
};
