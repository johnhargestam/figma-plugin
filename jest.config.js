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
    '@src/(.*)$': ['<rootDir>/../src/$1', '<rootDir>/src/$1'],
  },
  silent: true,
  clearMocks: true,
};
