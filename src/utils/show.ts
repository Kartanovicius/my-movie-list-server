import { Column } from 'typeorm';
import { Base } from './base';

export abstract class Show extends Base {
  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  views?: number;

  @Column({ default: 0, type: 'float' })
  rating?: number;

  @Column({ default: 0 })
  duration?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'poster_path' })
  posterPath: string;

  @Column({ default: '', name: 'trailer_path' })
  trailerPath: string;
}
