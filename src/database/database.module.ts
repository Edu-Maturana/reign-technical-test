import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'my_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: async () => {
        const client = new Client({
          host: 'localhost',
          port: 5432,
          user: 'root',
          password: '123456',
          database: 'my_db',
        });
        await client.connect();
        return client;
      },
    },
  ],

  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}

// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'my_db',
//   password: '123456',
//   port: 5432,
// });

// client.connect();

// @Global()
// @Module({
//   providers: [
//     {
//       provide: 'API_KEY',
//       useValue: '123456',
//     },
//     {
//       provide: 'PG',
//       useValue: client,
//     },
//   ],
//   exports: ['API_KEY', 'PG'],
// })
// export class DatabaseModule {}
