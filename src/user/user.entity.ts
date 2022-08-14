import { MovieEntity } from 'src/movie/movie.entity';
import { TvSeriesEntity } from 'src/tvseries/tvseries.entity';
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

  @Column({ default: 0, name: 'watched_count' })
  watchedCount?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.users)
  @JoinTable({ name: 'liked_movie_id' })
  likedMovies: MovieEntity[];

  @ManyToMany(() => TvSeriesEntity, (tvseries) => tvseries.users)
  @JoinTable({ name: 'liked_tvseries_id' })
  likedTvSeries: TvSeriesEntity[];
}
