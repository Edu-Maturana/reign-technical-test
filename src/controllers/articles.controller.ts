import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticlesService } from '../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
}
