import { Module } from '@nestjs/common';
import { ChargesModule } from './charges/charges.module';

@Module({
  imports: [ChargesModule],
})
export class AppModule {}
