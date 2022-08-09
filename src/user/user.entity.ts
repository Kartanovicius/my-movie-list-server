import { Base } from 'src/utils/base';
import { VideoEntity } from 'src/video/video.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: 0, name: 'watched_count' })
  watchedCount?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];
}
