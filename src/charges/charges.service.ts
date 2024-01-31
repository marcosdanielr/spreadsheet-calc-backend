import { BadRequestException, Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';

type SendFileResponse = {
  average_billing_quantity: number;
  total_amount: number;
  total_subscribers: number;
  data: {
    billing_quantity: number;
    billed_every_x_days: number;
    start_date: string;
    status: string;
    status_date: string;
    cancellation_date: string;
    amount: number;
    next_cycle: string;
    subscriber_id: string;
  }[];
};

@Injectable()
export class ChargesService {
  async sendFile(file: Express.Multer.File): Promise<SendFileResponse> {
    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException({
        message: 'The file should be a CSV',
      });
    }

    const MAX_FILE_SIZE = 5 * 1000000;

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException({
        message: 'Max file size is 5mb!',
      });
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
        billing_quantity: Number(item['quantidade cobranças']),
        billed_every_x_days: Number(item['cobrada a cada X dias']),
        start_date: item['data início'],
        status: item['status'],
        status_date: item['data status'],
        cancellation_date: item['data cancelamento'],
        amount: parseFloat(item['valor'].replace(',', '.')),
        next_cycle: item['próximo ciclo'],
        subscriber_id: item['ID assinante'],
      };
    });

    const totalBillingQuantity = resultsTranslated.reduce(
      (acc, current) => acc + current.billing_quantity,
      0,
    );

    const averageBillingQuantity =
      totalBillingQuantity / resultsTranslated.length;

    const totalAmount = resultsTranslated.reduce(
      (acc, current) => acc + current.amount,
      0,
    );

    const totalSubscribers = resultsTranslated.filter(
      (item) => item.subscriber_id,
    ).length;

    return {
      average_billing_quantity: averageBillingQuantity,
      total_amount: totalAmount,
      total_subscribers: totalSubscribers,
      data: resultsTranslated,
    };
  }
}
