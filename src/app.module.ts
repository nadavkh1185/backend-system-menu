import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenusModule } from './menus/menu.module';

@Module({
  imports: [MenusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
