import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

import Database from '@db/types/database.interface';
import { Role } from '@db/types/role.interface';
import { Skill } from '@db/types/skill.interface';

import { DbPathService } from './db-path.service';

@Injectable()
export class DataPullService {
  constructor(private readonly dbPath: DbPathService) {}

  async getRoles(): Promise<Array<Role>> {
    const db = await fs.readJson(this.dbPath.getDbPath());
    const roles = (<Database>db).roles as Array<Role>;

    return roles;
  }

  async getSkills(): Promise<Array<Skill>> {
    const db = await fs.readJson(this.dbPath.getDbPath());
    const skills = (<Database>db).skills as Array<Skill>;

    return skills;
  }
}
