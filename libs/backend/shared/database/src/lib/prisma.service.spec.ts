import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  const asConfig = (getOrThrow: jest.Mock) =>
    ({ getOrThrow }) as unknown as ConfigService;

  it('liest die Verbindungs-URL beim Konstruieren aus dem ConfigService', () => {
    const getOrThrow = jest
      .fn()
      .mockReturnValue('postgresql://user:pw@localhost:5432/db');

    const service = new PrismaService(asConfig(getOrThrow));

    expect(getOrThrow).toHaveBeenCalledWith('DATABASE_URL');
    // instanceof geht hier nicht: PrismaClient gibt aus dem Konstruktor einen
    // Proxy zurueck. Stattdessen pruefen, dass das generierte Modell-Delegate
    // und die Lifecycle-Methoden tatsaechlich durchgereicht werden.
    expect(typeof service.$connect).toBe('function');
    expect(typeof service.$disconnect).toBe('function');
    expect(service.healthCheck).toBeDefined();
  });

  it('bricht beim Boot ab, wenn DATABASE_URL fehlt', () => {
    // getOrThrow (statt get) ist Absicht: eine fehlende URL soll den Prozess
    // sofort stoppen und nicht erst beim ersten Query auffallen.
    const getOrThrow = jest.fn(() => {
      throw new Error('Configuration key "DATABASE_URL" does not exist');
    });

    expect(() => new PrismaService(asConfig(getOrThrow))).toThrow(
      'DATABASE_URL',
    );
  });
});
