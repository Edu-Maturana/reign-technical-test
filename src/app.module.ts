import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class AppModule {}
