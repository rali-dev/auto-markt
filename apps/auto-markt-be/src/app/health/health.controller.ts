import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@org/backend-shared-database';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Setzt bewusst einen echten, typisierten Prisma-Query ab statt eines
   * rohen `SELECT 1`. Damit beweist der Endpoint in einem Aufruf: Client
   * generiert, Migration eingespielt, Verbindung zu Supabase steht.
   */
  @Get()
  async check(): Promise<{ status: string; db: string; healthChecks: number }> {
    const healthChecks = await this.prisma.healthCheck.count();
    return { status: 'ok', db: 'up', healthChecks };
  }
}
