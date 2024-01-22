import { Injectable, UploadedFiles } from '@nestjs/common';
import { Express } from 'express';
import { Controller, Post, UploadedFile } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';

@Injectable()
export class ChargesService {
  create(@UploadedFile() file: any) {
    console.log({
      file,
    });
    return 'opaassaa';
  }
}
