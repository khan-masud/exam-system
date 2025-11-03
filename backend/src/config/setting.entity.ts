import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('settings')
@Unique(['scope', 'key'])
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  scope!: string;

  @Column()
  key!: string;

  @Column({ type: 'jsonb' })
  value!: unknown;
}
