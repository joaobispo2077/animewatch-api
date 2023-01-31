import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './shared/services/prisma.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [CategoriesModule, AuditModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
