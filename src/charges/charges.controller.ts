import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { ChargesService } from './charges.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.chargesService.sendFile(file);
  }
}
