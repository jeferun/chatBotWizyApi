import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRequestDto {
  @ApiProperty({
    description: 'The message or query for the chatbot',
    example: 'I am looking for a phone',
  })
  @IsString()
  @IsNotEmpty()
  query: string;
}
