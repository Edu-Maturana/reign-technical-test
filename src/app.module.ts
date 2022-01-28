import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';

import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class AppModule {}
