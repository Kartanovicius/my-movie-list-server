import { Base } from 'src/utils/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class DatabaseFilesEntity extends Base {
  @Column()
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;
}
