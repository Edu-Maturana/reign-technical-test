import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // a get method to get the last 5 articles with these optional filters:
  // - author
  // - _tags
  // - title
  // - month

  @Get()
  async getArticles(
    @Query('author') author: string,
    @Query('_tags') _tags: string,
    @Query('title') title: string,
    @Query('month') month: string,
  ) {
    return await this.articlesService.getArticles(author, _tags, title, month);
  }
}
