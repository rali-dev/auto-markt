import type { CodegenConfig } from '@graphql-codegen/cli';

// GraphQL Codegen fuer das Frontend. Liest den API-Vertrag (schema.gql, vom
// Backend generiert) und die Operationen aus den .graphql-Dateien unter src/
// und erzeugt pro Operation den Ergebnis- und Variablen-Typ plus ein
// typisiertes DocumentNode, aus dem Apollo die Typen selbst ableitet.
//
// Laeuft als Nx-Target `auto-markt:codegen` mit cwd apps/auto-markt, alle
// Pfade sind relativ dazu. build, serve, test und typecheck haengen davon ab.
//
// Operationen stehen bewusst in .graphql-Dateien und nicht im TS-Code per
// graphql(): Diese Funktion zieht eine Map aller Operationen ins Bundle, die
// nur ein Babel- bzw. SWC-Plugin wieder entfernt -- und das kann der esbuild-
// Builder von Angular nicht laden. Importiert wird deshalb direkt
// `XyzDocument` aus generated/graphql.ts (tree-shakeable).
const config: CodegenConfig = {
  schema: '../auto-markt-be/schema.gql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/app/graphql/generated/': {
      preset: 'client',
      presetConfig: {
        // Erst einschalten, wenn Komponenten Fragments verwenden.
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        // String-Unions statt TS-enums: So kommen Enums im JSON auch an.
        enumsAsTypes: true,
        scalars: {
          // DateTime wird als ISO-String serialisiert, nicht als Date-Objekt.
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;
