import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { hackerNewsApi } from 'utils';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('PG')
    private clientPg: Client,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  getArticles() {
    return this.httpService
      .get(hackerNewsApi)
      .pipe(map((response) => response.data.hits));
  }

  async getDataFromTest() {
    const query = 'SELECT * FROM test';
    const result = await this.clientPg.query(query);
    return result.rows;
  }
}
