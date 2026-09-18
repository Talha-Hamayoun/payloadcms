import * as migration_20260918_152107_initial from './20260918_152107_initial';

export const migrations = [
  {
    up: migration_20260918_152107_initial.up,
    down: migration_20260918_152107_initial.down,
    name: '20260918_152107_initial'
  },
];
