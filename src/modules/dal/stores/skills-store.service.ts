import { Injectable } from '@nestjs/common';

import { Skill } from '@db/types/skill.interface';

import { DataPullService } from '../core/data-pull.service';

@Injectable()
export class SkillsStoreService {
  constructor(private readonly dataPull: DataPullService) {}

  async getAll(): Promise<Array<Skill>> {
    const data = await this.dataPull.getBy('skills');

    return data;
  }
}
