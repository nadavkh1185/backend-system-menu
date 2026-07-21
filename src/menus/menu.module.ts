import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { MenusController } from './menus.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenusController],
  providers: [MenuService],
})
export class MenusModule {}
