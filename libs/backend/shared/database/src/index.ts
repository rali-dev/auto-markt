export * from './lib/prisma.module';
export * from './lib/prisma.service';

// Modell- und Prisma-Typen weiterreichen, damit Repositories in
// libs/backend/<domain>/infrastructure nicht in den generierten Ordner
// hineinimportieren muessen.
export * from './generated/prisma/client';
