import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRatingDto } from './create-user-rating.dto';

export class UpdateUserRatingDto extends PartialType(CreateUserRatingDto) {}
