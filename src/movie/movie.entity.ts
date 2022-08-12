import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { Show } from 'src/utils/show';
import { Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity('Movie')
export class MovieEntity extends Show {
  @ManyToMany(() => UserEntity, (user) => user.likedMovies)
  users: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.movie)
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];
}
