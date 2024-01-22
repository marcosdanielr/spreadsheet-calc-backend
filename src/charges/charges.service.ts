import { Express } from 'express';
import { Injectable } from '@nestjs/common';
// import csv from 'csv-parser';
// import fs from 'node:fs';

@Injectable()
export class ChargesService {
  async create(file: Express.Multer.File): Promise<string> {
    console.log({
      file,
    });
    return 'test';
  }
}
