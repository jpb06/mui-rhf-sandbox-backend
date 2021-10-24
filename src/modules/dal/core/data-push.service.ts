import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

import { Role } from '@db/types/role.interface';
import { Skill } from '@db/types/skill.interface';

import { DataPullService } from './data-pull.service';
import { DbPathService } from './db-path.service';

type Collection = 'roles' | 'skills';
type PersistedType = Role | Skill;

interface PersistAllParams {
  roles?: Array<Role>;
  skills?: Array<Skill>;
}

@Injectable()
export class DataPushService {
  constructor(
    private readonly dbPath: DbPathService,
    private readonly dataPull: DataPullService,
  ) {}

  async persist(item: PersistedType, type: Collection): Promise<PersistedType> {
    let data = await this.getBy(type);

    const existingItem = data.find((el) => el.id === item.id);
    if (existingItem) {
      data = data.map((el) => (el.id === item.id ? item : el));
    } else {
      data.push(item);
    }

    await this.persistBy(type, data);
    return item;
  }

  private async getBy(collection: Collection): Promise<Array<PersistedType>> {
    let data: Array<PersistedType>;

    switch (collection) {
      case 'roles':
        data = (await this.dataPull.getRoles()) as Array<PersistedType>;
        break;
      case 'skills':
        data = (await this.dataPull.getSkills()) as Array<PersistedType>;
        break;
    }

    return data;
  }

  private async persistBy(collection: Collection, data: Array<PersistedType>) {
    switch (collection) {
      case 'roles':
        await this.persistAll({ roles: data as Array<Role> });
        break;
      case 'skills':
        await this.persistAll({ skills: data as Array<Skill> });
        break;
    }
  }

  private async persistAll({ roles, skills }: PersistAllParams) {
    const data = {
      roles: roles ?? (await this.dataPull.getRoles()),
      skills: skills ?? (await this.dataPull.getSkills()),
    };
    await fs.writeJson(this.dbPath.getDbPath(), data);
  }
}
