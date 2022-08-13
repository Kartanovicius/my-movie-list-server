import { MovieCommentEntity } from 'src/movie-comment/movie-comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { Show } from 'src/utils/show';
import { Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity('Movie')
export class MovieEntity extends Show {
  @ManyToMany(() => UserEntity, (user) => user.likedMovies)
  users: UserEntity[];

  @OneToMany(() => MovieCommentEntity, (comment) => comment.movie)
  @JoinColumn({ name: 'movie_comment_id' })
  comments: MovieCommentEntity[];
}
