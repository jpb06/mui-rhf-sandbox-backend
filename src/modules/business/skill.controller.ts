import { Controller, Get } from '@nestjs/common';

import { SkillsStoreService } from '@db/stores/skills-store.service';
import { ApiRoute } from '@decorators/api-route';

import { SkillDto } from './dto/skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsStore: SkillsStoreService) {}

  @Get()
  @ApiRoute({
    summary: 'Gets all skills',
    ok: {
      type: [SkillDto],
      description: 'The available skills',
    },
  })
  async getAllSkills(): Promise<Array<SkillDto>> {
    const data = await this.skillsStore.getAll();

    return data;
  }
}
