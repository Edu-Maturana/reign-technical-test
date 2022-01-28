import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles() {
    return await this.articlesService.getDataFromTest();
  }
}
