import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    this.logger.log('Hello World!')
    return 'Hello World!'
  }

  async getUsers() {
    return await this.prisma.user.findMany()
  }
}
