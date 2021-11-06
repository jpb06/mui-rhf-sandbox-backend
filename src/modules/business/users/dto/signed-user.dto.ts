import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { RoleDto } from 'modules/business/roles/roles/role.dto';
import { SkillDto } from 'modules/business/skills/dto/skill.dto';

@Exclude()
export class SignedUser {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  password: string;

  @Expose()
  @ApiProperty()
  @Type(() => RoleDto)
  role: RoleDto;

  @Expose()
  @ApiProperty()
  @Type(() => SkillDto)
  skills: Array<SkillDto>;

  @Expose()
  @ApiProperty()
  token: string;
}
