import { Injectable } from '@nestjs/common';

import { Role } from '@db/types/role.interface';

import { DataPullService } from '../core/data-pull.service';

@Injectable()
export class RolesStoreService {
  constructor(private readonly dataPull: DataPullService) {}

  async getAll(): Promise<Array<Role>> {
    const data = await this.dataPull.getRoles();

    return data;
  }
}
