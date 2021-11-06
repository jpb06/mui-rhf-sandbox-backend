import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { DataPushService } from '@db/core/data-push.service';
import { User } from '@db/types/user.interface';

import { DataPullService } from '../core/data-pull.service';

@Injectable()
export class UsersStoreService {
  constructor(
    private readonly dataPull: DataPullService,
    private readonly dataPush: DataPushService,
  ) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    const id = v4();
    return this.dataPush.persist({ id, ...user }, 'users');
  }
}
