import { Controller, Get } from '@nestjs/common';

import { RolesStoreService } from '@db/stores/roles-store.service';
import { ApiRoute } from '@decorators/api-route';

import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesStore: RolesStoreService) {}

  @Get()
  @ApiRoute({
    summary: 'Gets all roles',
    ok: {
      type: [RoleDto],
      description: 'The available roles',
    },
  })
  async getAllRoles(): Promise<Array<RoleDto>> {
    const data = await this.rolesStore.getAll();

    return data;
  }
}
