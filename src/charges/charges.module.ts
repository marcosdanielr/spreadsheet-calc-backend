import { Module } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { ChargesController } from './charges.controller';

@Module({
  controllers: [ChargesController],
  providers: [ChargesService],
})
export class ChargesModule {}
