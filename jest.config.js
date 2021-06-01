// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {    
    preset: 'jest-preset-angular',
    modulePaths: [
        "<rootDir>"
     ],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    verbose: true,
  };
  
  module.exports = config;
