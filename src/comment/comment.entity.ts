import { ShowEntity } from 'src/show/show.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Comment')
export class CommentEntity extends Base {
  @Column({ default: '', type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ShowEntity, (show) => show.comments)
  @JoinColumn({ name: 'show_id' })
  show: ShowEntity;
}
