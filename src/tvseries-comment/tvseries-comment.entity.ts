import { TvSeriesEntity } from 'src/tvseries/tvseries.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('TvSeriesComment')
export class TvSeriesCommentEntity extends Base {
  @Column({ default: '', type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => TvSeriesEntity, (tvseries) => tvseries.comments)
  @JoinColumn({ name: 'tvseries_id' })
  tvseries: TvSeriesEntity;
}
