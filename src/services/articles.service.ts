import { Injectable } from '@nestjs/common';
import { hackerNewsApi } from 'utils';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ArticlesService {
  constructor(private readonly httpService: HttpService) {}

  @Cron(CronExpression.EVERY_HOUR)
  getArticles() {
    return this.httpService
      .get(hackerNewsApi)
      .pipe(map((response) => response.data.hits));
  }
}
