import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { hackerNewsApi } from 'utils';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Article } from 'src/entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('PG')
    private clientPg: Client,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  getArticlesFromAPI() {
    return this.httpService
      .get(hackerNewsApi)
      .pipe(map((response) => response.data.hits))
      .subscribe((articles) => {
        // I decided just to save the last 5 articles to don't have to save too much data
        const lastArticles = articles.slice(5, 10);
        lastArticles.forEach((article) => {
          // I took only the data that i need for the test
          const { story_id, story_title, author, _tags, created_at } = article;
          const data = {
            id: story_id,
            title: story_title == null ? 'Empty title' : story_title,
            author,
            _tags,
            created_at: moment(created_at).format('MMMM Do YYYY, h:mm:ss a'),
          };
          this.articleRepository.save(data);
        });
      });
  }

  async getArticles(
    author: string,
    _tags: string,
    title: string,
    //  month: string,
  ) {
    const where = {};

    if (author) {
      where['author'] = author;
    }
    if (_tags) {
      where['_tags'] = _tags;
    }
    if (title) {
      where['title'] = title;
    }
    // if (month) {
    //   where['created_at'] = `%${month}%`;
    // }
    return await this.articleRepository.find({
      take: 5,
      where,
      order: {
        created_at: 'DESC',
      },
    });
  }
}
