import { Module } from '@nestjs/common';

import { DalModule } from '@db/dal.module';

import { RolesController } from './business/roles.controller';
import { SkillsController } from './business/skill.controller';

@Module({
  imports: [DalModule],
  controllers: [RolesController, SkillsController],
})
export class AppModule {}
