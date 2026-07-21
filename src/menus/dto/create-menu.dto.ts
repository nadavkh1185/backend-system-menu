import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    description:
      'Menu display name. Leading and trailing whitespace will be trimmed.',
    maxLength: 100,
    example: 'Dashboard',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({
    description:
      'Optional parent menu id (UUID) when this menu is a child of another menu.',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
