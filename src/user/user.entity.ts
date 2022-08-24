import { DatabaseFilesEntity } from 'src/database-files/database-files.entity';
import { ShowEntity } from 'src/show/show.entity';
import { Base } from 'src/utils/base';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '', type: 'text' })
  role: 'admin' | 'user';

  @JoinColumn({ name: 'avatar_id' })
  @OneToOne(() => DatabaseFilesEntity, {
    nullable: true,
  })
  avatar?: DatabaseFilesEntity;

  @Column({ nullable: true })
  avatarId?: number;

  @ManyToMany(() => ShowEntity, (show) => show.users)
  @JoinTable({ name: 'liked_show_id' })
  likedShows: ShowEntity[];
}
