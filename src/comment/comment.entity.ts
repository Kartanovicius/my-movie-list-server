import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base';
import { MovieEntity } from 'src/movie/movie.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Comment')
export class CommentEntity extends Base {
  @Column({ default: '', type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
