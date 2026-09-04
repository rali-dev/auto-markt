import baseConfig from '../../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    // src/generated ist Prisma-Output und wird bei jedem `db:generate` neu
    // geschrieben -- Lint-Regeln darauf anzuwenden bringt nichts.
    ignores: ['**/out-tsc', 'src/generated'],
  },
];
