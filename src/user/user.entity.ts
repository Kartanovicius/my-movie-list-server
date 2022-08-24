import { ShowEntity } from 'src/show/show.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @ManyToMany(() => ShowEntity, (show) => show.users)
  @JoinTable({ name: 'liked_show_id' })
  likedShows: ShowEntity[];
}
