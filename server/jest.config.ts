import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  modulePaths: [ "<rootDir>", "/home/some/other/path" ], moduleDirectories: [ "node_modules" ],
};

export default config;