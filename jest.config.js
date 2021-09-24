module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@plugin/(.*)$': ['<rootDir>/src/plugin/$1'],
    '@shared/(.*)$': ['<rootDir>/src/shared/$1'],
    '@ui/(.*)$': ['<rootDir>/src/ui/$1'],
  },
  silent: true,
  clearMocks: true,
};
