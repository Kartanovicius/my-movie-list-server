import { ShowEntity } from 'src/show/show.entity';
import { ChildEntity, Entity } from 'typeorm';

@Entity('TvSeries')
@ChildEntity()
export class TvSeriesEntity extends ShowEntity {}
