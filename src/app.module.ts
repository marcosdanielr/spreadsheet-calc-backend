import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChargesModule } from './charges/charges.module';

@Module({
  imports: [ChargesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
