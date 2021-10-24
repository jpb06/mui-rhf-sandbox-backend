/* eslint-disable no-console */
import * as path from 'path';

import * as fs from 'fs-extra';

import { roles } from './data/roles.data';
import { skills } from './data/skills.data';

export const createMockDb = async () => {
  console.info('Creating mock db ...');

  const dbDirectory = path.join(__dirname, '..', 'data', 'json');
  await fs.ensureDir(dbDirectory);
  const filepath = path.join(dbDirectory, 'db.json');
  const data = { roles, skills };

  await fs.writeJson(filepath, data);
  console.info('Mock DB created.\n');
};
