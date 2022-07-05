import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Max(999)
  @Min(1)
  price: number;

  @IsNotEmpty()
  description: string;
}
