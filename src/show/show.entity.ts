import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  TableInheritance,
} from 'typeorm';

@Entity('Show')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ShowEntity extends Base {
  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  views?: number;

  @Column({ default: 0, type: 'float' })
  rating?: number;

  @Column({ default: 0 })
  duration?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  genre: string[];

  @Column({ default: '', name: 'poster_path' })
  posterPath: string;

  @Column({ default: '', name: 'trailer_path' })
  trailerPath: string;

  @ManyToMany(() => UserEntity, (user) => user.likedShows)
  users: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.show)
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];
}
