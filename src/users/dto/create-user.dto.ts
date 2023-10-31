import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // To specify default properties for Swagger
  @ApiProperty({
    default: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    default: 'boss',
  })
  fullName: string;

  @ApiProperty({
    default: '1234t*',
  })
  password: string;
}
