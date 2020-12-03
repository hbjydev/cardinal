import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Guild from './Guild.entity';

@Entity({ name: 'macros' })
export default class Macro extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Guild, g => g.id)
  @JoinColumn({ name: 'guild_id' })
  public guild?: Guild;

  @Column({ length: '24', nullable: false })
  public name?: string;

  @Column({ length: '255', nullable: false })
  public content?: string;
}
