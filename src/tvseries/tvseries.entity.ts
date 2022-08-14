import { TvSeriesCommentEntity } from 'src/tvseries-comment/tvseries-comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { Show } from 'src/utils/show';
import { Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity('TvSeries')
export class TvSeriesEntity extends Show {
  @ManyToMany(() => UserEntity, (user) => user.likedTvSeries)
  users: UserEntity[];

  @OneToMany(() => TvSeriesCommentEntity, (comment) => comment.tvseries)
  @JoinColumn({ name: 'tvseries_comment_id' })
  comments: TvSeriesCommentEntity[];
}
