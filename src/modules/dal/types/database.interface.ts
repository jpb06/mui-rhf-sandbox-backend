import { Role } from './role.interface';
import { Skill } from './skill.interface';

export default interface Database {
  roles: Array<Role>;
  skills: Array<Skill>;
}
