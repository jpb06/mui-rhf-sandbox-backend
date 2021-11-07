import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { transformTo } from '@util/transform-to';
import * as jwt from 'jsonwebtoken';

import { RolesStoreService } from '@db/stores/roles-store.service';
import { SkillsStoreService } from '@db/stores/skills-store.service';
import { UsersStoreService } from '@db/stores/users-store.service';
import { ApiRoute } from '@decorators/api-route';

import { SignupBodyDto } from './dto/signup.body.dto';
import { SignupResultDto } from './dto/signup.result.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersStore: UsersStoreService,
    private readonly rolesStore: RolesStoreService,
    private readonly skillsStore: SkillsStoreService,
  ) {}

  @Post('signup')
  @ApiRoute({
    summary: 'Registers a user',
    badRequest: {},
    created: {
      type: SignupResultDto,
      description: 'The signed user profile, along with a token',
    },
  })
  async signup(@Body() data: SignupBodyDto): Promise<SignupResultDto> {
    const roles = await this.rolesStore.getAll();
    const userRole = roles.find((el) => el.id === data.idRole);
    if (!userRole) {
      throw new BadRequestException('Invalid role');
    }

    const skills = await this.skillsStore.getAll();
    const invalidSkills = data.idSkills.filter(
      (el) => !skills.map((sk) => sk.id).includes(el),
    );
    if (invalidSkills.length > 0) {
      throw new BadRequestException(
        `Invalid skill(s): ${invalidSkills.join(', ')}`,
      );
    }

    const user = await this.usersStore.create(data);

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
    );

    return transformTo(SignupResultDto, {
      ...user,
      role: userRole,
      skills: skills.filter((el) => data.idSkills.includes(el.id)),
      token,
    });
  }
}
