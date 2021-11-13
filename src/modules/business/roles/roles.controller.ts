import { Controller, Get } from '@nestjs/common';
import { transformTo } from '@util/transform-to';

import { RolesStoreService } from '@db/stores/roles-store.service';
import { ApiRoute } from '@decorators/api-route';

import { RolesResultDto } from './roles/roles.result.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesStore: RolesStoreService) {}

  @Get()
  @ApiRoute({
    summary: 'Gets all roles',
    ok: {
      type: RolesResultDto,
      description: 'The available roles',
    },
  })
  async getAllRoles(): Promise<RolesResultDto> {
    const data = await this.rolesStore.getAll();

    return transformTo(RolesResultDto, [
      ...data,
      // Adding an unknown role for giggles
      { id: 1000, name: 'Techpriest' },
    ]);
  }
}
