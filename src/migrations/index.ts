import * as migration_20260918_152107_initial from './20260918_152107_initial';
import * as migration_20260918_185252_media_prefix from './20260918_185252_media_prefix';

export const migrations = [
  {
    up: migration_20260918_152107_initial.up,
    down: migration_20260918_152107_initial.down,
    name: '20260918_152107_initial',
  },
  {
    up: migration_20260918_185252_media_prefix.up,
    down: migration_20260918_185252_media_prefix.down,
    name: '20260918_185252_media_prefix'
  },
];
