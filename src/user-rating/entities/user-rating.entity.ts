import { ShowEntity } from 'src/show/show.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('UserRating')
export class UserRatingEntity extends Base {
  @Column({ default: 0 })
  rating: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ShowEntity, (show) => show.userRating)
  @JoinColumn({ name: 'show_id' })
  show: ShowEntity;
}
