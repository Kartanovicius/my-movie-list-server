import { ShowEntity } from 'src/show/show.entity';
import { ChildEntity, Entity } from 'typeorm';

@Entity('Movie')
@ChildEntity()
export class MovieEntity extends ShowEntity {}
