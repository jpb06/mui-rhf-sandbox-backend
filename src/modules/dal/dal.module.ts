import { Module } from '@nestjs/common';

import { DataPullService } from './core/data-pull.service';
import { DataPushService } from './core/data-push.service';
import { DbPathService } from './core/db-path.service';
import { RolesStoreService } from './stores/roles-store.service';
import { SkillsStoreService } from './stores/skills-store.service';

@Module({
  providers: [
    DbPathService,
    DataPullService,
    DataPushService,
    RolesStoreService,
    SkillsStoreService,
  ],
  exports: [RolesStoreService, SkillsStoreService],
})
export class DalModule {}
