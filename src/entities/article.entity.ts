import { PrimaryColumn, Column, Entity, Index } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Article {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'jsonb' })
  _tags: string[];

  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 255 })
  created_at: Date;
}
