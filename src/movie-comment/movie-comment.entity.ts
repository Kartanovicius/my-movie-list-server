import { MovieEntity } from 'src/movie/movie.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('MovieComment')
export class MovieCommentEntity extends Base {
  @Column({ default: '', type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
