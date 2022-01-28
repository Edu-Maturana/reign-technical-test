import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Client } from 'pg';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import { DatabaseModule } from './database/database.module';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), DatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class AppModule {}
