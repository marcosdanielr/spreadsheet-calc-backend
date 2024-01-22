import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';

@Injectable()
export class ChargesService {
  async create(file: Express.Multer.File) {
    if (file.mimetype !== 'text/csv') {
      return { message: 'The file should be a CSV' };
    }

    const results: any[] = await new Promise((resolve) => {
      const parser = csvParser();
      const data: any[] = [];

      parser.on('data', (rowData) => data.push(rowData));
      parser.on('end', () => resolve(data));

      parser.write(file.buffer);
      parser.end();
    });

    const resultsTranslated = results.map((item) => {
      return {
        billing_quantity: item['quantidade cobranças'],
        billed_every_x_days: item['cobrada a cada X dias'],
        start_date: item['data início'],
        status: item['status'],
        status_date: item['data status'],
        cancellation_date: item['data cancelamento'],
        amount: item['valor'],
        next_cycle: item['próximo ciclo'],
        subscriber_id: item['ID assinante'],
      };
    });

    return resultsTranslated;
  }
}
