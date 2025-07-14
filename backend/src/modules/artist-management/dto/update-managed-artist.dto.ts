import { PartialType } from '@nestjs/mapped-types';
import { CreateManagedArtistDto } from './create-managed-artist.dto';

export class UpdateManagedArtistDto extends PartialType(CreateManagedArtistDto) {}